const express = require("express");
const winston = require("winston");

const app = express();
const PORT = 3000;
const APP_NAME = process.env.APP_NAME || "App";

const logger = winston.createLogger({
  level: "info",
  format: winston.format.json(),
  transports: [
    new winston.transports.Console(), // Logs to stdout, Docker will capture
  ],
});

app.get("/", (req, res) => {
  logger.info({
    app: APP_NAME,
    message: `GET /`,
    timestamp: new Date().toISOString(),
  });
  res.send(`Hello from ${APP_NAME}`);
});

app.listen(PORT, () => {
  logger.info({
    app: APP_NAME,
    message: `Started ${APP_NAME} on port ${PORT}`,
    timestamp: new Date().toISOString(),
  });
});
