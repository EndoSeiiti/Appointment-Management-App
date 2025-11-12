import React, { useState } from 'react';
import axios from 'axios';

const API_URL = 'http://localhost:3000/users/register';

const RegisterPage: React.FC = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [username, setUsername] = useState('');
    const [message, setMessage] = useState({ text: '', isError: false });
    const [loading, setLoading] = useState(false);
        
    const handleRegister = async (e: React.FormEvent) => {
        e.preventDefault();

        try {
            const response = await axios.post(API_URL,{username, password, email});
            setMessage({text:'Success, redirecting...', isError: false});
            setTimeout(()=>{window.location.href = '/login';},2000);
        }
        catch (error: any){
            setMessage({text:'Error registering user', isError: false});
        }
        finally{
            setLoading(false);
        }
    };
        return (
        <div className="container">
            <h2>Criar Conta</h2>
            <form onSubmit={handleRegister}>
                
               
                <div>
                    <label htmlFor="username">Nome de Usuário</label>
                    <input 
                        type="text" 
                        id="username" 
                        value={username} 
                        onChange={(e) => setUsername(e.target.value)} 
                        required 
                    />
                </div>

               
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
                    <label htmlFor="password">Senha</label>
                    <input 
                        type="password" 
                        id="password" 
                        value={password} 
                        onChange={(e) => setPassword(e.target.value)} 
                        required 
                    />
                </div>

                
                <button type="submit" disabled={loading}>
                    {loading ? 'Cadastrando...' : 'Cadastrar'}
                </button>
            </form>

            
            {message.text && (
                <div className={`message ${message.isError ? 'error' : 'success'}`}>
                    {message.text}
                </div>
            )}
        </div>
    );
    };
    export default RegisterPage