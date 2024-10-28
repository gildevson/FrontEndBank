import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import HeaderLogin from './components/headerLogin/HeaderLogin';
import 'bootstrap/dist/css/bootstrap.min.css';
import Login from './components/auth/Login';
import Menu from './components/menu/Menu';
import Home from './pages/home/Home';
import BankLayouts from './pages/layouts/Layouts';
import CreateUser from './pages/createUser/CreateUser';
import './App.css'; // Supondo que a classe .loading-screen esteja aqui

function isAuthenticated() {
    const token = localStorage.getItem('token');
    return token !== null;
}

function PrivateRoute({ children }) {
    const [loading, setLoading] = useState(true);

    // Simula o carregamento com um timeout
    React.useEffect(() => {
        setTimeout(() => setLoading(false), 1000); // Ajuste o tempo de carregamento conforme necessário
    }, []);

    if (loading) {
        return (
            <div className="loading-screen">
                <div className="spinner"></div>
            </div>
        );
    }

    return isAuthenticated() ? children : <Navigate to="/" />;
}

function Layout({ children }) {
    return (
        <div style={{ display: 'flex' }}>
            <Menu />
            <div style={{ flex: 1, padding: '20px' }}>
                {children}
            </div>
        </div>
    );
}

function App() {
    return (
        <Router>
            {!isAuthenticated() && <HeaderLogin />}
            <Routes>
                <Route path="/" element={<Login />} />
                <Route 
                    path="/menu" 
                    element={
                        <PrivateRoute>
                            <Layout>
                                <Home />
                            </Layout>
                        </PrivateRoute>
                    } 
                />
                <Route 
                    path="/home" 
                    element={
                        <PrivateRoute>
                            <Layout>
                                <Home />
                            </Layout>
                        </PrivateRoute>
                    }
                />
                <Route 
                    path="/layouts" 
                    element={
                        <PrivateRoute>
                            <Layout>
                                <BankLayouts />
                            </Layout>
                        </PrivateRoute>
                    }
                />
                <Route 
                    path="/add-user" 
                    element={
                        <PrivateRoute>
                            <Layout>
                                <CreateUser />
                            </Layout>
                        </PrivateRoute>
                    }
                />
            </Routes>
        </Router>
    );
}

export default App;
