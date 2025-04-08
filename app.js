const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const expenseRoutes = require('./routes/expenseRoutes');

const app = express();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static('public'));

app.use(expenseRoutes);

app.listen(3000, () => console.log('Server running at http://localhost:3000'));