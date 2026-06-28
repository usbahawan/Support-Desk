const Database = require('better-sqlite3');
const db = new Database('tickets.db');
db.exec(`
CREATE TABLE IF NOT EXISTS tickets (
    id INTEGER PRIMARY KEY AUTOINCREMENT,   
    customer_name TEXT NOT NULL,
    customer_email TEXT NOT NULL,
    subject TEXT NOT NULL,
    description TEXT NOT NULL,
    priority TEXT NOT NULL,
    status TEXT DEFAULT 'open',
    is_urgent INTEGER DEFAULT 0,
    created_at TEXT,
    updated_at TEXT);`);
module.exports = db;