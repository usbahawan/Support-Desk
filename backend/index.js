const express = require('express');
const cors = require('cors');
const db = require('./database');
const app = express();
app.use(cors());
app.use(express.json());
const PORT = process.env.PORT || 3001;

app.post('/api/tickets', (req, res) => {
    const { customer_name, customer_email, subject, description, priority } = req.body;
    const now = new Date().toISOString();
    const stmt = db.prepare(
        `INSERT INTO tickets (customer_name, customer_email, subject, description, priority, status, is_urgent, created_at, updated_at) VALUES (?, ?, ?, ?, ?, 'open', 0, ?, ?)`);
    const result = stmt.run(customer_name, customer_email, subject, description, priority, now, now);
    res.status(201).json({ id: result.lastInsertRowid });
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
