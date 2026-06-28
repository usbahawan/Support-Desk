import React, { useState, useEffect } from 'react';

function TicketList({ openTicket }) {

    const [tickets, setTickets] = useState([])
    const [search, setSearch] = useState('')
    const [filterPriority, setFilterPriority] = useState('')
    const [filterStatus, setFilterStatus] = useState('')

    useEffect(() => {
        fetch('http://localhost:3001/api/tickets')
        .then(res => res.json())
        .then(data => {
            setTickets(data)
        })
    }, [])

    // filter tickets based on search and filters
    const filtered = tickets.filter(ticket => {
        const matchSearch = ticket.customer_name.toLowerCase().includes(search.toLowerCase()) || ticket.customer_email.toLowerCase().includes(search.toLowerCase()) || ticket.subject.toLowerCase().includes(search.toLowerCase())
        
        let matchPriority = true
        if(filterPriority){
            matchPriority = ticket.priority === filterPriority
        }

        let matchStatus = true
        if(filterStatus){
            matchStatus = ticket.status === filterStatus
        }

        return matchSearch && matchPriority && matchStatus
    })

    return (
        <div style={{padding: '20px'}}>
            <h2>All Tickets</h2>

            {/* search and filter section */}
            <div style={{marginBottom: '20px'}}>
                <input 
                    placeholder="Search name, email or subject"
                    value={search}
                    onChange={e => setSearch(e.target.value)}
                    style={{marginRight: '10px', padding: '5px'}}
                />

                <select value={filterPriority} onChange={e => setFilterPriority(e.target.value)} style={{marginRight: '10px', padding: '5px'}}>
                    <option value="">All Priorities</option>
                    <option value="Low">Low</option>
                    <option value="Medium">Medium</option>
                    <option value="High">High</option>
                </select>

                <select value={filterStatus} onChange={e => setFilterStatus(e.target.value)} style={{padding: '5px'}}>
                    <option value="">All Status</option>
                    <option value="Open">Open</option>
                    <option value="In Progress">In Progress</option>
                    <option value="Resolved">Resolved</option>
                </select>
            </div>

            {/* tickets table */}
            <table style={{width: '100%', borderCollapse: 'collapse'}}>
                <thead>
                    <tr style={{background: '#333', color: 'white'}}>
                        <th style={{padding: '10px'}}>ID</th>
                        <th style={{padding: '10px'}}>Name</th>
                        <th style={{padding: '10px'}}>Subject</th>
                        <th style={{padding: '10px'}}>Priority</th>
                        <th style={{padding: '10px'}}>Status</th>
                        <th style={{padding: '10px'}}>Urgent</th>
                        <th style={{padding: '10px'}}>Date</th>
                    </tr>
                </thead>
                <tbody>
                    {filtered.map(ticket => (
                        <tr key={ticket.id} 
                        onClick={() => openTicket(ticket.id)} style={{borderBottom: '1px solid #ccc'}}>
                            <td style={{padding: '10px'}}>{ticket.id}</td>
                            <td style={{padding: '10px'}}>{ticket.customer_name}</td>
                            <td style={{padding: '10px'}}>{ticket.subject}</td>
                            <td style={{padding: '10px'}}>{ticket.priority}</td>
                            <td style={{padding: '10px'}}>{ticket.status}</td>
                            <td style={{padding: '10px'}}>
                                {ticket.is_urgent == 1 ? <span style={{color: 'red', fontWeight: 'bold'}}>URGENT</span> : 'No'}
                            </td>
                            <td style={{padding: '10px'}}>{ticket.created_at}</td>
                        </tr>
                    ))}
                </tbody>
            </table>

            {filtered.length == 0 && <p>No tickets found</p>}

        </div>
    )
}

export default TicketList