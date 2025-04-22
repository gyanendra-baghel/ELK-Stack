const express = require("express");
const winston = require("winston");
const path = require("path");

const app = express();
const PORT = 3000;
const APP_NAME = process.env.APP_NAME || "App";

// Create logs directory if needed
const logDir = path.join(__dirname, 'logs');
require('fs').mkdirSync(logDir, { recursive: true });


const logger = winston.createLogger({
  level: "info",
  format: winston.format.json(),
  transports: [
    // Logs to stdout (console)
    new winston.transports.Console(),

    // Logs to a file
    new winston.transports.File({ filename: path.join(logDir, `app.log`) }),

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
