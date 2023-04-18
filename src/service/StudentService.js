const { Mentor, Student } = require("../models/index");
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
  const response = await student.setMentor(mentor);
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

  await mentor.removeStudent(student);
};

module.exports = {
  addStudentToMentor,
  removeStudent,
};
