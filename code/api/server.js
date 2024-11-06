const express = require('express');
const cors = require('cors'); // Import cors
const fs = require('fs');
const path = require('path');
const app = express();
const PORT = 5000;

app.use(cors()); // Enable CORS for all routes

app.get('/api/employees', (req, res) => {
    const dataPath = path.join(__dirname, '../sample-data.json');
    const data = fs.readFileSync(dataPath, 'utf-8');
    res.json(JSON.parse(data));
});

app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));
