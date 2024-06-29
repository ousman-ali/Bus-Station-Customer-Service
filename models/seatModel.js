import mongoose from 'mongoose';
const {Schema} = mongoose;

const seatSchema = new mongoose.Schema({
    title:{
        type: String,
        required: true
    },
    price:{
        type: Number,
        required: true
    },
    seatNumbers:[{
        number: Number,
        UnavailableTime: {type: [Date]}}],
},
    {
        timestamps:  true
    }
);

export default mongoose.model("seatModel", seatSchema); 