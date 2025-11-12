import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import LoginPage from './views/login'; 
import RegisterPage from './views/register';


const App: React.FC = () => {
    return (
        <BrowserRouter> 
            <Routes>
                
                <Route path="/" element={<LoginPage />} />

                <Route path="/register" element={<RegisterPage />} />

            </Routes>
        </BrowserRouter>
    );
};

export default App;