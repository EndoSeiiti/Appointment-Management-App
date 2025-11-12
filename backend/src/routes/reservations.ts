import { Router, Request, Response } from 'express';
import authMid, {AuthReq} from '../auth';
import prisma from '../prisma';

const reservationsRouter = Router();


reservationsRouter.post('/',authMid, async(req: AuthReq, res: Response) =>{

    const userId = req.user!.userId;
    const {place, date, startTime, endTime, notes}= req.body;
    
    if (!place||!date||!startTime||!endTime){
        return res.status(400).json({message:"Incomplete Data"});
    }
    
    try {
        const newReservation=await prisma.reservations.create({
            data:{
                place,
                date: new Date(date),
                startTime,
                endTime,
                notes,
                userId: userId,
            },
        });
        return res.status(201).json({ message: "Reservation created successfully", reservation: newReservation });
    }
        catch (error) {
            return res.status(500).json({message:'Error'});
        }

    });

reservationsRouter.get('/',authMid,async(req:AuthReq, res:Response)=>{
    const userId = req.user!.userId;

    try{
        const reservations = await prisma.reservations.findMany({
            where: {
                userId: userId,
            },
            orderBy:{
                date:'asc',
            }
        });
        return res.status(200).json(reservations)
    }
    catch (error) {
    return res.status(500).json({message:'Error'});
}

});
reservationsRouter.delete('/:id',authMid,async(req:AuthReq,res:Response)=>{
    const userId = req.user!.userId;
    const { id } = req.params as {id:string};
    try {
        const deleteReservation = await prisma.reservations.delete({
            where:{
                id:id,
                userId:userId,
            },
        });
        return res.status(204).send();
    }
    catch (error){
        res.status(500).json({message:'Error'});
    }

});

export default reservationsRouter;