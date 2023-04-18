const { StatusCodes } = require("http-status-codes");
const { Mentor, Student } = require("../models/index");

const checkMentorAndStudentExistence = async (req, res, next) => {
  const mentorId = req.params.mentorId;
  const studentId = req.params.studentId;

  const mentorExist = await Mentor.findOne({ where: { id: mentorId } });

  if (!mentorExist) {
    return res.status(StatusCodes.BAD_REQUEST).json({
      error: "Client Error",
      message: "Mentor Does not exist",
      explanation: "Mentor not found for the given mentor Id",
    });
  }
  const studentExist = await Student.findOne({ where: { id: studentId } });

  if (!studentExist) {
    return res.status(StatusCodes.BAD_REQUEST).json({
      error: "Client Error",
      message: "Student Does not exist",
      explanation: "Student not found for the given Student Id",
    });
  }
  next();
};

module.exports = checkMentorAndStudentExistence;
