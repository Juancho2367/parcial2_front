import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './styles/Forms.css';

function Forms({ callback }) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const navigate = useNavigate();

  const handleLogin = async () => {
    setError('');
    setSuccess('');

    const loginData = {
      email: username,
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
        callback(result.userId, result.role);
        console.log('Login exitoso:', { username, password });
        navigate('/reclamar-codigo');
      } else {
        setError(result.message);
      }
    } catch (error) {
      console.error('Error al realizar la solicitud:', error);
      setError('Error al intentar iniciar sesión. Intente de nuevo más tarde.');
    }
  };

  return (
    <div className="login-container">
      <div className="login-form">
        <h2 className="login-title">Material Login Form</h2>
        <div className="login-content">
          <p className="login-here">Login Here</p>
          {error && <div className="error-message">{error}</div>}
          {success && <div className="success-message">{success}</div>}
          <div className="form-group">
            <label htmlFor="username">
              <span className="icon">👤</span> USERNAME:
            </label>
            <input
              type="text" id="username" 
              value={username} 
              onChange={(e) => setUsername(e.target.value)} 
              placeholder="Enter your username" 
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="password">
              <span className="icon">🔒</span> PASSWORD:
            </label>
            <input
              type="password" 
              id="password" 
              value={password} 
              onChange={(e) => setPassword(e.target.value)} 
              placeholder="Enter your password" 
              required
            />
          </div>
          <button className="login-button" onClick={handleLogin}>LOGIN</button>
          <Link to="/registro" className="register-button">REGISTER</Link>
        </div>
      </div>
    </div>
  );
}

export default Forms;