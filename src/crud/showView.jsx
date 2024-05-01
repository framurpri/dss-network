import React from 'react';
import { Link } from 'react-router-dom';

const ShowView = ({ formDataList, onDelete }) => {

  return (
    <div style={styles.container}>
      {formDataList.map((formData, index) => (
        <div key={index} style={styles.card}>
          <h2>Información</h2>
          <p>
            <strong>Nombre Completo:</strong> 
            <br/>
            <span style={styles.text}>{formData.fullName}</span>
          </p>
          <p>
            <strong>Correo Electrónico:</strong> 
            <br/>
            <span style={styles.text}>{formData.email}</span>
          </p>
          <p>
            <strong>Mensaje:</strong> 
            <br/>
            <span style={styles.text}>{formData.message}</span>
          </p>
          <p>
            <strong>Color Favorito:</strong> 
            <br/>
            <span style={styles.text}>{formData.favoriteColor}</span>
          </p>
          <div style={styles.buttonContainer}>
            <Link to={`/editar/${index}`}>
                <button style={styles.button}>Editar</button>
            </Link>
            <button onClick={() => onDelete(index)} style={styles.button}>Borrar</button>
          </div>
        </div>
      ))}
    </div>
  );
};

const styles = {
  container: {
    display: 'flex',
    flexDirection: 'row',
    flexWrap: 'wrap',
    color: 'black',
    textAlign: 'center',
    justifyContent: 'center',
  },
  text:{
    fontSize: '20px'
  },
  card: {
    width: '300px',
    padding: '20px',
    margin: '20px',
    border: '1px solid #ccc',
    borderRadius: '8px',
    backgroundColor: '#f9f9f9',
    boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
  },
  buttonContainer: {
    display: 'flex',
    justifyContent: 'space-between',
    marginTop: '20px',
  },
  button: {
    padding: '10px 20px',
    fontSize: '14px',
    borderRadius: '4px',
    backgroundColor: '#007bff',
    color: '#fff',
    border: 'none',
    cursor: 'pointer',
  },
};

export default ShowView;
