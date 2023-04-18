const express = require("express");
const { PORT } = require("./config/serverConfig");
const {
  addStudent,
  removeStudent,
} = require("./controllers/StudentController");

const setupAndStartServer = () => {
  const app = express();

  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));
  app.post("/api/mentor/:mentorId/addStudent/:studentId", addStudent);
  app.delete("/api/mentor/:mentorId/removeStudent/:studentId", removeStudent);
  app.get("/ping", (req, res) => {
    return res.status(200).json({
      message: "pinged",
    });
  });

  app.listen(PORT, () => {
    console.log("Server Running at", PORT);
  });
};

setupAndStartServer();
