const express = require('express');
const app = express();

// Middleware to add req.user
app.use((req, res, next) => {
    req.user = "Guest";
    next();
});

// Route that uses req.user
app.get('/welcome', (req, res) => {
    res.send(`<h1>Welcome, ${req.user}!</h1>`);
});

app.listen(3000, () => {
    console.log("Server running on port 3000");
});

//Another way to write above code
/*const express = require('express');
const app = express();

// Custom Middleware to add req.user
const addUserMiddleware = (req, res, next) => {
    req.user = "Guest"; // Adding custom property to req
    next(); // Pass control to the next middleware/route handler
};

// Apply middleware only to the /welcome route
app.get('/welcome', addUserMiddleware, (req, res) => {
    res.send(`<h1>Welcome, ${req.user}!</h1>`);
});

// Start the server
const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});*/
