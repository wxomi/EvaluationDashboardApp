const { StatusCodes } = require("http-status-codes");
const { scoreService } = require("../service/index");

const addScore = async (req, res) => {
  const { mentorId, studentId } = req.params;

  try {
    const response = await scoreService.addScoreToStudent(
      mentorId,
      studentId,
      req.body
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
      err: error,
      success: false,
    });
  }
};
const editScore = async (req, res) => {
  const { mentorId, studentId } = req.params;

  try {
    const response = await scoreService.editScore(
      mentorId,
      studentId,
      req.body
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

const finalSubmit = async (req, res) => {
  try {
    const mentorId = req.params.mentorId;
    await scoreService.finalSubmit(mentorId);
    return res.status(StatusCodes.OK).json({
      message: "Successfully locked all socres of student",
      success: true,
    });
  } catch (error) {
    console.log(error);
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
  addScore,
  finalSubmit,
  editScore,
};
