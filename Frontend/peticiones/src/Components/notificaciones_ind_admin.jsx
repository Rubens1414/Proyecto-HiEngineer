import React from 'react'
import { useEffect, useState } from 'react';
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'; 
import { faListCheck } from '@fortawesome/free-solid-svg-icons';




function Notificaciones_ind_admin({notificacion}) {

  

   

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
              
            
            })
            .catch((error) => {
              console.log('Acceso no autorizado');
            });
        }
      }, []);
    


    
      return (
        <div className="text-center">
        <div className="mt-4">
          <div className="bg-white shadow-md rounded-lg p-4 w-full max-w-xl mx-auto">
              <h2 className="text-xl font-semibold mb-2">
                <FontAwesomeIcon icon={faListCheck} shake style={{ color: "#ec2222" }} /> Nueva solicitud: {notificacion.idpeticion}
              </h2>
            <p className="text-sm">{notificacion.mensaje}</p>
          </div>
        </div>
      </div>
      );
}

export default Notificaciones_ind_admin