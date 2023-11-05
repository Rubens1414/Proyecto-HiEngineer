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
import { faXmark } from "@fortawesome/free-solid-svg-icons";
import { faImage } from "@fortawesome/free-solid-svg-icons";
import {faBusinessTime} from '@fortawesome/free-solid-svg-icons'
import {faBan} from '@fortawesome/free-solid-svg-icons'
import { faClone } from "@fortawesome/free-solid-svg-icons";
import {faCheckToSlot} from '@fortawesome/free-solid-svg-icons'
import {faHand} from '@fortawesome/free-solid-svg-icons'



function Peticiones_individual({peticiones}) {
    const imageUrl = '/images/' + peticiones.imagen;
    const [isAdmin, setIsAdmin] = useState(false);
    const [isOpen, setIsOpen] = useState(false);

  
  
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

   

    //handle open
    const handleOpen = () => {
      
      setIsOpen(!isOpen);
    }
 
     return (
        <div>
         
        {isAdmin ===false && peticiones.estado==='Aceptado' &&(
            
            <div className="flex justify-center ">
        
            <motion.div whileHover={{ scale: [null, 1.2] }} transition={{ duration: 0.2 }}>
             <button onClick={handleOpen}>
            <div  className="flex flex-col mx-2 mb-16">
               <div className="contenedor_historial">
              
      
               <FontAwesomeIcon icon={faCheckToSlot}   className="text-8xl text-green-500"  />
               </div>
               <div className=" -mt-44">
               <h1 className="text-2xl text-red-700">
                  {peticiones.nombre.length > 8
                    ? peticiones.nombre.slice(0, 8) + "..."
                    : peticiones.nombre}
                </h1>
               <h1 className="text-2xl text-black">Fecha: {peticiones.fecha}</h1>
                <h1 className="text-2xl text-black">Hora: {peticiones.hora}</h1>
                <h1 className="text-2xl text-black">Id encargado: {peticiones.idencargado}</h1>

               </div>
            </div>
           
            </button>
           </motion.div>
       
           </div>
          )}

          {isAdmin ===false && peticiones.estado==='En proceso' &&(
             <div className="flex justify-center ">
        
             <motion.div whileHover={{ scale: [null, 1.2] }} transition={{ duration: 0.2 }}>
              <button onClick={handleOpen}>
             <div  className="flex flex-col mx-2 mb-16">
                <div className="contenedor_historial">
               
       
                <FontAwesomeIcon icon={faBusinessTime}   className="text-8xl text-orange-500"  />
                </div>
                <div className=" -mt-44">
                <h1 className="text-2xl text-orange-700">
                   {peticiones.nombre.length > 8
                     ? peticiones.nombre.slice(0, 8) + "..."
                     : peticiones.nombre}
                 </h1>
                <h1 className="text-2xl text-black">Fecha: {peticiones.fecha}</h1>
                 <h1 className="text-2xl text-black">Hora: {peticiones.hora}</h1>
                 <h1 className="text-2xl text-black">Id encargado: {peticiones.idencargado}</h1>
 
                </div>
             </div>
            
             </button>
            </motion.div>
        
            </div>
           )}
            {isAdmin ===false && peticiones.estado==='Cancelado' &&(
              <div className="flex justify-center ">
          
              <motion.div whileHover={{ scale: [null, 1.2] }} transition={{ duration: 0.2 }}>
                <button onClick={handleOpen}>
              <div  className="flex flex-col mx-2 mb-16">
                  <div className="contenedor_historial">
                
        
                  <FontAwesomeIcon icon={faBan}   className="text-8xl text-red-500"  />
                  </div>
                  <div className=" -mt-44">
                  <h1 className="text-2xl text-red-700">
                    {peticiones.nombre.length > 8
                      ? peticiones.nombre.slice(0, 8) + "..."
                      : peticiones.nombre}
                  </h1>
                  <h1 className="text-2xl text-black">Fecha: {peticiones.fecha}</h1>
                  <h1 className="text-2xl text-black">Hora: {peticiones.hora}</h1>
                  <h1 className="text-2xl text-black">Id encargado: {peticiones.idencargado}</h1>
  
                  </div>
              </div>
              
              </button>
              </motion.div>
          
              </div>
            )}

            {isAdmin ===false && peticiones.estado==='Falso' &&(
               <div className="flex justify-center ">
          
               <motion.div whileHover={{ scale: [null, 1.2] }} transition={{ duration: 0.2 }}>
                 <button onClick={handleOpen}>
               <div  className="flex flex-col mx-2 mb-16">
                   <div className="contenedor_historial">
                 
         
                   <FontAwesomeIcon icon={faClone}   className="text-8xl text-gray-500"  />
                   </div>
                   <div className=" -mt-44">
                   <h1 className="text-2xl text-gray-700">
                     {peticiones.nombre.length > 8
                       ? peticiones.nombre.slice(0, 8) + "..."
                       : peticiones.nombre}
                   </h1>
                   <h1 className="text-2xl text-black">Fecha: {peticiones.fecha}</h1>
                   <h1 className="text-2xl text-black">Hora: {peticiones.hora}</h1>
                   <h1 className="text-2xl text-black">Id encargado: {peticiones.idencargado}</h1>
   
                   </div>
               </div>
               
               </button>
               </motion.div>
           
               </div>
             )}

            {isAdmin ===false && peticiones.estado==='Pendiente' &&(
                <div className="flex justify-center ">
          
                <motion.div whileHover={{ scale: [null, 1.2] }} transition={{ duration: 0.2 }}>
                  <button onClick={handleOpen}>
                <div  className="flex flex-col mx-2 mb-16">
                    <div className="contenedor_historial">
                  
          
                    <FontAwesomeIcon icon={faHand}   className="text-8xl text-blue-500"  />
                    </div>
                    <div className=" -mt-44">
                    <h1 className="text-2xl text-blue-700">
                      {peticiones.nombre.length > 8
                        ? peticiones.nombre.slice(0, 8) + "..."
                        : peticiones.nombre}
                    </h1>
                    <h1 className="text-2xl text-black">Fecha: {peticiones.fecha}</h1>
                    <h1 className="text-2xl text-black">Hora: {peticiones.hora}</h1>
                    <h1 className="text-2xl text-black">Id encargado: {peticiones.idencargado}</h1>
    
                    </div>
                </div>
                
                </button>
                </motion.div>
            
                </div>
              )}
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
                     <h1 className="text-2xl ml-4">
                         Id del encargado:{" "}
                         <span className="text-black max-h-40 overflow-y-auto block">
                           {peticiones.idencargado}
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
                         Descripción Ingeniero o tecnico:{" "}
                         <span className="text-black max-h-40 overflow-y-auto block">
                           {peticiones.descripcion_admin}
                         </span>
                       </h1>
                     
                    
                </div>
                
                
               
               </div>
              
             </motion.div>
           
           </motion.div>
           
         )}
        </div>
       
    );
}

export default Peticiones_individual;