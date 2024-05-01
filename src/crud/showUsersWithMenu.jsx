import React, {useState, useRef, useEffect} from 'react';
import DropdownMenu from './desplegable';
import CreateUser from './createUser';
import LeftMenu from './leftMenu';

const ShowUsersWithMenu = () => {

  const [currentPage, setCurrentPage] = useState(1);
  const rowsPerPage = 11; // Define el número de filas por página
  const [rows, setRows] = useState([]);
  const rowRefs = useRef([]);

  const [refreshList, setRefreshList] = useState(false);

  const handleRefreshList = () => {
    setRefreshList(!refreshList);
  };


  useEffect ( () => {
    const fetchData = async() => {
      try {
        const token = localStorage.getItem('token')
        console.log(token)
        const response = await fetch('https://evaluacion.sierpes48.es/usuarios', {
          method: 'GET',
          headers: {
            'Accept': 'application/json',
            'Authorization': `Bearer ${token}`
          }
        });
  
        if (response.ok) {
          const data = await response.json();
          console.log('Respuesta del servidor:', data);
          setRows(data.data.usuarios)
          console.log(data.data.usuarios.length)
          rowRefs.current = Array(data.data.usuarios.length).fill().map(() => React.createRef());
        } else {
          console.error('Error al traer los datos');
        }
      } catch (error) {
        console.error('Error al enviar la solicitud:', error);
      }
    };

    fetchData();
  }, [refreshList])
  // Datos de ejemplo para las filas

  // Función para calcular el índice de inicio y final de las filas a mostrar en la página actual
  const indexOfLastRow = currentPage * rowsPerPage;
  const indexOfFirstRow = indexOfLastRow - rowsPerPage;
  const currentRows = rows.slice(indexOfFirstRow, indexOfLastRow);

  const handlePreviousPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const handleNextPage = () => {
    const maxPages = Math.ceil(rows.length / rowsPerPage);
    if (currentPage < maxPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  return (
    <div style={container}>
      <LeftMenu></LeftMenu>
      <div style={{display: 'flex', flexDirection: 'column', margin: '20px', width: '100%'}}>
          <div style={header}>
            <h1 style={heading}>Usuarios/Listado</h1>
            <CreateUser onItemCreate={handleRefreshList}></CreateUser>
          </div>
          <div style={tableContainer}>
            <table style={table}>
              <thead>
                <tr>
                  <th style={{...tableHeader, width:'35%'}}>Usuario</th>
                  <th style={tableHeader}>Nombre</th>
                  <th style={tableHeader}>Apellidos</th>
                  <th style={tableHeader}>E-mail</th>
                  <th style={tableHeader}>Teléfono</th>
                  <th style={tableHeader}>Estado</th>
                </tr>
              </thead>
              <tbody>
                {rowRefs && currentRows.map((row, index) => (
                  <tr key={index}>
                    {index % 2 === 0 ? (
                      <td style={{...tableCell, width: '300px', backgroundColor: 'white'}} ref={rowRefs.current[index]}>
                        <div style={{display: 'flex', alignItems:'center', justifyContent: 'space-between'}}>
                          {row.username}
                          <DropdownMenu user={row} ref={rowRefs.current[index]}/>
                        </div>
                      </td>
                      ) : (
                      <td style={{...tableCell, width: '300px', backgroundColor: '#eceeee'}} ref={rowRefs.current[index]} >
                        <div style={{display: 'flex', alignItems:'center', justifyContent: 'space-between'}}>
                          {row.username}
                          <DropdownMenu user={row} ref={rowRefs.current[index]}/>
                        </div>
                      </td>
                      )
                    }
                  
                    <td style={{...tableCell, backgroundColor:'#eceeee'}}>{row.first_name ? row.first_name : 'No tiene'}</td>
                    <td style={{...tableCell,  backgroundColor: 'white'}}>{row.last_name ? row.last_name : 'No tiene'}</td>
                    <td style={{...tableCell, backgroundColor:' #eceeee '}}>{row.email ? row.email : 'No tiene'}</td>
                    <td style={{...tableCell,  backgroundColor: 'white'}}>{row.phone ? row.phone : 'No tiene'}</td>
                    <td style={{...tableCell, backgroundColor:' #eceeee '}}>
                      {row.active === true ? (
                        <span style={{...status, color: '#10B981'}}>
                        <span style={statusActive}></span>
                          Activo
                        </span>
                      ) : (
                        <span style={status}>
                          <span style={statusDeactive}></span>
                          Inactivo
                        </span>
                      )
                      }
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        <div style={pagination}>
          <span style={paginationText}>{`Showing ${indexOfFirstRow + 1} to ${Math.min(indexOfLastRow, rows.length)} of ${rows.length} Entries`}</span>
          {rows.length > rowsPerPage ? (
            <div style={buttonGroup}>
              <button style={paginationButton} onClick={handlePreviousPage}>Previous</button>
              <button style={{ ...paginationButton, marginLeft: '8px' }} onClick={handleNextPage}>Next</button>
            </div>
          ): (null)
          }
        </div>
      </div>
    </div>
  );
};

const container = {
  borderRadius: '8px',
  position: 'relative',
  width: '100%',
  boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
  display: 'flex',
  height: '100%'
};

const header = {
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  paddingBottom: '16px',
};

const heading = {
  fontSize: '1.125rem',
  fontWeight: '600',
  color: '#1F2937',
};

const tableContainer = {
  marginTop: '16px',
  height: '100%',
  borderRadius: '2%',
  borderCollapse: 'collapse',
  border: '2px solid #D1D5DB',
  backgroundColor: '#edf5f9'
};

const table = {
  width: '100%',
};

const tableHeader = {
  padding: '12px 16px',
  color: '#6B7280',
  textTransform: 'uppercase',
  fontSize: '0.875rem',
  fontWeight: 'bold',
  textAlign: 'left',
};

const tableCell = {
  padding: '12px 16px',
  color: '#4B5563',
  alignItems: 'center',
  fontSize: '0.875rem',
  border: '2px solid #D1D5DB',
};

const status = {
  position: 'relative',
  display: 'inline-block',
  padding: '6px 12px',
  fontWeight: '600',
};

const statusActive = {
  position: 'absolute',
  top: '50%',
  left: '0',
  transform: 'translateY(-50%)',
  width: '8px',
  height: '8px',
  borderRadius: '50%',
  backgroundColor: '#10B981',
  marginRight: '8px',
};

const statusDeactive = {
  position: 'absolute',
  top: '50%',
  left: '0',
  transform: 'translateY(-50%)',
  width: '8px',
  height: '8px',
  borderRadius: '50%',
  backgroundColor: 'grey',
  marginRight: '8px',
};

const pagination = {
  paddingTop: '16px',
  borderTop: '2px solid #D1D5DB',
  marginTop: 'auto',
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
};

const paginationText = {
  fontSize: '0.75rem',
  color: '#6B7280',
};

const buttonGroup = {
  display: 'inline-flex',
  marginTop: '8px',
};

const paginationButton = {
  fontSize: '0.875rem',
  color: '#3B82F6',
  border: '2px solid #D1D5DB',
  borderRadius: '4px',
  padding: '8px 16px',
  cursor: 'pointer',
  transition: 'background-color 0.15s ease-in-out, color 0.15s ease-in-out',
};


export default ShowUsersWithMenu;
