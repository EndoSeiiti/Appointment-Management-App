import { Router, Request, Response } from 'express';
import bcrypt from 'bcryptjs';
import prisma from '../prisma';

const usersRouter = Router()

usersRouter.post('/register',async(req:Request,res:Response) =>{
    const {email, username, password} = req.body
    if (!email||!username||password){
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
                name:true,
                datecreated:true,
            }
        });
        return res.status(201).json({message:"User registered successfully!", user});
    }
    catch (error){
        if (error.code=='P2002'){
            return res.status(409).json({message:'Email already in use'});
        }
        console.error("Error in registering user", error);
        return res.status(500),json({message:'Internal server error'});
        }
});


usersRouter.get('/login',async(req:Request, res:Response)=>{
    const user= await prisma.user.findUnique({
        where: {email},
        select:{
        id:true
        email:true
        username:true
        password:true
        }
    });
});

export default usersRouter;