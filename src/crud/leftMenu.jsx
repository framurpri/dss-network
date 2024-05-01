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
    return (
      <div style={containerStyle}>
        <div style={headerStyle}>
          <h1 className="text-lg font-bold">Take[A]Net</h1>
        </div>
        <div style={profileContainerStyle}>
          <img src="https://placehold.co/120x120" alt="Profile Picture" style={profileImageStyle} />
          <h2 className="font-semibold">Nombre Apellidos</h2>
          <p className="text-sm mb-4">Cargo</p>
          <button style={buttonStyle}>Editar perfil</button>
        </div>
        <div style={{ marginTop: '1rem' }}>
          <ul className="space-y-2">
            <li style={listItemStyle}>
              <a href="#" style={listLinkStyle}>
                <span className="mr-2">👥</span> Clientes
              </a>
            </li>
            <li style={listItemStyle}>
              <a href="#" style={listLinkStyle}>
                <span className="mr-2">📁</span> Proyectos
              </a>
            </li>
            <li style={listItemStyle}>
              <a href="#" style={listLinkStyle}>
                <span className="mr-2">🗺️</span> Rutas
              </a>
            </li>
            <li style={listItemStyle}>
              <a href="#" style={listLinkStyle}>
                <span className="mr-2">👨‍💼</span> Colaboradores
              </a>
            </li>
            <li style={listItemStyle}>
              <a href="#" style={listLinkStyle}>
                <span className="mr-2">🔐</span> Permisos
              </a>
            </li>
            <li style={listItemStyle}>
              <a href="#" style={listLinkStyle}>
                <span className="mr-2">👤</span> Usuarios
              </a>
            </li>
            <li style={listItemStyle}>
              <a href="#" style={listLinkStyle}>
                <span className="mr-2">➕</span> Nuevo
              </a>
            </li>
          </ul>
        </div>
      </div>
    );
  };
  
  export default LeftMenu;
  