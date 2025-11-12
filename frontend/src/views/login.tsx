import React, { useState } from 'react';
import axios from 'axios';
import {Link} from 'react-router-dom'

const API_URL = 'http://localhost:3000/users/login';

const LoginPage: React.FC = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [message, setMessage] = useState({ text: '', isError: false });
    const [loading, setLoading] = useState(false);

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setMessage({ text: 'Processando...', isError: false });

        try {
            const response = await axios.post(API_URL, { email, password });
            
            localStorage.setItem('authToken', response.data.token);
            const username = response.data.user?.username || 'Usuário(a)';
            
            setMessage({ text: `Bem-vindo(a), ${username}! Redirecionando...`, isError: false });


        } catch (error: any) {
            const errorMessage = error.response?.data?.message || 'Erro de conexão ou credenciais inválidas.';
            setMessage({ text: errorMessage, isError: true });

        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="container">
            <h2>Login Page</h2>
            <form onSubmit={handleLogin}>
                <div>
                    <label htmlFor="email">Email</label>
                    <input 
                        type="email" 
                        id="email" 
                        value={email} 
                        onChange={(e) => setEmail(e.target.value)} 
                        required 
                    />
                    
                </div>
                
                
                <div>
                    <label htmlFor="password">Password</label>
                    <input 
                        type="password" 
                        id="password" 
                        value={password} 
                        onChange={(e) => setPassword(e.target.value)} 
                        required 
                    />
                </div>
                
                <button type="submit" disabled={loading}>
                    {loading ? 'Aguarde...' : 'Entrar'}
                </button>
                <Link to="/register">
                    <button className="meu-botao-estilizado">
                    Ir para a Página de Registro
                    </button>
                </Link>
            </form>

            {message.text && (
                <div className={`message ${message.isError ? 'error' : 'success'}`}>
                    {message.text}
                </div>
            )}
        </div>
        
    );
};

export default LoginPage;