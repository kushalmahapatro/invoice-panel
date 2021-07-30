import express from 'express';
// import mongoose from 'mongoose';

import CustomerMessage from '../models/customerMessage.js';

const router = express.Router();

export const getAllCustomers = async (req, res) => { 
    try {
        const customers = await CustomerMessage.find();
                
        res.status(200).json(customers);
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
}

export const addCustomer = async (req, res) => {
    const { name, number, address } = req.body;

    const newPostMessage = new CustomerMessage({ name, number, address })

    // {
    //     "name": "Kushal Mahapatro",
    //     "number": "0521104369",
    //     "address": "Dubai, Discovery Gardens"
    //   }

    try {
        await newPostMessage.save();

        res.status(201).json(newPostMessage );
    } catch (error) {
        res.status(409).json({ message: error.message });
    }
}