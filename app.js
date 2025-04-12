const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const bookRoutes = require('./routes/bookRoutes');

const app = express();

app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/api/books', bookRoutes);

app.listen(3000, () => {
  console.log('Server is running on http://localhost:3000');
});
