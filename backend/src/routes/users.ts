import { Router, Request, Response } from 'express';
import bcrypt from 'bcryptjs';
import prisma from '../prisma';
import jwt from 'jsonwebtoken';
import dotenv from "dotenv";

dotenv.config();


const JWT_PASS =process.env.JWT_SECRET||"default_secret";

const usersRouter = Router()

usersRouter.post('/register',async(req:Request,res:Response) =>{
    const {email, username, password} = req.body
    if (!email||!username||!password){
        return res.status(400).json({message:"All fields should be filled"});
    }
    try {
        const salt=await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt)    
        
        const user= await prisma.user.create({
            data: {
                email, 
                username, 
                password:hashedPassword
            },
            select:{
                id:true,
                email:true,
                username:true,
                datecreated:true,
            }
        });
        return res.status(201).json({message:"User registered successfully!", user});
    }
    catch (error:any){
        if (error.code=='P2002'){
            return res.status(409).json({message:'Email already in use'});
        }
        console.error("Error in registering user", error);
        return res.status(500).json({message:'Internal server error'});
        }
});


usersRouter.post('/login',async(req:Request, res:Response)=>{
    const {email,password} = req.body;

    if (!email||!password){
    return res.status(400).json({message:'Email or password missing'});
}
    try {
    const user= await prisma.user.findUnique({where: {email}});
    
    if(!user){
        return res.status(401).json({message:'Invalid Credentials'});
    }
    const isMatch=await bcrypt.compare(password, user.password);

    if (!isMatch){
        return res.status(401).json({message:'Invalid Credentials'});
    }
    const token = jwt.sign(
        {userId: user.id, userEmail:user.email},
        JWT_PASS,
        {expiresIn:'1h'}
    );
    
    return res.json({
        message:'Logged in',
        token,
        user:{id:user.id, email:user.email, username:user.username }
    });
    }  
    catch (error) {
        console.error('Error on Login',error);
        return res.status(500).json({message:'Internal server error'});
    }     
});

export default usersRouter;