export interface Reservation{
    id: string;
    place: string;
    date: string;
    startTime: string;
    endTime: string;
    userEmail: string;
    notes?: string;
}