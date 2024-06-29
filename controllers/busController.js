import busModel from "../models/busModel.js";

export const addNewBus = async (req, res, next) => {
    const newBus = new busModel(req.body);      
    try {
        const savedBus = await newBus.save();  
        res.status(200).json(savedBus);
     } catch (err) {
           next(err);
        }
}

export const updateBus = async (req, res, next) => {        
    try {
       const updatedBus = await busModel.findByIdAndUpdate(
           req.params.id, 
           { $set: req.body}, 
           {new: true}
       );  
       res.status(200).json(updatedBus);
   } catch (err) {
         next(err);
       }
}

export const deleteBus = async (req, res, next) => {       
    try {
       await busModel.findByIdAndDelete(req.params.id);  
       res.status(200).json("Bus has been deleted");
   } catch (err) {
        next(err);
       }
}

export const getSingleBus = async (req, res, next) => {       
    try {
       const singleBus = await busModel.findById(req.params.id);  
       res.status(200).json(singleBus);
   } catch (err) {
         next(err);
       }
}

export const getAllBus = async (req, res, next) => {
    try {
       const allBuses = await busModel.find();  
       res.status(200).json(allBuses);
   } catch (err) {
           next(err);
       }
}

