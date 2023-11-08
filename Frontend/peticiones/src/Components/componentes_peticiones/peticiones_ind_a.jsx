import React from 'react'
import { useEffect } from 'react';
import axios from 'axios';
import { useState } from 'react';
import '../../css/Principal.css'
import '../../css/Ver_solicitudes.css'
import '../../css/solicitudes_completadas.css'
//Animacion
import { motion } from "framer-motion";
//icons:
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import { faXmark } from "@fortawesome/free-solid-svg-icons";
import { faImage } from "@fortawesome/free-solid-svg-icons";
import {faBusinessTime} from '@fortawesome/free-solid-svg-icons'
import {faClipboardCheck} from '@fortawesome/free-solid-svg-icons'
import {faBan} from '@fortawesome/free-solid-svg-icons'
import { faClone } from "@fortawesome/free-solid-svg-icons";
import {faCheckToSlot} from '@fortawesome/free-solid-svg-icons'
import {faPenToSquare} from '@fortawesome/free-solid-svg-icons'



function Peticiones_ind_a({peticiones}) {
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
          axios.post(`/api/notificaciones/enviar-notificacion/${peticiones.idusuario}/${id}`, {
            mensaje: descripcion, 
          })
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
          axios.post(`/api/notificaciones/enviar-notificacion/${peticiones.idusuario}/${id}`, {
            mensaje: descripcion, 
          })
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
          axios.post(`/api/notificaciones/enviar-notificacion/${peticiones.idusuario}/${id}`, {
            mensaje: descripcion, 
          })
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
          axios.post(`/api/notificaciones/enviar-notificacion/${peticiones.idusuario}/${id}`, {
            mensaje: descripcion, 
          })
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
    {isAdmin===true && peticiones.estado==='Aceptado' &&(
        <div>
        <div className="flex justify-center ">
        
         <motion.div whileHover={{ scale: [null, 1.2] }} transition={{ duration: 0.2 }}>
          <button onClick={handleOpen}>
         <div  className="flex flex-col mx-2 mb-16">
            <div className="contenedor_iconos_completas">
           
   
            <FontAwesomeIcon icon={faCheckToSlot}   className="text-8xl text-green-500"  />
            </div>
            <div className="-mt-28">
            <h1 className="text-2xl  text-red-700">{peticiones.nombre}</h1>
            <h1 className="text-2xl text-black">Ticket: #{peticiones.idpeticion}</h1>
            </div>
         </div>
        
         </button>
        </motion.div>
    
        </div>
        {(isOpen === true) && (
           <motion.div
             className="modal_pendiente"
             initial={{ opacity: 0 }} // Estado inicial de la animación (opcional)
             animate={{ opacity: 1 }} // Estado final de la animación
             exit={{ opacity: 0 }}
             transition={{ duration: 0.5 }} // Duración de la animación
           >
             <motion.div
               className="contenedor_modal_p"
               initial={{ scale: 0 }} // Estado inicial de la animación (opcional)
               animate={{ scale: 1 }} // Estado final de la animación
               exit={{ scale: 0 }} 
               transition={{ type: "spring", bounce: 0, duration: 0.5 }} // Configuración de la animación
             >
             <div className="flex justify-end  bg-green-500 py-1 px-4  rounded-t-lg">
                 <button className='boton_cerrar_moda_pendiente' onClick={handleOpen}>
                   <FontAwesomeIcon icon={faXmark} />
                 </button>
             </div>
            
               <div className="flex flex-col "  >
                <div className="contenedor_info">
                   
                     <h1 className=" text-2xl ml-4 ">
                       Nombre del solicitante:{" "}
                       <span className=" text-black  overflow-hidden overflow-ellipsis max-w-xs ">
                         {peticiones.nombre} {peticiones.apellido}
                       </span>
                     </h1>
                   
                     <h1 className=" text-2xl ml-4">
                       Sitio:{" "}
                       <span className=" text-black">
                         {peticiones.lugar}
                       </span>
                     </h1>
                     <h1 className=" text-2xl ml-4">
                       Problema:{" "}
                       <span className=" text-black">
                         {peticiones.problema[0]}, {peticiones.problema[1]}
                       </span>
                     </h1>
                    
                     <h1 className=" text-2xl ml-4">
                       Fecha y hora:{" "}
                       <span className=" text-black">
                       {peticiones.hora} {peticiones.fecha}
                       </span>
                     </h1>
                     
                     {peticiones.imagen != null && (
                          <h1 className=" text-2xl ml-4">
                          Imagen:{" "}
                          <span className=" text-black">
                            <button className="boton_ver_imagen"><FontAwesomeIcon icon={faImage} /></button>
                          </span>
                        </h1>

                     )}
                      <h1 className="text-2xl ml-4">
                         Descripción:{" "}
                         <span className="text-black max-h-40 overflow-y-auto block">
                           {peticiones.descripcion}
                         </span>
                       </h1>
                       <h1 className="text-2xl ml-4">
                         Descripción Ingeniero:{" "}
                         <span className="text-black max-h-40 overflow-y-auto block">
                           {peticiones.descripcion_admin}
                         </span>
                       </h1>
                     
                    
                </div>
                
                
               
               </div>
               <div className="flex flex-row justify-center ">
            
                <button className="boton_edit_peticion" onClick={Aceptar} >
                <FontAwesomeIcon icon={faPenToSquare} className="text-xl" />
                </button>
                 </div>
             </motion.div>
             {aceptado  && (
             <motion.div
             className="modal_pendiente"
             initial={{ opacity: 0 }} // Estado inicial de la animación (opcional)
             animate={{ opacity: 1 }} // Estado final de la animación
             exit={{ opacity: 0 }}
             transition={{ duration: 0.5 }} // Duración de la animación
             >
             <motion.div
               className="contenedor_modal_a"
               initial={{ scale: 0 }} // Estado inicial de la animación (opcional)
               animate={{ scale: 1 }} // Estado final de la animación
               exit={{ scale: 0 }} 
               transition={{ type: "spring", bounce: 0, duration: 0.5 }} // Configuración de la animación
             >
               <div className="flex float-right ">
                   <button className='boton_cerrar_moda_pendiente'  onClick={Aceptar} >
                               <FontAwesomeIcon icon={faXmark} />
                 </button>
               </div>
            
               <div className="flex flex-col pt-4  pl-10"  >
                  <div className="flex justify-center ">
                  <motion.div whileHover={{ scale: [null, 1.2] }} transition={{ duration: 0.2 }}>
                     <button onMouseEnter={handleMouseEnter}
                      onMouseLeave={handleMouseLeave} onClick={handleDescripcion_proceso}>
                   
                   <div className="iconos_aceptar_proceso">
                       <FontAwesomeIcon icon={faBusinessTime} bounce className=" text-2xl text-yellow-400" />
                  
                   </div>
                   {isHovered && (
                      <div className="popover_proceso">
                      {/* Popover content goes here */}
                      <div className="bg-yellow-500">
                        <h3 className="font-semibold text-gray-900 dark:text-white text-lg  ">
                          En proceso
                        </h3>
                      </div>
                      <div className="py-2 px-2">
                        <p className="whitespace-nowrap">Coloca la solcitud en proceso.</p>
                      </div>
                      <div data-popper-arrow='right'></div>

                    </div>
                     )}
                   </button >
                   </motion.div>
                   <motion.div whileHover={{ scale: [null, 1.2] }} transition={{ duration: 0.2 }}>
                     <button onMouseEnter={handleMouseEnter2}
                      onMouseLeave={handleMouseLeave2} onClick={handleDescripcion_completado}>
                   <div className="iconos_aceptar_complete">
                  
                       <FontAwesomeIcon icon={faClipboardCheck} bounce className=" text-2xl text-green-400" />
                   </div>
                   {isHovered2 && (
                      <div className="popover_completado">
                      {/* Popover content goes here */}
                      <div className="bg-green-500">
                        <h3 className="font-semibold text-gray-900 dark:text-white text-lg  ">
                          Completado
                        </h3>
                      </div>
                      <div className="py-2 px-2">
                        <p className="whitespace-nowrap">Coloca la solcitud en completado.</p>
                      </div>
                      <div data-popper-arrow="left"></div>
                    </div>
                     )}
                   </button>
                   </motion.div>
                   </div>
                   <div className="flex justify-center ">
                   <motion.div whileHover={{ scale: [null, 1.2] }} transition={{ duration: 0.2 }}>
                     <button onMouseEnter={handleMouseEnter3}
                      onMouseLeave={handleMouseLeave3}  onClick={handleDescripcion_rechazado}>
                   <div className="iconos_aceptar_rechazado">
                       
                       <FontAwesomeIcon icon={faBan} bounce className=" text-2xl text-red-400" />
                   </div>
                   {isHovered3 && (
                      <div className="popover_cancelado">
                      {/* Popover content goes here */}
                      <div className="bg-red-500">
                        <h3 className="font-semibold text-gray-900 dark:text-white text-lg  ">
                          Cancelado
                        </h3>
                      </div>
                      <div className="py-2 px-2">
                        <p className="whitespace-nowrap">Coloca la solcitud en cancelado.</p>
                      </div>
                      <div data-popper-arrow="right-c"></div>
                    </div>
                     )}
                   </button>
                   </motion.div>
                   <motion.div whileHover={{ scale: [null, 1.2] }} transition={{ duration: 0.2 }}>
                     <button onMouseEnter={handleMouseEnter4}
                      onMouseLeave={handleMouseLeave4} onClick={handleDescripcion_false}>
                   <div className="iconos_aceptar_falso">
                  
                       <FontAwesomeIcon icon={faClone} bounce className=" text-2xl text-gray-400" />
                   </div>
                   {isHovered4 && (
                      <div className="popover_falso">
                      {/* Popover content goes here */}
                      <div className="bg-gray-500">
                        <h3 className="font-semibold text-gray-900 dark:text-white text-lg  ">
                          Completado
                        </h3>
                      </div>
                      <div className="py-2 px-2">
                        <p className="whitespace-nowrap">Coloca la solcitud en falso.</p>
                      </div>
                      <div data-popper-arrow="left-c"></div>
                    </div>
                     )}
                   </button>
                   </motion.div>
                   </div>
                  
               </div>
             </motion.div>
             </motion.div>
           
           ) }
           </motion.div>
           
         )}
        </div>
        
     )}
    </div>
  )
}

export default Peticiones_ind_a