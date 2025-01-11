import React, { useState, useEffect } from 'react';
import { useParams, useHistory } from 'react-router-dom';
import axios from 'axios';

const InvoiceForm = () => {
  const [invoice, setInvoice] = useState({
    invoiceNumber: '',
    clientName: '',
    date: '',
    amount: '',
    status: 'Pending'
  });
  const [error, setError] = useState('');
  const { id } = useParams();
  const history = useHistory();

  useEffect(() => {
    if (id) {
      fetchInvoice();
    }
  }, [id]);

  const fetchInvoice = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await axios.get(`http://localhost:5000/api/invoices/${id}`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setInvoice(response.data);
    } catch (error) {
      console.error('Error fetching invoice:', error);
    }
  };

  const handleChange = (e) => {
    setInvoice({ ...invoice, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem('token');
      if (id) {
        await axios.put(`http://localhost:5000/api/invoices/${id}`, invoice, {
          headers: { Authorization: `Bearer ${token}` }
        });
      } else {
        await axios.post('http://localhost:5000/api/invoices', invoice, {
          headers: { Authorization: `Bearer ${token}` }
        });
      }
      history.push('/');
    } catch (error) {
      setError('Error saving invoice');
    }
  };

  return (
    <div className="container">
      <h2>{id ? 'Edit Invoice' : 'Create Invoice'}</h2>
      {error && <p className="error">{error}</p>}
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="invoiceNumber"
          placeholder="Invoice Number"
          value={invoice.invoiceNumber}
          onChange={handleChange}
          required
        />
        <input
          type="text"
          name="clientName"
          placeholder="Client Name"
          value={invoice.clientName}
          onChange={handleChange}
          required
        />
        <input
          type="date"
          name="date"
          value={invoice.date}
          onChange={handleChange}
          required
        />
        <input
          type="number"
          name="amount"
          placeholder="Amount"
          value={invoice.amount}
          onChange={handleChange}
          required
        />
        <select
          name="status"
          value={invoice.status}
          onChange={handleChange}
          required
        >
          <option value="Paid">Paid</option>
          <option value="Unpaid">Unpaid</option>
          <option value="Pending">Pending</option>
        </select>
        <button type="submit">{id ? 'Update' : 'Create'} Invoice</button>
      </form>
    </div>
  );
};

export default InvoiceForm;

