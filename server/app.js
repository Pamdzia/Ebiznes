const express = require('express');
const cors = require('cors');
const app = express();
const port = 3001;

// Use CORS middleware to allow requests from any origin
app.use(cors());

app.get('/api/message', (req, res) => {
  res.json({ message: "Hello from Server!" });
});

app.listen(port, '0.0.0.0', () => {
  console.log(`Server listening on port ${port}`);
});
