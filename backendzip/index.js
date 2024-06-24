const express = require("express");
const cors = require("cors");
const path = require("path");
const http = require("http");
const db = require("./models/index");
const { handleError, ErrorHandler } = require("./helper/error");
const httpStatus = require("http-status");
const { MESSAGE_CODES } = require("./config/constants");
const indexRouter = require("./routes/index");
const socketService = require("./helper/socketService");

const app = express();
const router = express.Router();

app.use(cors());

const rawBodyBuffer = (req, _, buf, encoding) => {
  if (buf && buf.length) {
    req.rawBody = buf.toString(encoding || "utf8");
  }
};

app.use(express.json({ verify: rawBodyBuffer }));

const rootRoute = router.get("/", (req, res, next) => {
  return res.status(200).json({ apiVersion: "Optimigrate v1" });
});
app.use("/", rootRoute);

app.use("/", indexRouter);

// catch all errors
app.use((err, req, res, next) => {
  handleError(err, res);
});

// catch 404 and forward to error handler
app.use((req, res, next) => {
  console.log(req.method, ": ", req.url);
  const err = new ErrorHandler(
    httpStatus.BAD_REQUEST,
    MESSAGE_CODES.COMMON.invalid_api
  );
  handleError(err, res);
});

// Start the server
const port = process.env.PORT || 8080;

const server = http.createServer(app);
socketService.init(server);

server.listen(port, () => {
  console.log(`Server is running on port ${port}`);

  db.sequelize.sync({}).then(async () => {
    console.log("Database connection successful");
  });
});
