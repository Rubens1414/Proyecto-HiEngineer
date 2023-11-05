import React from "react";
import { useEffect } from "react";
import axios from "axios";
import { useState } from "react";
import '../../css/peticiones_individuales.css'

//importar variable del store 

//Animacion
import { motion } from "framer-motion";
//icons:
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {faClipboardQuestion, faHand, faRectangleXmark} from '@fortawesome/free-solid-svg-icons'
import { faXmark } from "@fortawesome/free-solid-svg-icons";
import { faExclamation } from "@fortawesome/free-solid-svg-icons";
import { faCheck } from "@fortawesome/free-solid-svg-icons";
import { faImage } from "@fortawesome/free-solid-svg-icons";
import {faBusinessTime} from '@fortawesome/free-solid-svg-icons'
import {faClipboardCheck} from '@fortawesome/free-solid-svg-icons'
import {faBan} from '@fortawesome/free-solid-svg-icons'
import { faClone } from "@fortawesome/free-solid-svg-icons";
import {faCheckToSlot} from '@fortawesome/free-solid-svg-icons'
import {faPenToSquare} from '@fortawesome/free-solid-svg-icons'

function Peticiones_individual({peticiones}) {
    const imageUrl = '/images/' + peticiones.imagen;
    const [isAdmin, setIsAdmin] = useState(false);
    const [isOpen, setIsOpen] = useState(false);
    const [aceptado , setAceptado] = useState(false);
    const [isHovered, setIsHovered] = useState(false);
    const [isHovered2, setIsHovered2] = useState(false);
    const [isHovered3, setIsHovered3] = useState(false);
    const [isHovered4, setIsHovered4] = useState(false);
    const Swal = require('sweetalert2')

  
  
    useEffect(() => {
      const token = localStorage.getItem('token');
  
      if (token) {
        axios.get('/api/usuario/ruta-protegida', {
          headers: {
            Authorization: token
          }
        })
          .then(response => {
            console.log(response.data.message); 
            console.log(response.data.userId);
            response.data.admin ? setIsAdmin(true) : setIsAdmin(false);          
          })
          .catch(error => {
            console.log('Acceso no autorizado'); // El token no es válido o el usuario no está autenticado
       
          });
         
  
      } 
    }, []);

    //handles:
    //handle descripcion
    const handleDescripcion_proceso = () => {
      Swal.fire({
        title: 'Describe el estado del proceso:',
        html: '<textarea type="text" id="descripcion" name="descripcion" rows="4" class="textarea_soli" placeholder="Escribe una descripcion del estado..">',
        icon: 'warning',
        confirmButtonText: 'Aceptar',
        showCancelButton: 'Cancelar',
        preConfirm: () => {
          const descripcion = document.getElementById('descripcion').value;
          if (!descripcion) {
            Swal.showValidationMessage('Por favor, completa la descripción');
          } else {
            return { descripcion: descripcion };
          }
        }
      }).then((result) => {
        if (result.isConfirmed) {
          const descripcion = result.value.descripcion;
          //enviar a la base de datos
          const id=peticiones.idpeticion
          axios.post(`/api/peticiones/actualizar_estado_en_proceso/${id}`, { descripcion: descripcion })
          .then(res => {
            if (res.data === 'Estado actualizado') {
              Swal.fire({
                title: 'Estado actualizado',
                icon: 'success',
                confirmButtonText: 'Aceptar',
              }).then((result) => {
                if (result) {
                  window.location.reload();
                }
              });
            }
          })
          .catch(err => console.log(err));
             
        }
      });
      
    }
    const handleDescripcion_completado = () => {
      Swal.fire({
        title: 'Describe el estado del completado:',
        html: '<textarea type="text" id="descripcion" name="descripcion" rows="4" class="textarea_soli" placeholder="Escribe una descripcion del estado..">',
        icon: 'success',
        confirmButtonText: 'Aceptar',
        showCancelButton: 'Cancelar',
        preConfirm: () => {
          const descripcion = document.getElementById('descripcion').value;
          if (!descripcion) {
            Swal.showValidationMessage('Por favor, completa la descripción');
          } else {
            return { descripcion: descripcion };
          }
        }
      }).then((result) => {
        if (result.isConfirmed) {
          const descripcion = result.value.descripcion;
          //enviar a la base de datos
          const id=peticiones.idpeticion
          axios.post(`/api/peticiones/aceptar_peticion/${id}`, { descripcion: descripcion })
          .then(res => {
            if (res.data === 'Estado actualizado') {
              Swal.fire({
                title: 'Estado actualizado',
                icon: 'success',
                confirmButtonText: 'Aceptar',
              }).then((result) => {
                if (result) {
                  window.location.reload();
                }
              });
            }
          })
          .catch(err => console.log(err));
             
        }
      });
      
    }
    const handleDescripcion_rechazado = () => {
      Swal.fire({
        title: 'Describe el estado del rechazo:',
        html: '<textarea type="text" id="descripcion" name="descripcion" rows="4" class="textarea_soli" placeholder="Escribe una descripcion del estado..">',
        icon: 'error',
        confirmButtonText: 'Aceptar',
        showCancelButton: 'Cancelar',
        preConfirm: () => {
          const descripcion = document.getElementById('descripcion').value;
          if (!descripcion) {
            Swal.showValidationMessage('Por favor, completa la descripción');
          } else {
            return { descripcion: descripcion };
          }
        }
      }).then((result) => {
        if (result.isConfirmed) {
          const descripcion = result.value.descripcion;
          //enviar a la base de datos
          const id=peticiones.idpeticion
          axios.post(`/api/peticiones/actualizar_estado_cancelado/${id}`, { descripcion: descripcion })
          .then(res => {
            if (res.data === 'Estado actualizado') {
              Swal.fire({
                title: 'Estado actualizado',
                icon: 'success',
                confirmButtonText: 'Aceptar',
              }).then((result) => {
                if (result) {
                  window.location.reload();
                }
              });
            }
          })
          .catch(err => console.log(err));
             
        }
      });
      
    }
    const handleDescripcion_false = () => {
      Swal.fire({
        title: 'Describe el estado del falso:',
        html: '<textarea type="text" id="descripcion" name="descripcion" rows="4" class="textarea_soli" placeholder="Escribe una descripcion del estado..">',
        icon: 'question',
        confirmButtonText: 'Aceptar',
        showCancelButton: 'Cancelar',
        preConfirm: () => {
          const descripcion = document.getElementById('descripcion').value;
          if (!descripcion) {
            Swal.showValidationMessage('Por favor, completa la descripción');
          } else {
            return { descripcion: descripcion };
          }
        }
      }).then((result) => {
        if (result.isConfirmed) {
          const descripcion = result.value.descripcion;
          //enviar a la base de datos
          const id=peticiones.idpeticion
          axios.post(`/api/peticiones/actualizar_estado_false/${id}`, { descripcion: descripcion })
          .then(res => {
            if (res.data === 'Estado actualizado') {
              Swal.fire({
                title: 'Estado actualizado',
                icon: 'success',
                confirmButtonText: 'Aceptar',
              }).then((result) => {
                if (result) {
                  window.location.reload();
                }
              });
            }
          })
          .catch(err => console.log(err));
             
        }
      });
      
    }
   

    //handle open
    const handleOpen = () => {
      
      setIsOpen(!isOpen);
    }
    const Aceptar=()=>{
      setAceptado(!aceptado);
    }
  

    const handleMouseEnter = () => {
      setIsHovered(true);
    };

    const handleMouseLeave = () => {
      setIsHovered(false);
    };
    const handleMouseEnter2 = () => {
      setIsHovered2(true);
    };
    const handleMouseLeave2 = () => {
      setIsHovered2(false);
    };
    const handleMouseEnter3 = () => {
      setIsHovered3(true);
    };
    const handleMouseLeave3 = () => {
      setIsHovered3(false);
    };
    const handleMouseEnter4 = () => {
      setIsHovered4(true);
    };
    const handleMouseLeave4 = () => {
      setIsHovered4(false);
    };
  
    

     return (
        <div>
         
        {isAdmin ===false  &&(
            <div  class=" flex flex-col mr-56 ml-56 mt-4 mb-4 pt-8 pl-8 pb-16 rounded-lg border-double border-4 border-yellow-500 " > 
            <h2 className="gugi text-red-700 text-3xl" style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>Problema </h2>
            <h1 style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>{peticiones.problema[0]}, {peticiones.problema[1]}</h1>
            <h2 className="gugi text-red-700 pt-4 text-3xl" style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>Nombre del solicitante</h2>
            <h1 style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>{peticiones.nombre} {peticiones.apellido}</h1>
            <h2 className="gugi text-red-700 pt-4 text-3xl" style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>Sitio</h2>
            <h1 style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>{peticiones.lugar}</h1>
            <h2 className="gugi text-red-700 pt-4 text-3xl" style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>Descripcion </h2>
            <h1 style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>{peticiones.descripcion}</h1>
            <h2 className="gugi text-red-700 pt-4 text-3xl" style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>Fecha y hora </h2>
            <h1 style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>{peticiones.fecha} {peticiones.hora}</h1>
            
            {peticiones.imagen != null && (
               
              <div className='flex flex-col' style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
              <h2 className="gugi text-red-700 pt-4 text-3xl" style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>Imagen de evidencia</h2>
              <img className='pt-4 w-56 h-32' src={imageUrl} alt="Imagen" />
              </div>
    
            )}
    
            </div>
          )}

        
          
           
         
        </div>
       
    );
}

export default Peticiones_individual;