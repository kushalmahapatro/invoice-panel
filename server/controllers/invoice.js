import express from 'express';
// import mongoose from 'mongoose';

import InvoiceMessage from '../models/invoiceMessage.js';

const router = express.Router();

export const getAllInvoice = async (req, res) => { 
    try {
        const invoices = await InvoiceMessage.find();
                
        res.status(200).json(invoices);
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
}

export const addInvoice = async (req, res) => {
    const { customer, invoice, invoiceDate, items, advancePayment, subTotal, total } = req.body;

    const newPostMessage = new InvoiceMessage({customer, invoice, invoiceDate, items , advancePayment, subTotal, total})

    try {
        await newPostMessage.save();

        res.status(201).json(newPostMessage );
    } catch (error) {
        res.status(409).json({ message: error.message });
    }
}