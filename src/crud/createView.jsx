import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const CreateView = () => {
    
    const navigate = useNavigate(); // Crear la instancia de useNavigate

    const [formData, setFormData] = useState({
      fullName: '',
      email: '',
      message: '',
      favoriteColor: ''
    });
  
    const [formErrors, setFormErrors] = useState({
      fullNameError: '',
      emailError: '',
      favoriteColorError: ''
    });
  
    const [isSubmitted, setIsSubmitted] = useState(false);
  
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  
    const handleChange = (e) => {
      const { name, value } = e.target;
      setFormData({ ...formData, [name]: value });
  
      // Limpiar el mensaje de error correspondiente cuando el usuario cambia un campo
      setFormErrors({ ...formErrors, [`${name}Error`]: '' });
    };
  
    const handleSubmit = async (e) => {
      e.preventDefault();
      setIsSubmitted(true);
  
      let isValid = true;
      const errors = {
        fullNameError: '',
        emailError: '',
        favoriteColorError: ''
      };
  
      if (formData.fullName.trim() === '') {
        errors.fullNameError = 'El nombre completo es requerido';
        isValid = false;
      }
  
      if (formData.email.trim() === '') {
        errors.emailError = 'El correo electrónico es requerido';
        isValid = false;
      } else if (!emailRegex.test(formData.email.trim())) {
        errors.emailError = 'El correo electrónico no es válido';
        isValid = false;
      }
  
      if (formData.favoriteColor.trim() === '') {
        errors.favoriteColorError = 'Selecciona un color favorito';
        isValid = false;
      }
  
      setFormErrors(errors);
  
      if (isValid) {
        
        /*try {
          const response = await fetch('url_de_tu_api', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify(formData)
          });
  
          if (response.ok) {
            const data = await response.json();
            console.log('Respuesta del servidor:', data);
            history.push('/'); // Redirige a la vista ShowView después del éxito
            // Aquí puedes mostrar un mensaje de éxito al usuario si es necesario
          } else {
            console.error('Error al enviar los datos');
            // Aquí puedes manejar errores de envío como desees (por ejemplo, mostrar un mensaje de error)
          }
        } catch (error) {
          console.error('Error al enviar la solicitud:', error);
        }
      }*/
      
       // Llamar a la función onSubmit con los datos del formulario si es válido

       // Limpiar el formulario después de enviar
       setFormData({
         fullName: '',
         email: '',
         favoriteColor: ''
       });

      navigate('/');
    };
};

  return (
    <div style={styles.container}>
    <form onSubmit={handleSubmit} style={styles.form}>
      <div style={styles.inputContainer}>
        <label>
          <span style={styles.text}>Nombre Completo:</span>
          <input
            type="text"
            name="fullName"
            placeholder='Juan Balderrama'
            value={formData.fullName}
            onChange={handleChange}
            style={styles.input}
          />
          <br/>
          {isSubmitted && formErrors.fullNameError ? (
          <span style={styles.error}>{formErrors.fullNameError}</span>
          ) : (null)
          }        
            </label>
      </div>
      <div style={styles.inputContainer}>
        <label>
          <span style={styles.text}>Correo Electrónico:</span>
          <input
            type="text"
            name="email"
            placeholder='test@example.com'
            value={formData.email}
            onChange={handleChange}
            style={styles.input}
          />
          <br/>
          {isSubmitted && formErrors.emailError ? (
          <span style={styles.error}>{formErrors.emailError}</span>
          ) : (null)
          }        
        </label>
      </div>
      <div style={styles.inputContainer}>
        <label>
          <span style={styles.text}>Color Favorito:</span>
          <select
            name="favoriteColor"
            value={formData.favoriteColor}
            onChange={handleChange}
            style={styles.input}
          >
            <option value="">Selecciona un color</option>
            <option value="red">Rojo</option>
            <option value="blue">Azul</option>
            <option value="green">Verde</option>
            <option value="yellow">Amarillo</option>
          </select>
          <br/>
          {isSubmitted && formErrors.favoriteColorError ? (
          <span style={styles.error}>{formErrors.favoriteColorError}</span>
          ) : (null)
          }
        </label>
      </div>
      <div>
        <button type="submit" style={styles.button}>Enviar</button>
      </div>
    </form>
    </div>
  );
};

const styles = {
container: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    minHeight: '100vh',
    },
  form: {
    maxWidth: '400px',
    padding: '20px',
    border: '1px solid #ccc',
    textAlign: 'center',
    borderRadius: '5px',
    backgroundColor: '#f9f9f9',
  },
  inputContainer: {
    marginBottom: '20px',
  },
  text: {
    color: 'black',
    fontSize: '20px'
  },
  input: {
    width: '90%',
    padding: '10px',
    fontSize: '16px',
    border: '1px solid #ccc',
    borderRadius: '4px',
  },
  error: {
    color: 'red',
    fontSize: '14px',
    marginTop: '5px',
  },
  button: {
    backgroundColor: 'blue',
    color: 'white',
    padding: '12px 20px',
    fontSize: '16px',
    borderRadius: '4px',
    cursor: 'pointer',
  },
};

export default CreateView;
