
// Import required modules
const express = require('express');
const multer = require('multer');
const sqlite3 = require('sqlite3').verbose();
const path = require('path');

// Initialize Express app
const app = express();
const PORT = 3000;

// Set up static folder
app.use(express.static(__dirname));

// Configure multer for file uploads
const storage = multer.diskStorage({
    destination: './uploads',
    filename: (req, file, cb) => {
        cb(null, Date.now() + path.extname(file.originalname));
    }
});
const upload = multer({ storage: storage });

// Initialize SQLite database
const db = new sqlite3.Database('./database.db', (err) => {
    if (err) {
        console.error(err.message);
    } else {
        console.log('Connected to SQLite database.');
    }
});

// Create table if it doesn't exist
db.run(`CREATE TABLE IF NOT EXISTS users (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL,
    phone TEXT NOT NULL,
    image TEXT NOT NULL
)`);

// Handle form submission
app.post('/submit', upload.single('image'), (req, res) => {
    const { name, phone } = req.body;
    const image = req.file.path;

    // Insert data into database
    db.run(`INSERT INTO users (name, phone, image) VALUES (?, ?, ?)`, [name, phone, image], function (err) {
        if (err) {
            console.error(err.message);
            res.status(500).send('An error occurred while saving data.');
        } else {
            res.send('Data submitted successfully!');
        }
    });
});

// API endpoint to view submitted data
app.get('/data', (req, res) => {
    db.all(`SELECT * FROM users`, [], (err, rows) => {
        if (err) {
            console.error(err.message);
            res.status(500).send('An error occurred while retrieving data.');
        } else {
            res.json(rows);
        }
    });
});

// Start server
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
    