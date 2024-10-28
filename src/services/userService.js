// services/userService.js

// Função para criar usuário
export async function createUser(user) {
    try {
        const response = await fetch('http://localhost:3000/api/users', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(user),
        });

        if (!response.ok) {
            const errorData = await response.json(); // Pega os detalhes do erro do servidor

            // Tratamento de erros específicos, como usuário já existente (409)
            if (response.status === 409) {
                throw new Error('Usuário já existe.');
            }

            // Tratamento de outros erros, exibindo a mensagem do servidor, se existir
            throw new Error('Falha ao criar usuário: ' + (errorData.message || response.statusText));
        }

        return await response.json(); // Retorna os dados do usuário criado
    } catch (error) {
        console.error('Erro ao criar usuário:', error);
        throw error; // Propaga o erro para ser tratado por quem chamou essa função
    }
}

// Função para buscar usuários
export async function fetchUsers() {
    try {
        const response = await fetch('http://localhost:3000/api/users', {
            method: 'GET',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
        });

        if (!response.ok) {
            throw new Error('Falha ao buscar usuários');
        }

        return await response.json(); // Retorna a lista de usuários
    } catch (error) {
        console.error('Erro ao buscar usuários:', error);
        throw error; // Propaga o erro para ser tratado por quem chamou essa função
    }
}

// Função para deletar um usuário (para o botão de excluir)
export async function deleteUser(userId) {
    try {
        const response = await fetch(`http://localhost:3000/api/users/${userId}`, {
            method: 'DELETE',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
        });

        if (!response.ok) {
            throw new Error('Falha ao excluir usuário');
        }

        return await response.json(); // Presumivelmente retorna uma confirmação de exclusão
    } catch (error) {
        console.error('Erro ao excluir usuário:', error);
        throw error;
    }
}
