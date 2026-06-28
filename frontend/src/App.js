import React, { useState } from 'react';
import Dashboard from './components/dashboard';
import TicketList from './components/ticketlist';
import CreateTicket from './components/createticket';
import TicketDetail from './components/Details';

function App() {

  const [page, setPage] = useState('dashboard')
  const [selectedTicketId, setSelectedTicketId] = useState(null)

  const openTicket = (id) => {
    setSelectedTicketId(id)
    setPage('detail')
  }

  const goBack = () => {
    setPage('tickets')
  }

  return (
    <div>

      <div style={{background: '#333', padding: '10px', display: 'flex', gap: '10px'}}>
        <button 
          onClick={() => setPage('dashboard')} 
          style={{padding: '8px 15px', cursor: 'pointer'}}>
            Dashboard
        </button>
        <button 
          onClick={() => setPage('tickets')} 
          style={{padding: '8px 15px', cursor: 'pointer'}}>
            All Tickets
        </button>
        <button 
          onClick={() => setPage('create')} 
          style={{padding: '8px 15px', cursor: 'pointer'}}>
            Create Ticket
        </button>
      </div>

      {/* show page based on state */}
      <div>
        {page == 'dashboard' && <Dashboard />}

        {page == 'tickets' && <TicketList openTicket={openTicket} />}

        {page == 'create' && <CreateTicket />}

        {page == 'detail' && <TicketDetail ticketId={selectedTicketId} goBack={goBack} />}
      </div>

    </div>
  )
}

export default App