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

// app.get('/projects', (req, res) => {
//     db.query('SELECT * FROM project', (err, results) => {
//         if (err) {
//             return res.status(500).json({ error: 'Database error' });
//         }
//         return res.status(200).json(results);
//     });
// });

// app.get('/projects/:projectId', (req, res) => {
//     const projectId = req.params.projectId; // Get the projectId from the URL parameter

//     // Perform a database query to retrieve the project with the specified projectId
//     db.query('SELECT * FROM project WHERE projectId = ?', [projectId], (err, results) => {
//         if (err) {
//             return res.status(500).json({ error: 'Database error' });
//         }

//         if (results.length === 0) {
//             return res.status(404).json({ error: 'Project not found' });
//         }

//         // Return the project details as JSON if found
//         return res.status(200).json(results[0]);
//     });
// });

// app.delete('/projects/:projectId', (req, res) => {
//     const projectId = req.params.projectId; // Get the projectId from the URL parameter

//     // Perform a database query to delete the project with the specified projectId
//     db.query('DELETE FROM project WHERE projectId = ?', [projectId], (err, results) => {
//         if (err) {
//             return res.status(500).json({ error: 'Database error' });
//         }

//         if (results.affectedRows === 0) {
//             return res.status(404).json({ error: 'Project not found' });
//         }

//         // Return a success message if the project is successfully deleted
//         return res.status(200).json({ message: 'Project deleted successfully' });
//     });
// });

// app.post('/createProject', (req, res) => {
//     console.log('Received a POST request to /createProject with data:', req.body);
//     // Validate inputs
//     const { projectName, description, quantity, startDate, endDate, address
//         , abilityList , status
//     } = req.body;
//     if (!projectName || !description || !quantity || !startDate
//         || !endDate || !address || !abilityList || !status) {
//         return res.status(400).json({ error: 'All fields are required' });
//     }
//     // Check if the email already exists
//     db.query('SELECT * FROM project WHERE projectName = ?', [projectName], (err, results) => {
//         if (err) {
//             console.error(err);
//             return res.status(500).json({ error: 'Database error' });
//         }
//         if (results.length > 0) {
//             return res.status(400).json({ error: 'Project Name already in use' });
//         }
//         // Insert the new user
//         db.query('INSERT INTO project ( projectName, description, quantity , startDate , endDate , address , abilityList , status ) VALUES (?, ?, ? , ?, ?, ?, ? , ?)', [projectName, description, quantity, startDate, endDate, address, abilityList , status], (err, data) => {
//             if (err) {
//                 console.error(err);
//                 return res.status(500).json({ error: 'Database error' });
//             }
//             // After successful insertion, redirect to retrieve all user data
//             db.query('SELECT * FROM project', (err, results) => {
//                 if (err) {
//                     return res.status(500).json({ error: 'Database error' });
//                 }
//                 return res.status(201).json({ message: 'Project registration successful', projects: results });
//             });
//         });
//     });
// });
