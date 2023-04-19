const { StatusCodes } = require("http-status-codes");
const { Mentor, Student, Score } = require("../models/index");
const { ClientError, AppError } = require("../utils/errors");

const addStudentToMentor = async (mentorId, studentId) => {
  const mentor = await Mentor.findByPk(mentorId, {
    include: [{ model: Student }],
  });
  const student = await Student.findByPk(studentId, {
    include: [{ model: Mentor }],
  });
  if (student.Mentor && student.Mentor.id !== mentorId) {
    throw new ClientError({
      message: "Student Already Assigned",
      explanation:
        "This student is already assigned to another mentor during the evaluation period.",
    });
  }
  if (mentor.Students.length >= 4) {
    throw new ClientError({
      message: "MaximumStudentsLimitReached",
      explanation:
        "A mentor can only accommodate a maximum of 4 students at a time",
    });
  }

  // Assign the student to the mentor
  await student.setMentor(mentor);
  const response = await Student.findByPk(studentId, {
    include: [{ model: Mentor, where: { id: mentorId } }],
  });
  return response;
};

const removeStudent = async (mentorId, studentId) => {
  const mentor = await Mentor.findByPk(mentorId);
  const student = await Student.findByPk(studentId);

  if (!mentor.hasStudent(student)) {
    throw new ClientError({
      message: "Mentor is not assigned to the student.",
      explaination: "The given StudentId is not assigned to any  ",
    });
  }
  const mentorStudent = await student.getMentor();

  if (!mentorStudent || mentorStudent.id != mentorId) {
    throw new ClientError({
      message: "Student is not assigned to the mentor.",
      explaination: "The given MentorId is not assigned to this Student",
    });
  }
  const score = await Score.findOne({ where: { StudentId: studentId } });

  if (mentor && mentor.finalSubmit) {
    throw new ClientError({
      message: "Cannot remove student.",
      explanation: "The student has a submitted score and cannot be removed.",
    });
  }

  await mentor.removeStudent(student);

  if (score) {
    await score.destroy();
  }
  await mentor.removeStudent(student);
};

const getStudents = async (mentorId, filter) => {
  if (!mentorId) {
    throw new ClientError({
      message,
    });
  }
  const mentor = await Mentor.findOne({ where: { id: mentorId } });
  if (!mentor) {
    throw new ClientError({
      message: "Mentor is not provided",
      explanation: "Mentor is not provided in params",
    });
  }

  let students;
  /*if (filter === "assigned") {
    students = await mentor.getStudents({
      include: [{ model: Score, where: { Submitted: true } }],
    });
  } else if (filter === "notAssigned") {
    students = await mentor.getStudents({
      include: [{ model: Score, where: { Submitted: false } }],
    });
  }*/ if (filter === "all") {
    students = await mentor.getStudents({
      include: [{ model: Score }],
    });
  }

  return students;
};

const getAllMentors = async () => {
  const response = await Mentor.findAll();
  return response;
};

module.exports = {
  addStudentToMentor,
  removeStudent,
  getStudents,
  getAllMentors,
};
