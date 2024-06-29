import express from 'express'
import { verifyAdmin } from '../utils/verifyToken.js';
import { addSeat, updateSeat, deleteSeat, getSingleSeat, getAllSeat } from '../controllers/seatController.js';

const router = express.Router();

router.post('/:busid', verifyAdmin, addSeat);
router.put('/:id', verifyAdmin, updateSeat);
router.delete('/:id/:busid', verifyAdmin, deleteSeat);
router.get('/:id', getSingleSeat);
router.get('/:id', getAllSeat);

export default router;