const express = require("express");
const jwt = require("jsonwebtoken");
const morgan = require("morgan");
const app = express();
const port = 3000;

app.use(express.json());
app.use(morgan("dev"));

const users = [
    { id: 1, username: "user1", password: "pass1" },
    { id: 2, username: "user2", password: "pass2" },
];

const secretKey = "your_secret_key";

// Login authentication route
app.post("/login", (req, res) => {
    const { username, password } = req.body;
    const user = users.find((u) => u.username === username && u.password === password);
    if (user) {
        const token = jwt.sign({ id: user.id }, secretKey, { expiresIn: "1h" });
        res.json({ token });
    } else {
        res.status(401).send("Invalid credentials");
    }
});

// Authorization middleware to verify token
const authenticateToken = (req, res, next) => {
    const token = req.headers["authorization"];
    if (token) {
        jwt.verify(token.replace("Bearer ", ""), secretKey, (err, user) => {
            if (err) return res.sendStatus(403);
            req.user = user;
            next();
        });
    } else {
        res.sendStatus(401);
    }
};

// Protected route
app.get("/protected", authenticateToken, (req, res) => {
    res.send("You are authorized user!!!");
});

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}/`);
});
