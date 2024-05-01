import React, {useState} from 'react';
import { XCircle } from 'react-feather'; 
import Modal from 'react-modal';

const DeleteUser = (user) => {

    const [modal, setModal] = useState(false)

    const openDelete = () => {
        setModal(true);
    };

    const closeModal = () => {
        setModal(false);
    };

    const deleteFetch = async () => {

        try {
            const token = localStorage.getItem('token')
            const response = await fetch(`https://evaluacion.sierpes48.es/usuarios/eliminar/${user.user.id}`, {
            method: 'DELETE',
            headers: {
                'Accept': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            });
            if (response.ok) {
            console.log('Usuario eliminado exitosamente');
            } else {
            console.error('Error al eliminar el usuario');
            }
        } catch (error) {
            console.error('Error en la solicitud DELETE:', error);
        }
    
        closeModal();
    };


  return (
    <>
    <button style={modalButtonStyle} onClick={() => { openDelete() }}>
        <i className="fas fa-trash-alt" style={{...modalIconStyle, color:'red'}}></i>
        <span style={{ marginLeft: '0.5rem', color:'black' }}>Eliminar</span>
    </button>

    <Modal appElement={document.getElementById('root')} isOpen={modal} style={{ overlay: modalStyle, content: modalContentStyle }}>
      <div>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '12px' }}>
          <h2 style={titleStyle}>¿Estás seguro de esto?</h2>
          <span style={{ backgroundColor: '#DC2626', color: 'white', padding: '6px', borderRadius: '50%', display: 'inline-flex', alignItems: 'center', justifyContent: 'center' }}>
            <XCircle size={24} />
          </span>
        </div>
        <p style={textStyle}>Estás a punto de eliminar un usuario.</p>
        <div style={buttonContainerStyle}>
          <button style={cancelButtonStyle} onClick={closeModal}>
            Cancelar
          </button>
          <button style={confirmButtonStyle} onClick={deleteFetch}>
            Confirmar
          </button>
        </div>
      </div>
    </Modal>
    </>
  );
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
    maxWidth: '30rem',
    width: '100%',
    margin: '1rem'
};

  const titleStyle = {
    fontSize: '1.25rem',
    fontWeight: '600',
  };

  const textStyle = {
    fontSize: '0.875rem',
    color: '#4b5563', // Grayish text color
    marginBottom: '1rem',
  };

  const buttonContainerStyle = {
    display: 'flex',
    justifyContent: 'flex-end',
    gap: '1rem',
  };

  const buttonStyle = {
    padding: '0.5rem 1rem',
    borderRadius: '0.375rem',
    fontWeight: 'bold',
    cursor: 'pointer',
  };

  const cancelButtonStyle = {
    ...buttonStyle,
    backgroundColor: '#e5e7eb', // Gray background color
    color: '#4b5563', // Gray text color
  };

  const confirmButtonStyle = {
    ...buttonStyle,
    backgroundColor: '#ef4444', // Red background color
    color: '#ffffff', // White text color
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
  }

export default DeleteUser;
