const express = require('express');
const app = express();

app.use(express.json());

app.get('/products', (req, res) => {
    res.send("Here is the list of all products.");
});

app.post('/products', (req, res) => {
    res.send("A new product has been added.");
});

app.get('/categories', (req, res) => {
    res.send("Here is the list of all categories.");
});

app.post('/categories', (req, res) => {
    res.send("A new category has been created.");
});

app.all('*', (req, res) => {
    res.status(404).send("<h1>404 - Page Not Found</h1>");
});

const PORT = 4000;
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
