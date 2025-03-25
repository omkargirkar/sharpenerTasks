const express = require('express');
const studentRoutes = require('./routes/students');
const courseRoutes = require('./routes/courses');

const app = express();
const PORT = 4000;


app.get('/', (req, res) => {
    res.send("Welcome to the Student & Course Portal API!");
});

app.use('/students', studentRoutes);
app.use('/courses', courseRoutes);

app.use((req, res) => {
    res.status(404).send("Page not found");
});

// Start Server
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});