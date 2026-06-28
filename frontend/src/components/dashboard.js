import React, { useState, useEffect } from 'react';

function Dashboard() {

    const [stats, setStats] = useState({
        total: 0,
        open: 0,
        inProgress: 0,
        resolved: 0,
        urgent: 0,
    }); 

    useEffect(() => {
        fetch('http://localhost:3001/api/dashboard')
        .then(res => res.json())
        .then(data => setStats(data));
    }, []);

    return (
        <div style={{ padding: '20px' }}>
            <h2>Dashboard</h2>
            <div style={{ display: 'flex', gap: '20px'}}>

                <div style={{ backgroundColor: '#f0f0f0', padding: '10px', borderRadius: '5px' }}>
                    <h3>Total</h3>
                    <p>{stats.total}</p>
                </div>

                <div style={{ backgroundColor: '#cce5ff', padding: '10px', borderRadius: '5px' }}>
                    <h3>Open</h3>
                    <p>{stats.open}</p>
                </div>

                <div style={{ backgroundColor: '#fff3cd', padding: '10px', borderRadius: '5px' }}>
                    <h3>In Progress</h3>
                    <p>{stats.inProgress}</p>
                </div>

                <div style={{ backgroundColor: '#d4edda', padding: '10px', borderRadius: '5px' }}>
                    <h3>Resolved</h3>
                    <p>{stats.resolved}</p>
                </div>

                <div style={{ backgroundColor: '#f8d7da', padding: '10px', borderRadius: '5px' }}>
                    <h3>Urgent</h3>
                    <p>{stats.urgent}</p>
                </div>

            </div>
        </div>
    );
}

export default Dashboard;