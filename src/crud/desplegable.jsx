import React, { useState, forwardRef } from 'react';
import Modal from 'react-modal';
import '@fortawesome/fontawesome-free/css/all.min.css';
import EditUser from './editUser';
import DeleteUser from './deleteUser';

const DropdownMenu = forwardRef(({user}, ref) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  return (
    <>
       <button style={buttonStyle} onClick={openModal}>
            <span style={{ marginRight: '1rem' }}>Acciones</span>
            <svg
            style={iconStyle}
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 20 20"
            >
            <path
                d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
            />
            </svg>
        </button>    
      <Modal
        isOpen={isModalOpen}
        onRequestClose={closeModal}
        appElement={document.getElementById('root')}
        style={{
          content: {
            top: ref.current ? ref.current.offsetTop + ref.current.offsetHeight+87 : '50%',
            left: ref.current ? ref.current.offsetLeft+694 : '50%',
            transform: 'translate(-50%, 0)',
            maxWidth: '100px', // Ajusta el ancho máximo de la modal según tus necesidades
            borderRadius: '0.375rem',
            maxHeight: '70px',
          },
          overlay: {
            backgroundColor: 'rgba(0, 0, 0, 0)', // Ajusta la opacidad del fondo superpuesto
          },
        }}
      >
        <EditUser user={user}/>
        <DeleteUser user={user}/>
      </Modal>
    </>
  );
});



const buttonStyle = {
  alignItems: 'center',
  backgroundColor: '#2563EB',
  color: '#FFFFFF',
  width: '143px',
  fontWeight: '600',
  padding: '0.5rem 1rem',
  borderRadius: '0.375rem',
  cursor: 'pointer',
};

const iconStyle = {
  width: '1rem',
  height: '1rem',
  fill: 'currentColor',
  marginLeft: '0.5rem',
};

export default DropdownMenu;
