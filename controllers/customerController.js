import customerModel from "../models/customerModel.js";

export const addNewCustomer = async (req, res, next) => {
    const newCustomer = new customerModel(req.body);      
    try {
        const savedCustomer = await newCustomer.save();  
        res.status(200).json(savedCustomer);
     } catch (err) {
           next(err);
        }
}

export const updateCustomer = async (req, res, next) => {        
    try {
       const updatedCustomer = await customerModel.findByIdAndUpdate(
           req.params.id, 
           { $set: req.body}, 
           {new: true}
       );  
       res.status(200).json(updatedCustomer);
   } catch (err) {
         next(err);
       }
}

export const deleteCustomer = async (req, res, next) => {       
    try {
       await customerModel.findByIdAndDelete(req.params.id);  
       res.status(200).json("Customer has been deleted");
   } catch (err) {
        next(err);
       }
}

export const getSingleCustomer = async (req, res, next) => {       
    try {
       const singleCustomer = await customerModel.findById(req.params.id);  
       res.status(200).json(singleCustomer);
   } catch (err) {
         next(err);
       }
}

export const getAllCustomer = async (req, res, next) => {
    try {
       const allCustomers = await customerModel.find();  
       res.status(200).json(allCustomers);
   } catch (err) {
           next(err);
       }
}

