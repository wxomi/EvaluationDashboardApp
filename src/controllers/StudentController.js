const { StatusCodes } = require("http-status-codes");
const { studentService } = require("../service/index");

const addStudent = async (req, res) => {
  const mentorId = req.params.mentorId;
  const studentId = req.params.studentId;
  try {
    const response = await studentService.addStudentToMentor(
      mentorId,
      studentId
    );
    return res.status(200).json({
      message: "Success",
      data: response,
    });
  } catch (error) {
    if (error.name == "ClientError") {
      return res.status(error.statusCode).json({
        error: error.message,
        message: error.explanation,
      });
    }
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      error: error,
      success: false,
    });
  }
};

const removeStudent = async (req, res) => {
  const mentorId = req.params.mentorId;
  const studentId = req.params.studentId;
  try {
    await studentService.removeStudent(mentorId, studentId);
    return res.status(200).json({
      message: `Successfully removed Student ${studentId} from Mentor ${mentorId}`,
      data: {},
    });
  } catch (error) {
    if (error.name == "ClientError") {
      return res.status(error.statusCode).json({
        error: error.message,
        message: error.explanation,
      });
    }
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      error: error,
      success: false,
    });
  }
};
module.exports = {
  addStudent,
  removeStudent,
};
