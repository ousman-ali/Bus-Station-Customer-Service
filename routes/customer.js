import express from 'express'
import { updateCustomer, deleteCustomer,  getSingleCustomer, getAllCustomer} from '../controllers/customerController.js';
import { verifyAdmin, verifyCustomer, verifyToken } from '../utils/verifyToken.js';

const router = express.Router();

// router.get('/checkauthentication', verifyToken, (req, res, next)=>{
//     res.send("Hello customer you are logged in");
// })

// router.get('/checkcustomer/:id', verifyCustomer, (req, res, next)=>{
//     res.send("Hello customer, you are logged in and you can delete your account");
// })

// router.get('/checkcadmin/:id', verifyAdmin, (req, res, next)=>{
//     res.send("Hello Admin, you are logged in and you can delete all accounts");
// })

router.put('/:id', verifyCustomer, updateCustomer);
router.delete('/:id', verifyCustomer, deleteCustomer); 
router.get('/:id', verifyCustomer, getSingleCustomer);
router.get('/', verifyAdmin, getAllCustomer);

export default router;