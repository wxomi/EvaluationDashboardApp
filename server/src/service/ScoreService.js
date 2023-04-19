const { Student, Score, Mentor } = require("../models/index");
const { ClientError } = require("../utils/errors");
const sendMail = require("../utils/mailer");

const addScoreToStudent = async (mentorId, studentId, data) => {
  const mentor = await Mentor.findOne({
    where: { id: mentorId },
    include: Student,
  });

  const student = mentor.Students.find((s) => s.id === Number(studentId));
  if (!student) {
    throw new ClientError({
      message: "Student not found",
      explanation:
        "The student with the given ID is not assigned to the mentor",
    });
  }
  const existScore = await Score.findOne({ where: { studentId: studentId } });
  if (existScore) {
    throw new ClientError({
      message: "Score already created",
      explanation: "Score is already created for the student with the given ID",
    });
  }

  const { ideationScore, executionScore, vivaPatchScore } = data;
  const total =
    Number(ideationScore) + Number(executionScore) + Number(vivaPatchScore);

  const score = await Score.create({
    IdeationScore: ideationScore,
    ExecutionScore: executionScore,
    VivaPatchScore: vivaPatchScore,
    total: total,
    Submitted: true,
  });

  await student.setScore(score);
  return score;
};

const editScore = async (mentorId, studentId, newScore) => {
  const mentor = await Mentor.findOne({ where: { id: mentorId } });
  if (!mentor) {
    throw new ClientError({
      message: "Mentor does not exist",
      explanation: "Mentor not found for the given mentorId",
    });
  }

  if (mentor.finalSubmit) {
    throw new ClientError({
      message: "Score is locked",
      explanation: "Score is already locked and you can not edit the score now",
    });
  }

  // Find the student
  const student = await Student.findOne({ where: { id: studentId } });
  if (!student) {
    throw new ClientError({
      message: "Student does not exist",
      explanation: "Student not found for the given studentId",
    });
  }

  // Check if the student is assigned to the mentor
  if (!mentor.hasStudent(student)) {
    throw new ClientError({
      message: "Invalid student",
      explanation: "The given student is not assigned to the mentor",
    });
  }
  const score = await Score.findOne({ where: { StudentId: student.id } });
  if (!score) {
    throw new ClientError({
      message: "Score does not exist",
      explanation: "Score not found for the given studentId",
    });
  }

  // Check if the score has already been submitted

  const total =
    (Number(newScore.ideationScore) || score.IdeationScore) +
    (Number(newScore.executionScore) || score.ExecutionScore) +
    (Number(newScore.vivaPatchScore) || score.VivaPatchScore);

  // Update the score with the new marks
  score.IdeationScore = newScore.ideationScore || score.IdeationScore;
  score.ExecutionScore = newScore.executionScore || score.ExecutionScore;
  score.VivaPatchScore = newScore.vivaPatchScore || score.VivaPatchScore;
  score.total = total;
  score.Submitted = newScore.submitted || score.Submitted;
  await score.save();

  // Return the updated score
  return score;
};

const finalSubmit = async (mentorId) => {
  const mentor = await Mentor.findOne({
    where: { id: mentorId },
    include: Student,
  });
  if (!mentor) {
    throw new ClientError({
      message: "Mentor does not exist",
      explanation: "Mentor not found for the given mentorId",
    });
  }

  if (mentor.finalSubmit) {
    throw new ClientError({
      message: "Already Submitted",
      explanation: "Mentor already submitted all the marks",
    });
  }
  if (mentor.Students.length < 3) {
    throw new ClientError({
      message: "Assigned Students are less than 3",
      explanation:
        "Mentor can not lock the marks assigning marks to atleast 3 students",
    });
  }

  const students = await mentor.getStudents({
    include: [{ model: Score, where: { Submitted: true } }],
  });
  if (students.length != mentor.Students.length) {
    throw new ClientError({
      message: "Cannot lock",
      explanation:
        "Mentor can not lock the marks before giving marks to all the assigned students",
    });
  }

  sendMail(mentor.Students);
  mentor.finalSubmit = true;
  await mentor.save();
};

module.exports = {
  addScoreToStudent,
  editScore,
  finalSubmit,
};
