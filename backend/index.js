const express = require('express');
const cors = require('cors');
const db = require('./database');
const app = express();
app.use(cors());
app.use(express.json());
const PORT = process.env.PORT || 3001;
app.post('/api/tickets', (req, res) => {
    const { customer_name, customer_email, subject, description, priority, is_urgent } = req.body;
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
    let isUrgent = 0;
    if(is_urgent){
        isUrgent = 1;
    }
    if(description.toLowerCase().includes('urgent')){
        isUrgent = 1;
    }
    const now= new Date().toISOString();
    const stmt = db.prepare(
        `INSERT INTO tickets (customer_name, customer_email, subject, description, priority, status, is_urgent, created_at, updated_at) VALUES (?, ?, ?, ?, ?, 'open', ?, ?, ?)`);
    const result = stmt.run(customer_name, customer_email, subject, description, priority, isUrgent, now, now);
    res.status(201).json({ id: result.lastInsertRowid });});
app.get('/api/tickets', (req, res) => {
    const tickets = db.prepare('SELECT * FROM tickets').all();
    res.json(tickets);
});
app.get('/api/tickets/:id', (req, res) => {
    const id = req.params.id;
    const ticket = db.prepare('SELECT * FROM tickets WHERE id = ?').get(id);
    if (!ticket) {
        return res.status(404).json({ error: 'Ticket not found' });
    }
    res.json(ticket);
});
app.patch('/api/tickets/:id/status', (req, res) => {
    const id = req.params.id; 
      const { status } = req.body;
      if (!['open', 'in progress', 'closed'].includes(status)) {
        return res.status(400).json({ error: 'Invalid status value' });
        }
        const now = new Date().toISOString();
        db.prepare('UPDATE tickets SET status = ?, updated_at = ? WHERE id = ?').run(status, now, id);
        res.json({ message: 'Ticket status updated successfully' });
});
app.get('/api/dashboard', (req, res) => {
    const total= db.prepare('SELECT COUNT(*) AS total FROM tickets').get().total;
    const open= db.prepare('SELECT COUNT(*) AS open FROM tickets WHERE status = "open"').get().open;
    const inProgress= db.prepare('SELECT COUNT(*) AS inProgress FROM tickets WHERE status = "in progress"').get().inProgress;
    const resolved= db.prepare('SELECT COUNT(*) AS resolved FROM tickets WHERE status = "closed"').get().resolved;
    const urgent= db.prepare('SELECT COUNT(*) AS urgent FROM tickets WHERE is_urgent = 1').get().urgent;
    res.json({ total, open, inProgress, resolved, urgent });
});
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
