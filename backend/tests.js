const Database = require('better-sqlite3')

const db = new Database(':memory:')

db.exec(`
    CREATE TABLE IF NOT EXISTS tickets (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        customer_name TEXT NOT NULL,
        customer_email TEXT NOT NULL,
        subject TEXT NOT NULL,
        description TEXT NOT NULL,
        priority TEXT NOT NULL,
        status TEXT DEFAULT 'Open',
        is_urgent INTEGER DEFAULT 0,
        created_at TEXT,
        updated_at TEXT
    )
`)

// check if ticket should be urgent
function isUrgent(priority, description){
    let urgent = false
    if(priority === 'High'){
        urgent = true
    }
    if(description.toLowerCase().includes('urgent')){
        urgent = true
    }
    return urgent
}

// basic validation function
function validate(data){
    if(!data.customer_name) return 'name required'
    if(!data.customer_email) return 'email required'
    if(!data.subject) return 'subject required'
    if(!data.description) return 'description required'
    if(data.description.length < 10) return 'description too short'
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if(!emailRegex.test(data.customer_email)) return 'invalid email'
    if(!['Low', 'Medium', 'High'].includes(data.priority)) return 'invalid priority'
    return 'valid'
}

// ---- urgent tests ----
console.log('Test 1 - urgent detection')

if(isUrgent('High', 'laptop broken') == true){
    console.log('passed - high priority is urgent')
} else {
    console.log('failed')
}

if(isUrgent('Low', 'this is urgent please help') == true){
    console.log('passed - urgent word found')
} else {
    console.log('failed')
}

if(isUrgent('Low', 'laptop broken') == false){
    console.log('passed - low priority not urgent')
} else {
    console.log('failed')
}

// ---- validation tests ----
console.log('Test 2 - validation')

if(validate({customer_name: '', customer_email: 'test@test.com', subject: 'test', description: 'test description here', priority: 'Low'}) == 'name required'){
    console.log('passed - empty name caught')
} else {
    console.log('failed')
}

if(validate({customer_name: 'John', customer_email: 'notanemail', subject: 'test', description: 'test description here', priority: 'Low'}) == 'invalid email'){
    console.log('passed - bad email caught')
} else {
    console.log('failed')
}

if(validate({customer_name: 'John', customer_email: 'john@test.com', subject: 'test', description: 'short', priority: 'Low'}) == 'description too short'){
    console.log('passed - short description caught')
} else {
    console.log('failed')
}

if(validate({customer_name: 'John', customer_email: 'john@test.com', subject: 'test', description: 'this is a long description', priority: 'Low'}) == 'valid'){
    console.log('passed - valid data accepted')
} else {
    console.log('failed')
}

console.log('all tests done!')