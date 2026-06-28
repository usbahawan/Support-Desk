import React, { useState, useEffect } from 'react';

function TicketDetail({ ticketId, goBack }) {

    const [ticket, setTicket] = useState(null)
    const [status, setStatus] = useState('')
    const [message, setMessage] = useState('')

    useEffect(() => {
        fetch('http://localhost:3001/api/tickets/' + ticketId)
        .then(res => res.json())
        .then(data => {
            setTicket(data)
            setStatus(data.status)
        })
    }, [ticketId])

    const updateStatus = () => {
        fetch('http://localhost:3001/api/tickets/' + ticketId + '/status', {
            method: 'PATCH',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({status: status})
        })
        .then(res => res.json())
        .then(data => {
            setMessage('status updated successfully!')
            // refresh ticket data
            fetch('http://localhost:3001/api/tickets/' + ticketId)
            .then(res => res.json())
            .then(data => setTicket(data))
        })
    }

    // show loading if ticket not loaded yet
    if(!ticket){
        return <p>Loading ticket...</p>
    }

    return (
        <div style={{padding: '20px'}}>

            <button onClick={goBack} style={{marginBottom: '15px'}}>← Back</button>

            <h2>Ticket Detail - #{ticket.id}</h2>

            {/* urgent warning */}
            {ticket.is_urgent == 1 && 
                <p style={{color: 'red', fontWeight: 'bold'}}>⚠️ This ticket is URGENT</p>
            }

            <div style={{marginBottom: '10px'}}>
                <strong>Customer Name: </strong>{ticket.customer_name}
            </div>
            <div style={{marginBottom: '10px'}}>
                <strong>Email: </strong>{ticket.customer_email}
            </div>
            <div style={{marginBottom: '10px'}}>
                <strong>Subject: </strong>{ticket.subject}
            </div>
            <div style={{marginBottom: '10px'}}>
                <strong>Description: </strong>{ticket.description}
            </div>
            <div style={{marginBottom: '10px'}}>
                <strong>Priority: </strong>{ticket.priority}
            </div>
            <div style={{marginBottom: '10px'}}>
                <strong>Status: </strong>{ticket.status}
            </div>
            <div style={{marginBottom: '10px'}}>
                <strong>Created: </strong>{ticket.created_at}
            </div>
            <div style={{marginBottom: '10px'}}>
                <strong>Last Updated: </strong>{ticket.updated_at}
            </div>

            {/* update status section */}
            <div style={{marginTop: '20px', borderTop: '1px solid #ccc', paddingTop: '20px'}}>
                <h3>Change Status</h3>
                <select 
                    value={status} 
                    onChange={e => setStatus(e.target.value)}
                    style={{padding: '5px', marginRight: '10px'}}
                >
                    <option value="Open">Open</option>
                    <option value="In Progress">In Progress</option>
                    <option value="Resolved">Resolved</option>
                </select>
                <button onClick={updateStatus}>Save</button>

                {message && <p style={{color: 'green'}}>{message}</p>}
            </div>

        </div>
    )
}

export default TicketDetail