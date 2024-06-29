import customerModel from "../models/customerModel.js";
import bcrypt from 'bcryptjs'
import createError from '../utils/error.js'
import jwt from 'jsonwebtoken'

export const register = async (req, res, next) => {
   try {

        const salt = bcrypt.genSaltSync(10);
        const hash = bcrypt.hashSync(req.body.password, salt);

    const newCustomer = new customerModel({
        username: req.body.username,
        email: req.body.email,
        password: hash,
    })

    await newCustomer.save()
    res.status(200).send("new customer has been created.")
    
   } catch (err) {
        next(err);
   }
}

export const login = async (req, res, next) => {
    try {
 
       const customer =  await customerModel.findOne({username: req.body.username})
       if(!customer) return next(createError(404, "User not found!"))

       const isPasswordCorrect = await bcrypt.compare(req.body.password, customer.password)
       if(!isPasswordCorrect) return next(createError(400, "Wrong password or username"))

        const token = jwt.sign({ id: customer._id, isAdmin: customer.isAdmin}, process.env.JWT_SECRET);

       const {password, isAdmin, ...otherDetails} = customer._doc;  
       res
       .cookie("access_token", token, {
         httpOnly: true,
       })
       .status(200).json({otherDetails}); 

    } catch (err) {
         next(err);
    }
 }