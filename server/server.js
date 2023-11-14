const express = require('express');
const path = require('path');
const bodyParser = require("body-parser");
const mysql = require('mysql2');
const app = express();
const cors = require('cors');
const port = process.env.PORT || 3000;

app.use(cors());
app.use(bodyParser.json());

const connection = mysql.createConnection({
    host: "localhost",
    user: "myappuser",
    password: "password",
    database: "exp_tracker",
  });

connection.connect((err) => {
    if (err) {
      console.error("Error connecting to MySQL:", err);
      return;
    } 
    console.log("Connected to MySQL");
  });

  app.post('/api', (req, res) => {
    const { name, amount, date, notes } = req.body;
  
    // Insert data into MySQL database
    connection.query('INSERT INTO expense (name, amount, date, notes) VALUES (?, ?, ?, ?)',
      [name, amount, date, notes], (error, results) => {
        if (error) {
          console.error('Error executing query:', error);
          res.status(500).json({ error: 'Internal Server Error' });
          return;
        }
  
        res.json({ message: 'Data inserted successfully', insertId: results.insertId });
      });
  });

  
  
  


app.get("/api", (req, res) => {
    res.json({"users": ["Yash", "Priyanka", "Jack", "John"]})
}) 

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
  }); 