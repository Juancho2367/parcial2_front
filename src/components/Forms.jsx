import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom'; // Cambia useHistory por useNavigate
import './styles/Forms.css';

function Forms({ callback }) {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');
    const navigate = useNavigate(); // Inicializa useNavigate

    const handleLogin = async () => {
        setError('');
        setSuccess('');

        const loginData = {
            email: username, // Asegúrate de que el "username" se use como correo
            password,
        };

        try {
            const response = await fetch('https://back-margarita.vercel.app/v1/margarita/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(loginData),
            });

            const result = await response.json();

            if (response.ok) {
                setSuccess(result.status);
                callback(result.userId, result.role); // Asegúrate de que el backend devuelva el userId y el role
                console.log('Login exitoso:', { username, password });
                navigate('/reclamar-codigo'); // Navega a la ruta deseada después del login
            } else {
                setError(result.message); // Cambiado para usar message del resultado
            }
        } catch (error) {
            console.error('Error al realizar la solicitud:', error);
            setError('Error al intentar iniciar sesión. Intente de nuevo más tarde.');
        }
    };

    return (
        <div className="login-container">
            <h2 className="login-title">Iniciar Sesión</h2>
            <p className="login-subtitle">Bienvenido, por favor ingresa tus datos</p>
            <form onSubmit={handleLogin}>
                <div className="form-group">
                    <label htmlFor="username">Nombre de Usuario</label>
                    <input
                        type="text"
                        id="username"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        placeholder="Usuario"
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="password">Contraseña</label>
                    <input
                        type="password"
                        id="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        placeholder="Contraseña"
                    />
                </div>
                <button type="submit" className="login-button">Iniciar Sesión</button>
                <button type="button" className="register-button">Registrarse</button>
            </form>
            {errorMessage && <div className="error-message">{errorMessage}</div>}
            {successMessage && <div className="success-message">{successMessage}</div>}
        </div>
    );
}

export default Forms;
