import React, { useEffect, useState } from 'react';
import '@fortawesome/fontawesome-free/css/all.min.css';
import Modal from 'react-modal';
import UploadImage from './uploadImage';

const EditUser = (user) => {

    const [modal, setModal] = useState(false)
    const [isActive, setIsActive] = useState(user.user.active === true);
    const [formData, setFormData] = useState({
        id: '',
        username: '',
        first_name: '',
        last_name: '',
        password: '',
        email: '',
        ConfContraseña: '',
        phone: '',
        active: ''
    });
    const [formErrors, setFormErrors] = useState({});
    const [formSubmitted, setFormSubmitted] = useState(false);

    useEffect (() => {
        setFormData(prevFormData => ({
            ...prevFormData,
            id: user.user.id || prevFormData.id,
            username: user.user.username || prevFormData.username,
            first_name: user.user.first_name || prevFormData.first_name,
            last_name: user.user.last_name || prevFormData.last_name,
            email: user.user.email || prevFormData.email,
            phone: user.user.phone || prevFormData.phone,
            active: user.user.active || prevFormData.active
          }));
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [modal])

    const openEdit = () => {
        setModal(true);
    };

    const closeModal = () => {
        setFormErrors({});
        setFormSubmitted(false);
        setFormData({
            id: '',
            username: '',
            first_name: '',
            last_name: '',
            password: '',
            email: '',
            ConfContraseña: '',
            phone: '',
            active: ''
        })
        setIsActive(user.user.active === true)
        setModal(false);
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
        setFormErrors({ ...formErrors, [`${name}Error`]: '' });
    };

    const handleCheckboxChange = (value, name) => {
        setIsActive(value === 1);
        setFormData({ ...formData, [name]: value });
    };

    const validateForm = () => {
        const newErrors = {};

        if (!formData.first_name.trim()) {
            newErrors.first_nameError = 'El nombre de usuario es obligatorio';
        }

        /*if (!formData.last_name.trim()) {
            newErrors.last_nameError = 'Los apellidos son requeridos';
        }*/

        if (!formData.password.trim()) {
            newErrors.passwordError = 'La contraseña es obligatoria';
        }

        if (!formData.email.trim()) {
            newErrors.emailError = 'El correo electrónico es obligatorio';
        } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
            newErrors.emailError = 'El correo electrónico no es válido';
        }

        if (formData.password !== formData.ConfContraseña) {
            newErrors.ConfContraseñaError = 'Las contraseñas no coinciden';
        }

        /*if (!formData.phone.trim()) {
            newErrors.phoneError = 'El teléfono es requerido';
        }*/

        setFormErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSave = async () => {
        setFormSubmitted(true);
        const isValid = validateForm();

        const formData1 = new FormData();
        formData1.append('first_name', formData.first_name);
        formData1.append('last_name', formData.last_name);
        formData1.append('email', formData.email);
        formData1.append('phone', formData.phone);
        formData1.append('active', formData.active);
        formData1.append('_method', 'PATCH');

        if (isValid) {
            try {
                const token = localStorage.getItem('token')
                const response = await fetch(`https://evaluacion.sierpes48.es/usuarios/editar/${user.user.username}`, {
                  method: 'POST',
                  headers: {
                    'Accept': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                  body: formData1
                });
        
                if (response.ok) {
                  const data = await response.json();
                  console.log('Respuesta del servidor:', data);
                } else {
                  console.error('Error al enviar los datos');
                  console.log(formData1)
                }
              } catch (error) {
                console.error('Error al enviar la solicitud:', error);
              }
            closeModal();
        }
    };

    return (
        <>
        <button style={modalButtonStyle} onClick={() => { openEdit() }}>
          <i className="fas fa-edit" style={{...modalIconStyle, color: 'yellow'}}></i>
          <span style={{ marginLeft: '0.5rem', color:'black'}}>Editar</span>
        </button>

        <Modal appElement={document.getElementById('root')} isOpen={modal} style={{ overlay: modalStyle, content: modalContentStyle }}>
        <div>
            <div style={headerStyle}>
                <button style={{backgroundColor: 'transparent', border: 'none', cursor: 'pointer'}} onClick={closeModal}>
                    <i className="fas fa-arrow-left" style={{ marginRight: '10px' }}></i>
                    Atrás
                </button>
                <h2 style={{ fontSize: '1.5rem', fontWeight: '600' }}>Editar usuario</h2>
            </div>
            <p style={textStyle}>Edita los siguientes datos del usuario.</p>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '1.5rem' }}>
                <div style={{ display: 'flex', flexDirection: 'column' }}>
                    <input
                        type="text"
                        id="first_name"
                        name="first_name"
                        value={formData.first_name ? formData.first_name : ''}
                        onChange={handleChange}
                        placeholder="Nombre de usuario"
                        style={inputStyle}
                    />
                    {formSubmitted && formErrors.first_nameError !== '' && <div style={errorStyle}>{formErrors.first_nameError}</div>}
                </div>
                <div style={{ display: 'flex', flexDirection: 'column' }}>
                    <input
                        type="text"
                        id="last_name"
                        name="last_name"
                        value={formData.last_name ? formData.last_name : ''}
                        onChange={handleChange}
                        placeholder="Apellidos (Opcional)"
                        style={inputStyle}
                    />
                    {formSubmitted && formErrors.last_nameError !== '' && <div style={errorStyle}>{formErrors.last_nameError}</div>}
                </div>
                <div style={{ display: 'flex', flexDirection: 'column' }}>
                    <input
                        type="password"
                        id="password"
                        name="password"
                        value={formData.password ? formData.password : ''}
                        onChange={handleChange}
                        placeholder="************"
                        style={inputStyle}
                    />
                    {formSubmitted && formErrors.passwordError !== '' && <div style={errorStyle}>{formErrors.passwordError}</div>}
                </div>
                <div style={{ display: 'flex', flexDirection: 'column' }}>
                    <input
                        type="text"
                        id="email"
                        name="email"
                        value={formData.email ? formData.email : ''}
                        onChange={handleChange}
                        placeholder="E-mail"
                        style={inputStyle}
                    />
                    {formSubmitted && formErrors.emailError !=='' && <div style={errorStyle}>{formErrors.emailError}</div>}
                </div>
                <div style={{ display: 'flex', flexDirection: 'column' }}>
                    <input
                        type="password"
                        id="ConfContraseña"
                        name="ConfContraseña"
                        value={formData.ConfContraseña ? formData.ConfContraseña : ''}
                        onChange={handleChange}
                        placeholder="Confirmar Contraseña"
                        style={inputStyle}
                    />
                    {formSubmitted && formErrors.ConfContraseñaError !== '' && <div style={errorStyle}>{formErrors.ConfContraseñaError}</div>}
                </div>
                <div style={{ display: 'flex', flexDirection: 'column' }}>
                    <input
                        type="text"
                        id="phone"
                        name="phone"
                        value={formData.phone ? formData.phone : ''}
                        onChange={handleChange}
                        placeholder="Teléfono (Opcional)"
                        style={inputStyle}
                    />
                    {formSubmitted && formErrors.phoneError !== '' && <div style={errorStyle}>{formErrors.phoneError}</div>}
                </div>
            </div>
            <div style={{ display: 'flex', marginTop: '1rem', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                <div style={{ display: 'flex', marginTop: '1rem', textAlign:'center', justifyContent: 'left' }}>
                    <UploadImage user={user}/>
                </div>
                <div style={{ width: '500px', alignContent: 'flex-start' }}>
                    <label htmlFor="active-yes" style={{ fontWeight: 'bold', color: '#374151' }}>¿Está activo?</label>
                    <div>
                        <label htmlFor="active-yes">
                            <input
                                type="checkbox"
                                id="active-yes"
                                name="active"
                                value='Activo'
                                checked={isActive}
                                onChange={() => handleCheckboxChange(1, 'active')}
                            />
                            Sí
                        </label>
                        <label htmlFor="active-no">
                            <input
                                type="checkbox"
                                id="active-no"
                                name="active"
                                value='Inactivo'
                                checked={!isActive}
                                onChange={() => handleCheckboxChange(0, 'active')}
                            />
                            No
                        </label>
                    </div>
                </div>
            </div>
            <div style={{ marginTop: '1.5rem', display: 'flex', justifyContent: 'end', gap: '0.75rem' }}>
                <button onClick={closeModal} style={{ ...buttonStyle, borderColor: '#fc2f21', color: '#fc2f21' }} >Cancelar</button>
                <button onClick={handleSave} style={{ ...buttonStyle, backgroundColor: '#3b82f6', color: 'white' }}>Guardar</button>
            </div>
        </div>
    </Modal>
    </>
);
}

const errorStyle = {
    color: 'red',
    fontSize: '0.875rem',
    marginTop: '0.25rem'
};

const modalStyle = {
    position: 'fixed',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(75, 85, 99, 0.75)',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center'
};

const modalContentStyle = {
    backgroundColor: 'white',
    padding: '2rem',
    position: 'relative',
    borderRadius: '0.5rem',
    maxWidth: '64rem',
    width: '100%',
    margin: '1rem'
};

const headerStyle = {
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: '1.5rem'
};

const textStyle = {
    marginBottom: '1rem',
    color: '#4b5563' // text-zinc-600
};

const inputStyle = {
    width: '80%',
    padding: '12px',
    border: '1px solid #D1D5DB',
    borderRadius: '6px',
    boxShadow: '0 1px 2px rgba(0, 0, 0, 0.05)',
    outline: 'none',
    transition: 'border-color 0.15s ease-in-out, box-shadow 0.15s ease-in-out',
    fontSize: '14px',
    backgroundColor: '#edf5f9 ',
  };

const buttonStyle = {
    backgroundColor: 'white',
    fontWeight: 'bold',
    padding: '0.5rem 1rem',
    borderRadius: '0.375rem',
    width: '110px',
    cursor: 'pointer',
};

const modalButtonStyle = {
    alignItems: 'center',
    backgroundColor: 'transparent',
    color: '#2563EB',
    padding: '0.5rem',
    borderRadius: '0.375rem',
    cursor: 'pointer',
    border: 'none',
    outline: 'none',
  };
  
  const modalIconStyle = {
    width: '1rem',
    height: '1rem',
    fill: 'currentColor',
    marginRight: '0.5rem',
  };

export default EditUser;
