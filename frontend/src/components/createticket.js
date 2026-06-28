import React, { useState } from 'react';
function CreateTicket() {
    const [formData, setFormData] = useState({
        customer_name: '',
        customer_email: '',
        subject: '',
        description: '',
        priority: 'LOW',

    });
    const [error,seterror] = useState(''); 
    const [success,setsuccess] = useState('');
    const handlechange=(e)=>{
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });};
        const handlesubmit = async (e) => {
            e.preventDefault();
            seterror('');
            setsuccess('');
            try {
                const response = await fetch('http://localhost:3001/api/tickets', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(formData),
                });
                const data= await response.json();
                if (!response.ok) {
                    seterror(data.error);
                }
                else{
                    setsuccess(`Ticket created successfully with ID: ${data.id}`);
                    setFormData({
                        customer_name: '',
                        customer_email: '',
                        subject: '',
                        description: '',
                        priority: 'LOW',
                    });
                }}
                catch (error) {
                    seterror('An error occurred while creating the ticket.');
                }};
                return (
                    <div style= {{padding: '20px'}}>
                        <h2>Create Ticket</h2>
                        {error && <p style={{ color: 'red' }}>{error}</p>}
                        {success && <p style={{ color: 'green' }}>{success}</p>}
                        <form onSubmit={handlesubmit}>
                            <div>
                                <label>name</label><br></br>
                                <input name="customer_name" value={formData.customer_name} onChange={handlechange} required />
                    
                            </div><br></br>
                            <div>
                                <label>Customer email</label><br></br>
                                <input name="customer_email" value={formData.customer_email} onChange={handlechange} required />
                            </div><br></br>
                            <div>
                                <label>Subject</label><br></br>
                                <input name="subject" value={formData.subject} onChange={handlechange} required />
                            </div><br></br>
                            <div>
                                <label>Description</label><br></br>
                                <textarea name="description" value={formData.description} onChange={handlechange} required />   
                        </div><br></br>
                        <div>
                            <label>Priority</label><br></br>
                            <select name="priority" value={formData.priority} onChange={handlechange} required>
                                <option value="LOW">LOW</option>
                                <option value="MEDIUM">MEDIUM</option>
                                <option value="HIGH">HIGH</option>
                            </select>   


                        </div><br></br>
                        <button type="submit">Create Ticket</button>
                    </form>
                </div>
            );
        }       
export default CreateTicket;