const express = require('express');
const path = require('path');
const userRoutes = require('./routes/userRoutes');

const app = express();

app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/user', userRoutes);

app.listen(3000, () => {
  console.log('Server is running on http://localhost:3000');
});