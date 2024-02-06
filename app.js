////////////////////////////Packages
const express = require("express");
const app = express();
const helmet = require("helmet");
const morgan = require("morgan");
const cors = require("cors");
const rateLimit = require("express-rate-limit");
const mongoSanitize = require("express-mongo-sanitize");
const xssClean = require("xss-clean");
const hpp = require("hpp");

///////////////////////////Files
const AppError = require("./utils/AppError");

app.use(express.static(__dirname + "public"));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());
app.use(helmet());
app.use(morgan("tiny"));

//RATE LIMITING
const limiter = rateLimit({
  windowMs: 45 * 60 * 1000, // 45 minutes
  max: 100, // Limit each IP to 100 requests per `window` (here, per 45 minutes)
  message: "Too many requests send. Please try again in 45 minutes",
});
app.use("/api", limiter);

//SANITIZATION OF REQUESTS FROM NOSQL INJECTIONS
app.use(mongoSanitize());

//PREVENTING JS OR HTML IN REQUESTS
app.use(xssClean());

//PREVENTING PARAMETER POLLUTION
app.use(
  hpp({
    whitelist: [
      //will not be affected by hpp
    ],
  })
);

// if(!process.env.JWT_KEY)
// {
//     console.log("FATAL ERROR: JWT KEY is not found!")
//     process.exit(1)
// }

//ROUTERS
const userRouter = require("./routes/userRoutes.js");
const jewellryRouter = require("./routes/jewellryRoutes.js");
const invoiceRouter = require("./routes/InvoiceRoutes.js");
const ratingRouter = require("./routes/ratingRoutes.js");
const setRouter = require("./routes/setRoutes.js");

//ROUTES
app.use("/api/users", userRouter);
app.use("/api/jewellry", jewellryRouter);
app.use("/api/invoices", invoiceRouter);
app.use("/api/ratings", ratingRouter);
app.use("/api/sets", setRouter);

//PREVENTING REACHING UNDEFINED ROUTES
app.all("*", (req, res, next) => {
  next(
    new AppError(`Couldn't find the ${req.originalUrl} on this server!`, 404)
  );
});

const globalErrorHandler = require("./controllers/errorController");
app.use(globalErrorHandler);
module.exports = app;
