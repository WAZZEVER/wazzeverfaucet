const express = require('express');
const path = require('path');

const port = 3000;
const app = express();

// Serve static files from the "public" folder
app.use(express.static(path.join(__dirname, 'public')));

app.get('/', (request, response) => {
  return response.sendFile('index.html', { root: path.join(__dirname, 'public') });
});

app.listen(port, () => console.log(`App listening at http://localhost:${port}`));
