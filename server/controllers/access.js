import express from 'express';
// import mongoose from 'mongoose';

import AccessMessage from '../models/accessMessage.js';

const router = express.Router();

export const getAllAccess = async (req, res) => { 
    try {
        const access = await AccessMessage.find();
                
        res.status(200).json(access);
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
}