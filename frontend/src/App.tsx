import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import LoginPage from './views/login'; 
import RegisterPage from './views/register';
import ReservationsPage from './views/applications';


const App: React.FC = () => {
    return (
        <BrowserRouter> 
            <Routes>
                
                <Route path="/" element={<LoginPage />} />
                <Route path="/register" element={<RegisterPage />} />
                <Route path="/reservations" element={<ReservationsPage />} />

            </Routes>
        </BrowserRouter>
    );
};

export default App;