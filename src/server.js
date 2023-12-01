require("dotenv").config();
const express = require("express");
const jwt = require("jsonwebtoken");

const cors = require("cors");

const swaggerJsDoc = require("swagger-jsdoc");
const swaggerUI = require("swagger-ui-express");
const cookieParser = require("cookie-parser");
const configViewEngine = require("./config/viewEngine");

const authRoutes = require("./routes/auth");
const webRoutes = require("./routes/web");
const imgRoutes = require("./routes/imageManager");

const db = require("./config/database");

const app = express();
const port = process.env.PORT || 8888;
const hostname = process.env.HOST_NAME;
const pathUrl = process.env.SWAGGER_URL || `http://localhost:${port}`;

app.use(
  cors({
    origin: "http://localhost:3000", // Allow requests from this origin
    // origin: 'https://painter-neon.vercel.app', // Allow requests from this origin
    credentials: true, // Allow cookies and credentials
  })
);
app.use(express.json());
app.use(cookieParser());

// Config template engine
configViewEngine(app);

// Routes: Define the version and use webRoutes
app.use("/", webRoutes);
app.use("/", imgRoutes);
app.use("/", authRoutes);

db.query("SELECT 1 + 1", (error, results, fields) => {
  if (error) throw error;
  console.log("Connected to MySQL!");
});

// Swagger options
const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Library API",
      version: "1.0.0",
      description: "A simple Express Library API",
    },
    servers: [
      {
        url: pathUrl,
      },
    ],
  },
  // Specify the pathUrl to your route files with Swagger annotations
  apis: [`${__dirname}/routes/*.js`],
};
const specs = swaggerJsDoc(options);

app.use("/api-docs", swaggerUI.serve, swaggerUI.setup(specs));
app.listen(port, "0.0.0.0", () => {
  console.log(`Server is running on port ${port}`);
});

// Example route to check MySQL connection status
app.get("/check-connection", (req, res) => {
  if (db.state === "authenticated") {
    res.json({ message: "MySQL connection is established" });
  } else {
    res.json({ message: "MySQL connection is not established" });
  }
});
