const express = require('express');
const path = require('path');

const app = express();
const publicFolderPath = path.join(__dirname, 'public');

// Serve static files from the public folder
app.use(express.static(publicFolderPath));

// Start the server
const port = 3000; // You can change this to the desired port number
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
