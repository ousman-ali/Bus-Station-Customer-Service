import seatModel from "../models/seatModel.js";
import busModel from "../models/busModel.js";

export const addSeat = async (req, res, next) => {
       const busId = req.params.busid;
       const newSeat = new seatModel(req.body)

       try {
            const savedSeat = await newSeat.save()
                try {
                    await busModel.findByIdAndUpdate(busId, {
                        $push: {seats: savedSeat._id }
                    });
                } catch (err) {
                    next(err)
                }
            res.status(200).json(savedSeat);
       } catch (err) {
            next(err)
       }
}

export const updateSeat = async (req, res, next) => {        
    try {
       const updatedSeat = await seatModel.findByIdAndUpdate(
           req.params.id, 
           { $set: req.body}, 
           {new: true}
       );  
       res.status(200).json(updatedSeat);
   } catch (err) {
         next(err);
       }
}

export const deleteSeat = async (req, res, next) => {  
    const busId = req.params.busid;
    
    try {
       await seatModel.findByIdAndDelete(req.params.id);
       try {
        await busModel.findByIdAndUpdate(busId, {
            $pull: {seats: req.params.id }
        });
    } catch (err) {
        next(err)
    } 
       res.status(200).json("Seat has been deleted");
   } catch (err) {
        next(err);
       }
}

export const getSingleSeat = async (req, res, next) => {       
    try {
       const singleSeat = await seatModel.findById(req.params.id);  
       res.status(200).json(singleSeat);
   } catch (err) {
         next(err);
       }
}

export const getAllSeat = async (req, res, next) => {
    try {
       const allSeats = await seatModel.find();  
       res.status(200).json(allSeats);
   } catch (err) {
           next(err);
       }  
}
