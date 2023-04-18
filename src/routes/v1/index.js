const express = require("express");
const { scoreController, studentController } = require("../../controllers/");
const checkMentorAndStudentExistence = require("../../middlewares/checkMentorAndStudentExistence");
const generateMarksheet = require("../../utils/generateMarksheet");

const router = express.Router();

router.post(
  "/mentor/:mentorId/student/:studentId",
  [checkMentorAndStudentExistence],
  studentController.addStudent
);

router.delete(
  "/mentor/:mentorId/student/:studentId",
  [checkMentorAndStudentExistence],
  studentController.removeStudent
);

router.post(
  "/mentor/:mentorId/student/:studentId/score",
  scoreController.addScore
);
router.patch(
  "/mentor/:mentorId/student/:studentId/score",
  [checkMentorAndStudentExistence],
  scoreController.editScore
);

router.get("/mentor/:mentorId/students/:filter", studentController.getStudent);
router.get("/mentor/:mentorId/students", studentController.getAllStudets);
router.get("/mentor/:mentorId/pdf", generateMarksheet);

module.exports = router;
