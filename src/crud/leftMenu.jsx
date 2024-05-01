import { useState } from "react";

const containerStyle = {
    backgroundColor: 'white',
    color: 'black',
    minHeight: '100vh',
  };
  
  const headerStyle = {
    textAlign: 'center',
    padding: '1rem',
    color: '#1E3A8A',
  };
  
  const profileContainerStyle = {
    padding: '1rem',
    textAlign: 'center',
  };
  
  const profileImageStyle = {
    width: '120px',
    height: '120px',
    borderRadius: '50%',
    margin: 'auto',
    marginBottom: '0.5rem',
  };
  
  const buttonStyle = {
    backgroundColor: 'white',
    color: '#1E3A8A',
    padding: '0.5rem 1rem',
    borderRadius: '10px',
    borderColor: '#1E3A8A',
    fontSize: '0.875rem',
  };
  
  const listItemStyle = {
    display: 'flex',
    alignItems: 'center',
    padding: '0.5rem 1rem',
    transition: 'background-color 0.3s ease',
    cursor: 'pointer', // Opcional: cambia el cursor a una mano para indicar que es un elemento interactivo.
  ':hover': {
    backgroundColor: '#1E3A8A', // Color de fondo cuando el ratón pasa por encima.
    color: 'white', // Cambia el color del texto al pasar el ratón.
  }
  };
  
  const listLinkStyle = {
    color: 'black',
    textDecoration: 'none',
  };
  
  const footerButtonStyle = {
    width: '100%',
    padding: '1rem 0',
    backgroundColor: '#1E3A8A',
    color: 'white',
    textAlign: 'center',
  };
  
  const LeftMenu = () => {
    const [activeIndex, setActiveIndex] = useState(null);  // Estado para índice activo

    const handleMouseEnter = index => setActiveIndex(index);  // Función para manejar mouse enter
    const handleMouseLeave = () => setActiveIndex(null);      // Función para resetear el índice al salir
  
    const listItemStyle = index => ({
      display: 'flex',
      alignItems: 'center',
      padding: '0.5rem 1rem',
      transition: 'background-color 0.3s ease',
      backgroundColor: activeIndex === index ? '#1E3A8A' : 'transparent',  // Cambia color si es ítem activo
      color: activeIndex === index ? 'white' : 'black',  // Cambia color de texto si es ítem activo
    });
  
    const listLinkStyle = {
      color: 'inherit',  // Hereda color del elemento padre
      textDecoration: 'none',
    };
  
    return (
      <div style={{ backgroundColor: 'white', color: 'black', minHeight: '100vh' }}>
        <div style={{ textAlign: 'center', padding: '1rem', color: '#1E3A8A' }}>
          <h1>Take[A]Net</h1>
        </div>
        <div style={{ padding: '1rem', textAlign: 'center' }}>
          <img src="https://placehold.co/120x120" alt="Profile Picture" style={{ width: '120px', height: '120px', borderRadius: '50%', margin: 'auto', marginBottom: '0.5rem' }} />
          <h2>Nombre Apellidos</h2>
          <p className="text-sm mb-4">Cargo</p>
          <button style={{ backgroundColor: 'white', color: '#1E3A8A', padding: '0.5rem 1rem', borderRadius: '10px', borderColor: '#1E3A8A', fontSize: '0.875rem' }}>Editar perfil</button>
        </div>
        <div style={{ marginTop: '1rem' }}>
          <ul className="space-y-2">
            {['Clientes', 'Proyectos', 'Rutas', 'Colaboradores', 'Permisos', 'Usuarios', 'Nuevo'].map((item, index) => (
              <li key={index} style={listItemStyle(index)} onMouseEnter={() => handleMouseEnter(index)} onMouseLeave={handleMouseLeave}>
                <a href="#" style={listLinkStyle}>
                  <span className="mr-2">👥</span> {item}
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>
    );
  };
  
  export default LeftMenu;
  