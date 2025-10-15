import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import { User } from './models/User';
import dotenv from "dotenv"

dotenv.config();
const JWT_PASS=process.env.JWT_SECRET as string;

export interface AuthReq extends Request{
    user?:{
        userId:string;
        userEmail:string
    };
}

const authMid = (req:AuthReq, res:Response, next:NextFunction) =>{
    const authHeader = req.header('Authorization');
    
    if (!authHeader||!authHeader.startsWith('Bearer')){
        return res.status(401).json({message:'Invalid Token'});
    }

    const token = authHeader.split(' ')[1];
    try {
        const decoded= jwt.verify(token,JWT_PASS) as {userId:string, userEmail:string};
         req.user = {
            userId:decoded.userId,
            userEmail:decoded.userEmail
         };
         next();
    }
    catch (error) {
        return res.status(403).json({message:'Invalid or expired Token'});
    }
};

export default authMid;