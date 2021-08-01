import express from 'express';

import { getAllInvoice, addInvoice } from '../controllers/invoice.js';

const router = express.Router();

router.get('/all', getAllInvoice);
router.post('/add', addInvoice);



export default router;