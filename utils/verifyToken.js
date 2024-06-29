import jwt from 'jsonwebtoken';
import {createError} from '../utils/error.js';

export const verifyToken = (req, res, next)=>{
    const token = req.cookies.access_token;
    if(!token){
        return next(createError(401, "you are not authenticated"));
    }
    jwt.verify(token, process.env.JWT_SECRET, (err, customer)=>{
        if(err) return next(createError(403, "Invalid Token"));
        req.customer = customer;
        next()
    });
};

export const verifyCustomer = (req, res, next) => {
    verifyToken(req, res, next, ()=>{
        if(req.customer.id === req.params.id || req.params.isAdmin ){
            next()
        } else {
           return next(createError(403, "you are not authorized"));
        }
    });
};

export const verifyAdmin = (req, res, next) => {
    verifyToken(req, res, next, ()=>{
        if(req.customer.id === req.params.id && req.customer.isAdmin){
            next()
        } else {
           return next(createError(403, "you are not authorized"));
        }
    });
};

export default {verifyToken, verifyCustomer, verifyAdmin};