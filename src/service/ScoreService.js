const { Student, Score, Mentor } = require("../models/index");
const { ClientError } = require("../utils/errors");

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

  const { ideationScore, executionScore, vivaPatchScore, submitted } = data;
  const total =
    Number(ideationScore) + Number(executionScore) + Number(vivaPatchScore);

  const score = await Score.create({
    IdeationScore: ideationScore,
    ExecutionScore: executionScore,
    VivaPatchScore: vivaPatchScore,
    total: total,
    Submitted: submitted,
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
  if (score.Submitted === true) {
    throw new ClientError({
      message: "Score already submitted",
      explanation: "The score has already been submitted and cannot be edited",
    });
  }
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

module.exports = {
  addScoreToStudent,
  editScore,
};
