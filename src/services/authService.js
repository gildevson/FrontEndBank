export const login = async (email, password) => {
    try {
        const response = await fetch('https://backend-bank.vercel.app/auth/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ email, password }),
            credentials: 'include' // Adicione se precisar de cookies ou autenticação de sessão
        });

        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.message || 'Erro ao fazer login.');
        }

        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Erro ao fazer login:', error);
        throw error;
    }
};
