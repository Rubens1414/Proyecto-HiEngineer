import React from 'react'
import { useEffect, useState } from 'react';
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStopwatch } from '@fortawesome/free-solid-svg-icons';
import { faListCheck } from '@fortawesome/free-solid-svg-icons';



function Notificaciones_ind({notificacion}) {

    const [isAdmin, setIsAdmin] = useState(false);

   

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
    


    
      return (
        <div className="text-center">
        <div className="mt-4">
          <div className="bg-white shadow-md rounded-lg p-4 w-full max-w-xl mx-auto">
            {isAdmin ? (
              <h2 className="text-xl font-semibold mb-2">
                <FontAwesomeIcon icon={faStopwatch} shake style={{ color: "#ec2222" }} /> Nueva solicitud: {notificacion.idpeticion}
              </h2>
            ) : (
              <h2 className="text-xl font-semibold mb-2">
                <FontAwesomeIcon icon={faListCheck} style={{ color: "#ff0000" }} /> Actualizacion de Solicitud: {notificacion.idpeticion}
              </h2>
            )}
            <p className="text-sm">{notificacion.mensaje}</p>
          </div>
        </div>
      </div>
      );
}

export default Notificaciones_ind