require("dotenv").config();
const express = require("express");
const cors = require("cors");
const configViewEngine = require("./config/viewEngine");
const webRoutes = require("./routes/web");
const db = require("./config/database");

const app = express();
const port = process.env.PORT || 8888;
const hostname = process.env.HOST_NAME;

app.use(cors());
app.use(express.json());

db.connect((err) => {
  if (err) {
    console.error("MySQL connection failed: " + err.message);
  } else {
    console.log("Connected to MySQL database");
  }
});

//Config template engine
configViewEngine(app);

//Routes : Dinh dang version webRoutes 
app.use("/", webRoutes);

app.listen(port, hostname, () => {
  console.log(` Server is running on ${port} `);
});

// Example route to check MySQL connection status
app.get("/check-connection", (req, res) => {
  if (db.state === "authenticated") {
    res.json({ message: "MySQL connection is established" });
  } else {
    res.json({ message: "MySQL connection is not established" });
  }
});





