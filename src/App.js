import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Login from './crud/login';
import EditUser from './crud/editUser';
import ShowUsersWithMenu from './crud/showUsersWithMenu';

const App = () => {
  return (
    <Router>
        <Routes>
          <Route path="/" element={<Login />} /> 
          <Route path="/mostrar" element={<ShowUsersWithMenu />} />
          <Route path="/editar/:id" element={<EditUser/>} /> 
        </Routes>
    </Router>
  );
};

export default App;
