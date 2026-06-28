const express = require('express');
const cors = require('cors');
const db = require('./database');
const app = express();
app.use(cors());
app.use(express.json());
const PORT = process.env.PORT || 3001;

app.post('/api/tickets', (req, res) => {
    const { customer_name, customer_email, subject, description, priority } = req.body;
    if(!customer_name){
        return res.status(400).json({ error: 'name required' });
    }
    if(!customer_email){
        return res.status(400).json({ error: 'email required' });
    }
    if(!subject){
        return res.status(400).json({ error: 'subject required' });
    }
    if(!description){
        return res.status(400).json({ error: 'description required' });
    }
    if(!priority){
        return res.status(400).json({ error: 'priority required' });
    }
    if(description.length < 10){
        return res.status(400).json({ error: 'must at least 10 characters long' });
    }
    if(!['LOW', 'MEDIUM', 'HIGH'].includes(priority)){
        return res.status(400).json({ error: 'priority must LOW, MEDIUM or HIGH' });
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if(!emailRegex.test(customer_email)){
        return res.status(400).json({ error: 'invalid email' });
    }
    const now = new Date().toISOString();
    const stmt = db.prepare(
        `INSERT INTO tickets (customer_name, customer_email, subject, description, priority, status, is_urgent, created_at, updated_at) VALUES (?, ?, ?, ?, ?, 'open', 0, ?, ?)`);
    const result = stmt.run(customer_name, customer_email, subject, description, priority, now, now);
    res.status(201).json({ id: result.lastInsertRowid });
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
