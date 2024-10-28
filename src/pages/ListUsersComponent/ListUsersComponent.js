import React, { useState, useEffect } from 'react';
import { fetchUsers } from '../../services/userService';
import styles from './ListUsersComponent.css'; // Ensure this path is correct

function ListUsersComponent() {
    const [users, setUsers] = useState([]);
    const [error, setError] = useState('');

    useEffect(() => {
        const loadUsers = async () => {
            try {
                const usersData = await fetchUsers();
                setUsers(usersData);
            } catch (err) {
                setError('Erro ao buscar usuários: ' + err.message);
            }
        };
        loadUsers();
    }, []);

    return (
        <div className={styles.tableContainer}>
            <h2>Lista de Usuários</h2>
            {error && <p className={styles.error}>{error}</p>}
            <table className={styles.table}>
                <thead>
                    <tr>
                        <th className={styles.th}>ID</th>
                        <th className={styles.th}>Nome</th>
                        <th className={styles.th}>Email</th>
                        <th className={styles.th}>Permissão</th>
                    </tr>
                </thead>
                <tbody>
                    {users.map(user => (
                        <tr className={styles.tr} key={user.id}>
                            <td className={styles.td}>{user.id}</td>
                            <td className={styles.td}>{user.nome}</td>
                            <td className={styles.td}>{user.email}</td>
                            <td className={styles.td}>
                                {user.permission_id === '1' ? 'Total' : 'Limitada'}
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}

export default ListUsersComponent;
