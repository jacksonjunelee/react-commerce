const express = require('express');
const cors = require('cors');
const app = express();
const port = 5000;

// Enable CORS so that React can communicate with this server
app.use(cors());

// Middleware to parse JSON
app.use(express.json());

const path = require('path');

// Serve static files from the React app
app.use(express.static(path.join(__dirname, 'build')));

// Example API route
app.get('/api', (req, res) => {
  res.json({ message: "Hello from the server!" });
});

// Serve React app for all other routes
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'build', 'index.html'));
  });

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
