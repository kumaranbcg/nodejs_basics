const express = require("express");
const morgan = require("morgan");
const app = express();
const port = 3000;

app.use(express.json());
app.use(morgan("dev"));

let items = [];

// Create
app.post("/items", (req, res) => {
    const { name } = req.body;
    const newItem = { id: items.length + 1, name };
    items.push(newItem);
    res.status(201).json(newItem);
});

// Read
app.get("/items", (req, res) => {
    res.json(items);
});

// Update
app.put("/items/:id", (req, res) => {
    const { id } = req.params;
    const { name } = req.body;
    const updatedItem = { id, name };
    items = items.map((item) => (item.id === parseInt(id) ? updatedItem : item));
    res.json(updatedItem);
});

// Delete
app.delete("/items/:id", (req, res) => {
    const { id } = req.params;
    items = items.filter((item) => item.id !== parseInt(id));
    res.status(204).send("Deleted successfully");
});

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}/`);
});
