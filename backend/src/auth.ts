import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import dotenv from "dotenv";

dotenv.config();

const JWT_PASS = process.env.JWT_SECRET as string; 

if (!JWT_PASS) {
    throw new Error("FATAL ERROR: JWT_SECRET is not defined in environment variables.");
}

interface AuthPayload {
    userId: string;
    userEmail: string;
}

export interface AuthReq extends Request {
    user?: AuthPayload; 
}

const authMid = (req:AuthReq, res:Response, next:NextFunction) =>{
    const authHeader = req.header('Authorization');
    
    if (!authHeader || !authHeader.startsWith('Bearer ')){
        // 🚨 Ajustei aqui para checar o espaço após 'Bearer'
        return res.status(401).json({message:'Authorization token not provided or invalid format.'});
    }

    const token = authHeader.split(' ')[1];
    
    // 2. 🛡️ CHECAGEM DO TOKEN: Garante que a string não está vazia após o split
    if (!token) {
        return res.status(401).json({ message: 'Token value is missing.' });
    }

    try {
        // 3. 🚨 Asserção Não-Nula (!) no JWT_PASS (Solução para o TS2769 persistente)
        const decoded = jwt.verify(token, JWT_PASS!) as unknown as AuthPayload;
         
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
