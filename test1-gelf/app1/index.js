const express = require('express');
const app = express();
const PORT = 3000;

app.get('/', (req, res) => {
  console.log('Hit / route');
  res.send('Hello from Express!');
});

app.get('/api', (req, res) => {
  console.log('Hit /api route');
  res.json({ message: 'Hello from API!' });
});

app.get('/api/data', (req, res) => {
  console.log('Hit /api/data route');
  res.json({ data: 'Here is some data!' });
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
