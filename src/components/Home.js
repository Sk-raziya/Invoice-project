import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

const Home = () => {
  const [invoices, setInvoices] = useState([]);
  const [sortField, setSortField] = useState('date');
  const [sortOrder, setSortOrder] = useState('asc');
  const [filterStatus, setFilterStatus] = useState('');

  useEffect(() => {
    fetchInvoices();
  }, []);

  const fetchInvoices = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await axios.get('http://localhost:5000/api/invoices', {
        headers: { Authorization: `Bearer ${token}` }
      });
      setInvoices(response.data);
    } catch (error) {
      console.error('Error fetching invoices:', error);
    }
  };

  const handleSort = (field) => {
    if (field === sortField) {
      setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
    } else {
      setSortField(field);
      setSortOrder('asc');
    }
  };

  const handleFilter = (status) => {
    setFilterStatus(status);
  };

  const sortedAndFilteredInvoices = invoices
    .filter(invoice => filterStatus ? invoice.status === filterStatus : true)
    .sort((a, b) => {
      if (a[sortField] < b[sortField]) return sortOrder === 'asc' ? -1 : 1;
      if (a[sortField] > b[sortField]) return sortOrder === 'asc' ? 1 : -1;
      return 0;
    });

  return (
    <div className="container">
      <h2>Invoices</h2>
      <Link to="/invoice">Create New Invoice</Link>
      <div>
        <button onClick={() => handleSort('date')}>Sort by Date</button>
        <button onClick={() => handleSort('amount')}>Sort by Amount</button>
        <select onChange={(e) => handleFilter(e.target.value)}>
          <option value="">All Statuses</option>
          <option value="Paid">Paid</option>
          <option value="Unpaid">Unpaid</option>
          <option value="Pending">Pending</option>
        </select>
      </div>
      <table>
        <thead>
          <tr>
            <th>Invoice Number</th>
            <th>Client Name</th>
            <th>Date</th>
            <th>Amount</th>
            <th>Status</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {sortedAndFilteredInvoices.map(invoice => (
            <tr key={invoice._id}>
              <td>{invoice.invoiceNumber}</td>
              <td>{invoice.clientName}</td>
              <td>{new Date(invoice.date).toLocaleDateString()}</td>
              <td>${invoice.amount.toFixed(2)}</td>
              <td>{invoice.status}</td>
              <td>
                <Link to={`/invoice/${invoice._id}`}>Edit</Link>
                <button onClick={() => handleDelete(invoice._id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Home;

