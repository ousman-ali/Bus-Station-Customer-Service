import express from 'express'
import dotenv from 'dotenv'
import mongoose from 'mongoose'
import authRoute from './routes/auth.js'
import customerRoute from './routes/customer.js'
import busRoute from './routes/bus.js'
import seatRoute from './routes/seat.js'
import cookieParser from 'cookie-parser'
const app = express()
dotenv.config()

const connect = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URL);
        console.log("connected to mongodb");
    } catch (error) {
        throw error;
    }
}

mongoose.connection.on("disconnected", ()=>{
    console.log("mongodb disconnected");
})
mongoose.connection.on("connected", ()=>{
    console.log("mongodb connected");
})

app.get('/', (req, res)=>{
    res.send('this is first request');
})

// middlewares
app.use(cookieParser())
app.use(express.json());

app.use('/api/auth', authRoute);
app.use('/api/customer', customerRoute);
app.use('/api/bus', busRoute);
app.use('/api/seat', seatRoute);

app.use((err, req, res, next)=>{
    const errorStatus = err.status || 500;
    const errorMessage = err.message || "Something went wrong";
  return res.status(500).json({
    success: false,
    status: errorStatus,
    message: errorMessage,
    stack: err.stack,
  });
})

app.listen(8800, ()=>{
    connect();
    console.log("The backend is running on port 8800");
})



