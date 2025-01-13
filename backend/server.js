
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const { v4: uuidv4 } = require('uuid');

const app = express();
const port = process.env.PORT || 5000;

app.use(cors());
app.use(bodyParser.json());

let invoices = [];

// Create a new invoice
app.post('/invoices', (req, res) => {
  const newInvoice = { ...req.body, id: uuidv4() };
  invoices.push(newInvoice);
  res.status(201).json(newInvoice);
});

// Get all invoices
app.get('/invoices', (req, res) => {
  res.json(invoices);
});

// Update an invoice
app.put('/invoices/:id', (req, res) => {
  const { id } = req.params;
  const updatedInvoice = req.body;
  invoices = invoices.map(invoice => invoice.id === id ? { ...invoice, ...updatedInvoice } : invoice);
  res.json(updatedInvoice);
});

// Delete an invoice
app.delete('/invoices/:id', (req, res) => {
  const { id } = req.params;
  invoices = invoices.filter(invoice => invoice.id !== id);
  res.sendStatus(204);
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
