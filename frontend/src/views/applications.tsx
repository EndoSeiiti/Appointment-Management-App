import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const API_URL = 'http://localhost:3000/reservations';

interface ReservationGrid{
    id: string;
    place: string;
    date: string;
    startTime: string;
    endTime: string;
    notes: string|null;
    userId: string;
}

const ReservationsPage: React.FC = () => {
    const [reservations, setReservations] = useState<ReservationGrid[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const navigate = useNavigate();

    const formatDate = (dateString: string) => {
        const date = new Date(dateString);
        return date.toLocaleDateString('pt-BR'); 
    };

    const fetchReservations = async () => {
        setLoading(true);
        setError(null);
        const token = localStorage.getItem('authToken');

        if (!token) {
            navigate('/'); 
            return;
        }

        try {
            const response = await axios.get<ReservationGrid[]>(API_URL, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });

            setReservations(response.data); 
        } catch (err: any) {
            if (err.response && (err.response.status === 401 || err.response.status === 403)) {
                localStorage.removeItem('authToken');
                navigate('/');
            } else {
                setError(err.response?.data?.message || 'Erro ao carregar as reservas.');
            }
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchReservations();
    }, []);

    if (loading) {
        return <div className="container">Carregando Reservas...</div>;
    }

    if (error) {
        return <div className="container error">Erro: {error}</div>;
    }

    if (reservations.length === 0) {
        return <div className="container">Nenhuma reserva encontrada.</div>;
    }

    return (
        <div className="container">
            <h2>Minhas Reservas</h2>
            <table>
                <thead>
                    <tr>
                        <th>Local</th>
                        <th>Data</th>
                        <th>Início</th>
                        <th>Fim</th>
                        <th>Notas</th>
                    </tr>
                </thead>
                <tbody>
                    {reservations.map((res) => (
                        <tr key={res.id}>
                            <td>{res.place}</td>
                            <td>{formatDate(res.date)}</td>
                            <td>{res.startTime}</td>
                            <td>{res.endTime}</td>
                            <td>{res.notes || 'N/A'}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default ReservationsPage;