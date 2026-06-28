import React, { useState } from 'react';
import CreateTicket from './components/createticket';

function App() {
  const [page, setPage] = useState('create');

  return (
    <div>
      <div style={{background: '#333', padding: '10px', display: 'flex', gap: '10px'}}>
        <button onClick={() => setPage('create')} style={{padding: '8px 15px', cursor: 'pointer'}}>
          Create Ticket
        </button>
      </div>
      <div>
        {page === 'create' && <CreateTicket />}
      </div>
    </div>
  );
}

export default App;