import express from 'express'
import {addNewBus, updateBus, deleteBus, getSingleBus, getAllBus} from '../controllers/busController.js'
import { verifyAdmin } from '../utils/verifyToken.js';

const router = express.Router();


router.post('/', verifyAdmin, addNewBus);
router.put('/:id', verifyAdmin, updateBus);
router.delete('/:id', verifyAdmin, deleteBus); 
router.get('/:id', getSingleBus);
router.get('/', getAllBus);

export default router;