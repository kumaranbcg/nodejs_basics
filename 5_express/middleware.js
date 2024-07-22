const express = require("express");
const app = express();
const port = 3000;

// Middleware
app.use((req, res, next) => {
    console.log(`${req.method} request for '${req.url}'`);
    next();
});

// Routes
app.get("/", (req, res) => {
    res.send("Home Page");
});

app.get("/about", (req, res) => {
    res.send("About Page");
});

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}/`);
});
