export const login = async (email, password) => {
    try {
        const response = await fetch('http://localhost:3000/auth/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ email, password }),
        });

        if (!response.ok) {
            // Exibe erro se houver problema com a requisição (por exemplo, credenciais inválidas)
            const errorData = await response.json();
            throw new Error(errorData.message || 'Erro ao fazer login.');
        }

        // Retorna o token e os dados do usuário
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Erro ao fazer login:', error);
        throw error; // Propaga o erro para ser tratado no frontend
    }
};
