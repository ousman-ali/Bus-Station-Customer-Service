import mongoose from 'mongoose'
const {Schema} = mongoose;

const busSchema = new mongoose.Schema({
    name:{
        type: String,
        required: true
    },
    type:{
        type: String,
        required: true
    },
    tag:{
        type: Number,
        required: true
    },
    departure:{
        type: String,
        required: true
    },
    destination:{
        type: String,
        required: true
    },
    images:{
        type: [String]
    },
    description:{
        type: String,
        required: true
    },
    rating:{
        type: Number,
        min: 0,
        max: 5
    },
    seats:{
        type: [String]
    }
},
{
    timestamps: true
}
);

export default mongoose.model("busModel", busSchema);