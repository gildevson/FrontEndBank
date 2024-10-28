import React, { useState, useEffect } from 'react';
import './CreateUser.css';
import { FaTimes } from 'react-icons/fa';
import { createUser, fetchUsers, deleteUser } from '../../services/userService';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function CreateUserComponent() {
    const [user, setUser] = useState({
        nome: '',
        email: '',
        password: '',
        confirmPassword: '',
        permission_id: '2',
    });

    const [users, setUsers] = useState([]);
    const [errorMessage, setErrorMessage] = useState('');
    const [loading, setLoading] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [isFormVisible, setIsFormVisible] = useState(false);

    useEffect(() => {
        async function loadUsers() {
            setLoading(true);
            try {
                const usersData = await fetchUsers();
                setUsers(usersData);
            } catch (err) {
                setErrorMessage('Erro ao buscar usuários: ' + err.message);
            } finally {
                setLoading(false);
            }
        }
        loadUsers();
    }, []);

    const handleChange = (e) => {
        const value = e.target.name === 'permission_id' ? parseInt(e.target.value) : e.target.value;
        setUser({ ...user, [e.target.name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (user.password !== user.confirmPassword) {
            toast.error('As senhas não coincidem.');
            return;
        }

        setIsSubmitting(true);
        try {
            await createUser(user);
            setUser({ nome: '', email: '', password: '', confirmPassword: '', permission_id: '2' });
            toast.success('Usuário criado com sucesso!');
            const usersData = await fetchUsers();
            setUsers(usersData);
            setIsFormVisible(false); // Fecha o formulário após criação
        } catch (error) {
            const errMsg = error.message || 'Erro ao criar usuário.';
            setErrorMessage(errMsg);
            toast.error(errMsg);
        } finally {
            setIsSubmitting(false);
        }
    };

    const handleDeleteUser = async (userId) => {
        try {
            await deleteUser(userId);
            toast.success('Usuário excluído com sucesso!');
            const updatedUsers = users.filter(user => user.id !== userId);
            setUsers(updatedUsers);
        } catch (error) {
            toast.error('Erro ao excluir usuário.');
        }
    };

    return (
        <div className="formContainer">
            {isSubmitting && (
                <div className="loading-overlay">
                    <div className="spinner"></div>
                </div>
            )}
    
            {isFormVisible && (
                <div className="fullscreen-form">
                    <form onSubmit={handleSubmit} className="user-form">
                        <h2>Criar Usuário</h2>
                        <FaTimes className="close-form-icon" onClick={() => setIsFormVisible(false)} />
                        <div className="inputField">
                            <label>Nome:</label>
                            <input type="text" name="nome" value={user.nome} onChange={handleChange} required />
                        </div>
                        <div className="inputField">
                            <label>Email:</label>
                            <input type="email" name="email" value={user.email} onChange={handleChange} required />
                        </div>
                        <div className="inputField">
                            <label>Senha:</label>
                            <input type="password" name="password" value={user.password} onChange={handleChange} required />
                        </div>
                        <div className="inputField">
                            <label>Confirmar Senha:</label>
                            <input type="password" name="confirmPassword" value={user.confirmPassword} onChange={handleChange} required />
                        </div>
                        <div className="inputField">
                            <label>Permissão:</label>
                            <select name="permission_id" value={user.permission_id} onChange={handleChange} required>
                                <option value={1}>Total</option>
                                <option value={2}>Limitada</option>
                            </select>
                        </div>
                        <button type="submit" className="submitButton" disabled={isSubmitting}>
                            {isSubmitting ? 'Enviando...' : 'Criar Usuário'}
                        </button>
                    </form>
                </div>
            )}
    
            <ToastContainer />
            {errorMessage && <div style={{ color: 'red' }}>{errorMessage}</div>}
    
            <div className="header-container">
                <h2 className="TituloUsuario">Usuários</h2>
                <button className="openFormButton" onClick={() => setIsFormVisible(!isFormVisible)}>
                    {isFormVisible ? 'Fechar Formulário' : 'Criar Usuário'}
                </button>
            </div>
    
            <div className="user-table-container">
                {loading ? (
                    <div className="loading-screen">
                        <div className="spinner"></div>
                    </div>
                ) : (
                    <table className="user-table">
                        <thead>
                            <tr>
                                <th>Nome</th>
                                <th>Email</th>
                                <th>Permissão</th>
                                <th>Ações</th>
                            </tr>
                        </thead>
                        <tbody>
                            {users.map(user => (
                                <tr key={user.id}>
                                    <td data-label="Nome">{user.nome}</td>
                                    <td data-label="Email">{user.email}</td>
                                    <td data-label="Permissão">{parseInt(user.permission_id) === 1 ? 'Permissão total' : 'Permissão limitada'}</td>
                                    <td data-label="Ações">
                                        <button
                                            className="deleteButton"
                                            onClick={() => handleDeleteUser(user.id)}
                                        >
                                            Excluir
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                )}
            </div>
        </div>
    );
}

export default CreateUserComponent;
