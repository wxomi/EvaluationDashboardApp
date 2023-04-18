const express = require("express");
const { PORT } = require("./config/serverConfig");
const Api = require("./routes/index");

const setupAndStartServer = () => {
  const app = express();

  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));
  app.use("/api", Api);
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
