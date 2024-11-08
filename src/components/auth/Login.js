import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './Login.css';

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const [searchTerm, setSearchTerm] = useState('');
    const [users, setUsers] = useState([]);
    const navigate = useNavigate();

    // Função para buscar os usuários
    const fetchUsers = async () => {
        try {
            const response = await fetch('https://bakend-bank.vercel.app/users', {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                },
                credentials: 'include',
            });
            const data = await response.json();
            if (response.ok) {
                setUsers(data.users); // Supondo que a resposta seja um objeto com uma lista de usuários
            } else {
                setError('Erro ao buscar usuários.');
            }
        } catch (err) {
            setError('Erro na conexão com o servidor.');
        }
    };

    useEffect(() => {
        fetchUsers();
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);

        try {
            const response = await fetch('https://bakend-bank.vercel.app/auth/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ email, password }),
                credentials: 'include'
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

    // Filtrando usuários com base no termo de pesquisa
    const filteredUsers = users.filter(user =>
        user.name.toLowerCase().includes(searchTerm.toLowerCase())
    );

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

                    {/* Campo de pesquisa de usuários */}
                    <div className="search-users">
                        <h2>Pesquisar Usuários</h2>
                        <input
                            type="text"
                            placeholder="Pesquisar por nome..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                        />
                        <ul className="user-list">
                            {filteredUsers.map((user) => (
                                <li key={user.id}>{user.name}</li>
                            ))}
                        </ul>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Login;
