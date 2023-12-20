const cors = require("cors");
const express = require("express");
const cookieParser = require("cookie-parser");
const globalErrHandler = require("./middlewares/globalErrHandler");
const dbconnect = require("./config/dbconnect");
const { userRoutes } = require("./routes/users/users");
const { propertyRoutes } = require("./routes/property/properties");

const app = express();

// cookie parser middleware
app.use(cookieParser());

// pass json data
app.use(express.json());
// pass form data
app.use(express.urlencoded({ extended: true }));

// Cors middleware
app.use(cors());

// Routes
app.use("/api", userRoutes);
app.use("/api", propertyRoutes);

app.use(globalErrHandler);

const PORT = process.env.PORT || 8000;

const start = async () => {
  try {
    await dbconnect();
    console.info("Database connected successfully");
    app.listen(PORT, () => {
      console.info(`Server is running on PORT ${PORT}`);
    });
  } catch (error) {
    console.error(`Server Error ${error.message}`);
    process.exit(1);
  }
};

start();
