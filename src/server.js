require("dotenv").config();
const express = require("express");
const cors = require("cors");
const swaggerJsDoc = require("swagger-jsdoc");
const swaggerUI = require("swagger-ui-express");

const configViewEngine = require("./config/viewEngine");
const webRoutes = require("./routes/web");
const db = require("./config/database");

const app = express();
const port = process.env.PORT || 8888;
const hostname = process.env.HOST_NAME;
const path = "https://backendpainter-v1.onrender.com/" 
app.use(cors());
app.use(express.json());

// Config template engine
configViewEngine(app);

// Routes: Define the version and use webRoutes
app.use("/", webRoutes);

db.connect((err) => {
  if (err) {
    console.error("MySQL connection failed: " + err.message);
  } else {
    console.log("Connected to MySQL database");
  }
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
        url: port === 8081 ? `http://localhost:${port}` : `${path}:${port}`,
      },
    ],
  },
  // Specify the path to your route files with Swagger annotations
  apis: [`${__dirname}/routes/*.js`],
};
const specs = swaggerJsDoc(options);
app.use("/api-docs", swaggerUI.serve, swaggerUI.setup(specs));

app.listen(port, '0.0.0.0', () => {
  console.log(`Server is running on port ${port}`);
});

// Example route to check MySQL connection status
app.get("/check-connection", (req, res) => {
  if (db.state === "authenticated") {
    res.json({ message: "MySQL connection is established" });
  } else {
    res.json({ message: "MySQL connection is not established" });
  }
});require("dotenv").config();
const express = require("express");
const cors = require("cors");
const swaggerJsDoc = require("swagger-jsdoc");
const swaggerUI = require("swagger-ui-express");

const configViewEngine = require("./config/viewEngine");
const webRoutes = require("./routes/web");
const db = require("./config/database");

const app = express();
const port = process.env.PORT || 8888;
const hostname = process.env.HOST_NAME;
const path = "https://backendpainter-v1.onrender.com/" 
app.use(cors());
app.use(express.json());

// Config template engine
configViewEngine(app);

// Routes: Define the version and use webRoutes
app.use("/", webRoutes);

db.connect((err) => {
  if (err) {
    console.error("MySQL connection failed: " + err.message);
  } else {
    console.log("Connected to MySQL database");
  }
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
        url: port === 8081 ? `http://localhost:${port}` : `${path}:${port}`,
      },
    ],
  },
  // Specify the path to your route files with Swagger annotations
  apis: [`${__dirname}/routes/*.js`],
};
const specs = swaggerJsDoc(options);
app.use("/api-docs", swaggerUI.serve, swaggerUI.setup(specs));

app.listen(port, '0.0.0.0', () => {
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