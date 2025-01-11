import express from 'express';
import Invoice from '../models/Invoice.js';
import auth from '../middleware/auth.js';

const router = express.Router();

// Create a new invoice
router.post('/', auth, async (req, res) => {
  try {
    const invoice = new Invoice({
      ...req.body,
      userId: req.user._id
    });
    await invoice.save();
    res.status(201).send(invoice);
  } catch (error) {
    res.status(400).send(error);
  }
});

// Get all invoices for the logged-in user
router.get('/', auth, async (req, res) => {
  try {
    const invoices = await Invoice.find({ userId: req.user._id });
    res.send(invoices);
  } catch (error) {
    res.status(500).send(error);
  }
});

// Update an invoice
router.put('/:id', auth, async (req, res) => {
  try {
    const invoice = await Invoice.findOneAndUpdate(
      { _id: req.params.id, userId: req.user._id },
      req.body,
      { new: true, runValidators: true }
    );
    if (!invoice) {
      return res.status(404).send();
    }
    res.send(invoice);
  } catch (error) {
    res.status(400).send(error);
  }
});

// Delete an invoice
router.delete('/:id', auth, async (req, res) => {
  try {
    const invoice = await Invoice.findOneAndDelete({ _id: req.params.id, userId: req.user._id });
    if (!invoice) {
      return res.status(404).send();
    }
    res.send(invoice);
  } catch (error) {
    res.status(500).send(error);
  }
});

export default router;

