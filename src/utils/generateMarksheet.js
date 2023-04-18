const PDFDocument = require("pdfkit");
const fs = require("fs");
const path = require("path");
const { Mentor, Score, Student } = require("../models/index");
const { ClientError } = require("./errors");

const generateMarksheet = async (req, res) => {
  try {
    const mentorId = req.params.mentorId;
    const mentor = await Mentor.findByPk(mentorId, {
      include: [
        {
          model: Student,
          include: Score,
        },
      ],
    });

    if (!mentor) {
      throw new ClientError({
        message: "MentorId not Found",
        explanation: "MentorId not Found",
      });
    }

    const doc = new PDFDocument();
    const outputFilePath = path.join(
      __dirname,
      "marksheets",
      `${mentor.name}.pdf`
    );
    const outputStream = fs.createWriteStream(outputFilePath);

    doc.pipe(outputStream);

    doc
      .font("Helvetica-Bold")
      .fontSize(16)
      .text(`Marksheet for ${mentor.name}`, { align: "center" });
    doc.moveDown(0.5);

    mentor.Students.forEach((student) => {
      const score = student.Score;
      const total =
        score.IdeationScore + score.ExecutionScore + score.VivaPatchScore;
      doc.font("Helvetica").fontSize(12).text(student.name);
      doc
        .font("Helvetica-Bold")
        .fontSize(12)
        .text(`Ideation Score: ${score.IdeationScore}`);
      doc
        .font("Helvetica-Bold")
        .fontSize(12)
        .text(`Execution Score: ${score.ExecutionScore}`);
      doc
        .font("Helvetica-Bold")
        .fontSize(12)
        .text(`Viva/Patch Score: ${score.VivaPatchScore}`);
      doc.font("Helvetica-Bold").fontSize(12).text(`Total Score: ${total}`);
      doc.moveDown(0.5);
    });

    doc.end();
    return res.status(200).json({
      message: `Marksheet for ${mentor.name} generated at ${outputFilePath}`,
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

module.exports = generateMarksheet;
