import React, { useState } from 'react';
import {useNavigate} from 'react-router-dom';
import '@fortawesome/fontawesome-free/css/all.min.css';

const Login = () => {

  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Simulación de verificación de usuario y contraseña
    const email = e.target.email.value;
    const password = e.target.password.value;

    const formData = new FormData();
    formData.append('email', email);
    formData.append('password', password);

    console.log(formData);


    if (email === 'soporte@dssnetwork.es' && password === '1234abc') {

      try {
        const response = await fetch('https://evaluacion.sierpes48.es/login', {
          method: 'POST',
          headers: {
            'Accept': 'application/json',
            'Cache-Control': 'no-cache'
          },
          body: formData
        });

        if (response.ok) {
          const data = await response.json();
          console.log('Respuesta del servidor:', data.data.token);
          localStorage.setItem('token', data.data.token);
          console.log(localStorage.getItem('token'))
          navigate('/mostrar')
        } else {
          console.error('Error al enviar los datos');
        }
      } catch (error) {
        console.error('Error al enviar la solicitud:', error);
      }

    } else {
      setError('El usuario o la contraseña no son correctos');
    }
  };

  return (
    <div style={container}>
      <div style={subContainer}>
        <h2 style={{ fontSize: '30px', fontWeight: 'bold', textAlign: 'center', color: '#3B82F6', marginBottom: '24px' }}>Take[AI]Net</h2>
        <form onSubmit={handleSubmit}>
          {error && (
            <div style={errorContainer}>
              <i className="fas fa-exclamation-circle" style={{ color: '#EF4444', marginRight: '8px' }}></i>
              {error}
            </div>
          )}
          <div style={{ marginBottom: '16px' }}>
            <input
              type="text"
              id="email"
              name="email"
              style={inputStyles}
              placeholder="Nombre de usuario"
            />
          </div>
          <div style={{ position: 'relative', marginBottom: '16px'}}>
            <input
              type={showPassword ? 'text' : 'password'}
              id="password"
              name="password"
              placeholder="Contraseña"
              style={inputStyles}
            />
            <span
              style={eye}
              onClick={togglePasswordVisibility}
            >
              {showPassword ? (
                <i className="fas fa-eye-slash"></i>
              ) : (
                <i className="fas fa-eye"></i>
              )}
            </span>
          </div>
          <button type="submit" style={submit}>Acceder a mi cuenta</button>
        </form>
        <div style={{ marginTop: '16px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div style={{ display: 'flex', alignItems: 'center' }}>
            <input id="remember_me" name="remember_me" type="checkbox" style={checkboxStyles} />
            <label htmlFor="remember_me" style={{ marginLeft: '8px', fontSize: '14px', color: '#1F2937' }}>Recordarme</label>
          </div>
          <a href="http://localhost:3000" style={{ fontSize: '14px', color: '#3B82F6', textDecoration: 'none', transition: 'color 0.15s ease-in-out' }}>¿Has olvidado tu contraseña?</a>
        </div>
      </div>
    </div>
  );
};

const container = {
  minHeight: '100vh',
  backgroundColor: '#F3F4F6',
  display: 'flex',
  
  justifyContent: 'center',
  alignItems: 'center'
};

const subContainer = {
  backgroundColor: '#FFFFFF',
  padding: '32px',
  borderRadius: '8px',
  paddingTop: '100px',
  height: '400px',
  boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
  width: '320px'
};

const submit = {
  width: '100%',
  backgroundColor: '#3B82F6',
  color: '#FFFFFF',
  padding: '12px',
  borderRadius: '6px',
  fontSize: '14px',
  transition: 'background-color 0.15s ease-in-out'
};

const inputStyles = {
  width: '92%',
  padding: '12px',
  border: '1px solid #D1D5DB',
  borderRadius: '6px',
  boxShadow: '0 1px 2px rgba(0, 0, 0, 0.05)',
  outline: 'none',
  transition: 'border-color 0.15s ease-in-out, box-shadow 0.15s ease-in-out',
  fontSize: '14px',
};

const eye = {
  position: 'absolute',
  top: '50%',
  right: '10px',
  transform: 'translateY(-50%)',
  cursor: 'pointer',
  fontSize: '18px',
  color: '#666',
};

const checkboxStyles = {
  height: '16px',
  width: '16px',
  color: '#3B82F6',
  focusRing: '0 0 0 3px rgba(66, 153, 225, 0.5)',
  border: '1px solid #D1D5DB',
  borderRadius: '4px',
};

const errorContainer = {
  marginBottom: '16px',
  padding: '10px',
  backgroundColor: '#FEE2E2',
  border: '1px solid red',
  color: 'red',
  borderRadius: '6px',
  display: 'flex',
  alignItems: 'center',
  fontSize: '12px',
};

export default Login;
