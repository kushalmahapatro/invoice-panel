import express from 'express';

import { getAllAccess } from '../controllers/access.js';

const router = express.Router();

router.get('/all', getAllAccess);


export default router;