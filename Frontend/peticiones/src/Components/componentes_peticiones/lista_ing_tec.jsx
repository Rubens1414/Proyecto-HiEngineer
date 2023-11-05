import React, { useEffect, useState } from 'react';
import axios from 'axios';

function ListaIngTec({ Admin, onSelect }) {
  const [isAdmin, setIsAdmin] = useState(false);
  const [isSelected, setIsSelected] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem('token');

    if (token) {
      axios
        .get('/api/usuario/ruta-protegida', {
          headers: {
            Authorization: token,
          },
        })
        .then((response) => {
          console.log(response.data.message);
          console.log(response.data.userId);
          response.data.admin ? setIsAdmin(true) : setIsAdmin(false);
        })
        .catch((error) => {
          console.log('Acceso no autorizado');
        });
    }
  }, []);

  const handleSelect = (id) => {
    if (!isSelected) {
      setIsSelected(true);
      onSelect(id);
    } else {
      setIsSelected(false);
      onSelect(null); // Deseleccionar la tarjeta
    }
  };

  return (
    <div style={{ textAlign: 'center' }}>
      <button
        onClick={() => handleSelect(Admin.idusuario)}
        className={` text-black border border-sky-400 border-b-4 font-medium overflow-hidden relative px-4 py-2 rounded-md hover:brightness-150 hover:border-t-4 hover:border-b active:opacity-75 outline-none duration-300 group m-2 ${
          isSelected ? ' text-green-400  border-green-400  ' : 'bg-white'
        }`}
      >
        <span className={` absolute -top-[150%] left-0 inline-flex w-80 h-[5px] rounded-md opacity-50 group-hover:top-[150%] duration-500 shadow-[0_0_10px_10px_rgba(0,0,0,0.3)] ${isSelected ? ' bg-green-400  shadow-green-400  ' : 'bg-sky-400  shadow-sky-400'}`}></span>
        Nombre: {Admin.nombre} {Admin.apellido} Id: {Admin.idusuario}
      </button>
    </div>
  );
}

export default ListaIngTec;
