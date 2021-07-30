import express from 'express';

import { getAllCustomers, addCustomer } from '../controllers/customers.js';

const router = express.Router();

router.get('/all', getAllCustomers);
router.post('/add', addCustomer);



export default router;