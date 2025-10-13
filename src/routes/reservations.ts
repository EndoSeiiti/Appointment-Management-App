import { Router, Request, Response } from 'express';
import { Reservation } from '../models/Reservation';
import { request } from 'http';

const reservationsRouter = Router();

let reservations: Reservation[] = [
    {
        id: "101",
        place: "Sala Alpha",
        date: "2025-11-15",
        startTime: "09:00",
        endTime: "10:00",
        userEmail: "teste@empresa.com",
    }
];

reservationsRouter.post('/',(req: Request, res: Response) =>{
    const newReservationData: Reservation = req.body;
    console.log(newReservationData)
    if (!newReservationData?.place||!newReservationData?.date||!newReservationData?.startTime){
        return res.status(400).json({message:"Incomplete Data"});
    }
    const newId = Date.now().toString();

    const reservation: Reservation={
        ...newReservationData,
        id:newId
    };
    reservations.push(reservation);
    return res.status(201).json(reservation);

});
reservationsRouter.get('/',(req:Request, res:Response)=>{
    return res.status(200).json(reservations);
});
reservationsRouter.delete('/:id',(req:Request,res:Response)=>{
    const{id} = req.params;
    const initialLength = reservations.length;
    reservations = reservations.filter(r=>r.id!==id);
    if (reservations.length===initialLength){
        return res.status(404).json({message:"Reservation not found"});
    }
    return res.status(204).send();
});

export default reservationsRouter;