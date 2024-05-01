import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import ShowView from './crud/showView';

const Main = () => {
  const [formDataList, setFormDataList] = useState([
    {fullName: 'Francisco',
    email: 'franmprior@gmail.com',
    message: '1',
    favoriteColor: 'red'},
    {fullName: 'Francisco',
    email: 'franmprior@gmail.com',
    message: '2',
    favoriteColor: 'red'},
    ]);

    const onDelete = (index) => {
        const deleteList = [...formDataList];
        deleteList.splice(index, 1);
        setFormDataList(deleteList)
    }

  return (
    <div style={{ padding: '20px' }}>
      <h1>Crear y Visualizar Datos</h1>
      <Link to="/crear">
        <button>Crear Nuevo</button>
      </Link>
      <ShowView formDataList={formDataList} onDelete={onDelete}/>
    </div>
  );
};

export default Main;
