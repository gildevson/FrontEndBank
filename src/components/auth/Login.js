import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Login.css';

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);

        try {
            const response = await fetch('https://backend-bank.vercel.app/auth/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ email, password }),
                credentials: 'include' // Inclui cookies na requisição
            });

            const data = await response.json();

            if (response.ok) {
                localStorage.setItem('token', data.token);
                localStorage.setItem('username', data.username ? data.username : 'Guest');
                localStorage.setItem('permission', data.permission_id);

                navigate('/menu');
            } else {
                setError(data.message || 'Erro no login.');
            }
        } catch (err) {
            setError('Erro na conexão com o servidor.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div>
            
            {loading ? (
                <div className="login-loading-screen">
                    <div className="login-spinner"></div>
                </div>
            ) : (
                <div className="login-container">
                    <h1>Login</h1>
                    <form onSubmit={handleSubmit}>
                        <div>
                            <label>Email:</label>
                            <input
                                type="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                required
                            />
                        </div>
                        <div>
                            <label>Senha:</label>
                            <input
                                type="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                required
                            />
                        </div>
                        {error && <p className="login-error-message">{error}</p>}
                        <button type="submit" disabled={loading}>
                            {loading ? 'Carregando...' : 'Acessar'}
                        </button>
                    </form>
                    <a href="/forgot-password">Esqueci minha senha</a>
                </div>
            )}
        </div>
    );
};

export default Login;
