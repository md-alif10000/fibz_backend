const express = require("express");
const app = express();
const cookieParser = require("cookie-parser");
const bodyParser = require("body-parser");
const fileUpload = require("express-fileupload");
const path = require("path");
const cors = require("cors");

const errorMiddleware = require("./middleware/error");

// Config
if (process.env.NODE_ENV !== "PRODUCTION") {
  require("dotenv").config({ path: "backend/config/config.env" });
}
var corsOptions = {
  origin: "*",
  optionsSuccessStatus: 200,
  credentials: true,
};
app.use(cors(corsOptions));
app.set("trust proxy", 1);
app.use(express.json());
app.use(express.urlencoded({ limit: "50mb", extended: true }));
app.use(cookieParser());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(fileUpload());

// Route Imports
const product = require("./routes/productRoute");
const user = require("./routes/userRoute");
const order = require("./routes/orderRoute");
const payment = require("./routes/paymentRoute");
const section = require("./routes/sectionRoute");
const category = require("./routes/categoryRoute");
const stripeRoute = require("./routes/stripeRoute");

app.use("/api/v1", product);
app.use("/api/v1", user);

app.use("/api/v1", order);
app.use("/api/v1", payment);
app.use("/api/v1", section);
app.use("/api/v1", category);
app.use("/api/v1", stripeRoute);

app.use(express.static(path.join(__dirname, "../frontend/build")));

app.get("*", (req, res) => {
  // res.sendFile(path.resolve(__dirname, "../frontend/build/index.html"));
  res.send("Hello There ! App is running");
});

// Middleware for Errors
app.use(errorMiddleware);

module.exports = app;
