import React from 'react'
import { useEffect } from 'react';
import axios from 'axios';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import Peticiones_individual from './peticiones_individual';
import '../../css/Ver_solicitudes.css'
import  '../../css/Principal.css'

//icons
import { BsCaretDownSquareFill } from "react-icons/bs";
import { BsCaretUpSquareFill } from "react-icons/bs";
import { FaUserCircle } from "react-icons/fa";
import { GoSignOut } from "react-icons/go";
import {faBusinessTime} from '@fortawesome/free-solid-svg-icons'
import {faClipboardCheck} from '@fortawesome/free-solid-svg-icons'
import {faBan} from '@fortawesome/free-solid-svg-icons'
import { faClone } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHand} from '@fortawesome/free-solid-svg-icons'

import { faFile } from "@fortawesome/free-solid-svg-icons";

function Historial_solicitudes() {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [idusuario, setIdusuario] = useState('')
    const [mostrar_pendiente, setMostrar_pendiente] = useState(true);
    const [mostrar_proceso, setMostrar_proceso] = useState(false);
    const [mostrar_cancelado, setMostrar_cancelado] = useState(false);
    const [mostrar_falsa, setMostrar_falsa] = useState(false);
    const [mostrar_aprobado, setMostrar_aprobado] = useState(false);
    const [isOpen, setIsOpen] = useState(false);
    const [userOpen, setUserOpen] = useState(false);

    const navigate = useNavigate();

    const [datahistorialp, setHistorialp] = useState([])
    const [datahistorialc, setHistorialc] = useState([])
    const [datahistorialf, setHistorialf] = useState([])
    const [datahistoriala, setHistoriala] = useState([])
    const [datahistorialpr, setHistorialpr] = useState([])
    useEffect(() => {
        const token = localStorage.getItem('token');
      
        if (token) {
          axios.get('/api/usuario/ruta-protegida', {
            headers: {
              Authorization: token
            }
          })
            .then(response => {
              console.log(response.data.message); // Acceso autorizado
              setIdusuario(response.data.userId);
              setIsLoggedIn(true);
            })
            .catch(error => {
              console.log('Acceso no autorizado'); // El token no es válido o el usuario no está autenticado
              setIsLoggedIn(false);
            });
        } else {
          setIsLoggedIn(false);
          navigate('/inicio_sesion');
        }
      }, []);

      useEffect(() => {
  
        function handleClickOutside(event) {
          const container = document.querySelector('.dropdown-container');
          const button = document.querySelector('.icon_desplazar_solicitudes');
          const container2 = document.querySelector('.dropdown-user');
          const button2 = document.querySelector('.icon_desplazar_solicitudes');
      
          if (isOpen && !container.contains(event.target) && event.target !== button) {
            setIsOpen(false);
          }
          if (userOpen && !container2.contains(event.target) && event.target !== button2) {
            setUserOpen(false);
          }
        }
      
        document.addEventListener('mousedown', handleClickOutside);
      
        return () => {
          document.removeEventListener('mousedown', handleClickOutside);
        };
      }, [isOpen, userOpen]);
      

      const handleLogout = () => {
        localStorage.removeItem('token');
        window.location.reload();
      };
      //handle para mostrar las peticiones pendientes
      const handleMostrar_pendiente = () => {
        setMostrar_pendiente(true);
        setMostrar_proceso(false);
        setMostrar_cancelado(false);
        setMostrar_falsa(false);
        setMostrar_aprobado(false);
      }
      //handle para mostrar las peticiones en proceso
      const handleMostrar_proceso = () => {
        setMostrar_proceso(true);
        setMostrar_pendiente(false);
        setMostrar_cancelado(false);
        setMostrar_falsa(false);
        setMostrar_aprobado(false);
      }
      //handle para mostrar las peticiones canceladas
      const handleMostrar_cancelado = () => {
        setMostrar_cancelado(true);
        setMostrar_pendiente(false);
        setMostrar_proceso(false);
        setMostrar_falsa(false);
        setMostrar_aprobado(false);
      }
      //handle para mostrar las peticiones falsas
      const handleMostrar_falsa = () => {
        setMostrar_falsa(true);
        setMostrar_pendiente(false);
        setMostrar_proceso(false);
        setMostrar_cancelado(false);
        setMostrar_aprobado(false);
      }
      //handle para mostrar las peticiones aprobadas
      const handleMostrar_aprobado = () => {
        setMostrar_aprobado(true);
        setMostrar_pendiente(false);
        setMostrar_proceso(false);
        setMostrar_cancelado(false);
        setMostrar_falsa(false);
      }
      
      useEffect(() => {
        if (idusuario) {
          axios.get(`/api/peticiones/obtener_historial_pendiente/${idusuario}`).then(res => {
        
            setHistorialp(res.data);
          }).catch(err => console.log(err));
          axios.get(`/api/peticiones/obtener_historial_en_proceso/${idusuario}`).then(res => {
           
            setHistorialpr(res.data);
          }).catch(err => console.log(err));
          axios.get(`/api/peticiones/obtener_historial_cancelado/${idusuario}`).then(res => {
  
            setHistorialc(res.data);
          }).catch(err => console.log(err));
          axios.get(`/api/peticiones/obtener_historial_falsas/${idusuario}`).then(res => {
           
            setHistorialf(res.data);
          }).catch(err => console.log(err));
          axios.get(`/api/peticiones/obtener_historial_aceptado/${idusuario}`).then(res => {
       
            setHistoriala(res.data);
          }).catch(err => console.log(err));
        }

      }, [idusuario]);
      const lista_solicitudes_pendiente = datahistorialp.map((usuario) => {
        return (
          <div>
             <Peticiones_individual peticiones={usuario}/>
            
          </div>

        )
      })
      const lista_solicitudes_proceso = datahistorialpr.map((usuario) => {
        return (
          <div>
             <Peticiones_individual peticiones={usuario}/>
            
          </div>

        )
      })
      const lista_solicitudes_cancelado = datahistorialc.map((usuario) => {
        return (
          <div>
             <Peticiones_individual peticiones={usuario}/>
            
          </div>

        )
      })
      const lista_solicitudes_falsa = datahistorialf.map((usuario) => {
        return (
          <div>
             <Peticiones_individual peticiones={usuario}/>
            
          </div>

        )
      })
      const lista_solicitudes_aprobado = datahistoriala.map((usuario) => {
        return (
          <div>
             <Peticiones_individual peticiones={usuario}/>
            
          </div>

        )
      })

  return (
    <div>
       <div>
        <nav className="navegacion_historial_solicitudes">
             <div className='pl-4 my-2 '>
             <a className="flex items-center ">
                 <img src={require('../../Images/Hi_inge.png')} className="w-20 h-20	" />
                 <span className="self-center text-2xl font-semibold whitespace-nowrap dark:text-black esconder_opciones">Solicitudes</span>
                
                 <a href="/" className=" esconder_opciones boton_ir_inicio">Inicio</a>
                <a href="/Hacer_solicitud" className=" esconder_opciones boton_hacer_solicitud">Hacer solicitud</a>


                 <button type='button'  className=" esconder " onClick={() => setIsOpen(!isOpen)}>
                    {!isOpen &&(
                       <BsCaretDownSquareFill className='icon_desplazar_solicitudes'/>
                    )}
                    {isOpen &&(
                        <BsCaretUpSquareFill className='icon_desplazar_solicitudes'/>
                    )}
                 </button>
                 {isOpen && (
                  <div className=" esconder dropdown-container">
                    <ul className="dropdown-menu_solicitudes">

                      <li className='opciones_drop_inicio'><a href='/'>Inicio</a></li>
                      <li className='opciones_drop_inicio'><a href='/Hacer_solicitud'>Hacer solicitud</a></li>
                    </ul>
                  </div>
                )}
           
             </a>
             </div>
           
               <div >
                <button className='m-8'onClick={() => setUserOpen(!userOpen)} ><FaUserCircle className='icon_desplazar_solicitudes'/></button>
               
               {userOpen && (
                  <div className="dropdown-user">
                    <div className="dropdown-menu-user_solicitudes">
                         <button className='boton_cerrar'  onClick={handleLogout}><GoSignOut/> </button>
                    </div>
                  </div>
                )}
              
               </div>
           </nav>
       </div>
       <div>
           <div className='border-b-4 border-green-500' style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                <h1 className='gugi text-stone-950 pt-2 pb-2 text-3xl'>Historial de solicitudes</h1>
           </div>
         
           <div className='' style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
           <button class="boton_select" onClick={handleMostrar_aprobado }>
            <FontAwesomeIcon icon={faClipboardCheck} className='text-2xl'/>
          </button>
          <button class="boton_select_proceso" onClick={handleMostrar_proceso}>
            <FontAwesomeIcon icon={faBusinessTime} className='text-2xl'/>
          </button>
          <button class="boton_select_pendiente" onClick={handleMostrar_pendiente}>
            <FontAwesomeIcon icon={faHand} className='text-2xl'/>
          </button>
          <button class="boton_select_cancelado" onClick={handleMostrar_cancelado}>
            <FontAwesomeIcon icon={faBan} className='text-2xl'/>
          </button>
          <button class="boton_select_falsa" onClick={handleMostrar_falsa}>
            <FontAwesomeIcon icon={faClone} className='text-2xl'/>
          </button>
           </div>
      
       </div>
      
       <div className='contenedor_lista_peticiones'style={{ flexWrap: 'wrap' }}  >
      
       {datahistorialp.length === 0 && mostrar_pendiente &&  (
              <div className='flex flex-col' style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
             <FontAwesomeIcon icon={faFile} bounce className="text-blue-500 text-8xl mt-40" />
          
             <h3 className=' font-thin mt-2'>No tiene solicitudes pendientes todavia </h3>
              </div>
       )}

        {datahistorialpr.length === 0 && mostrar_proceso &&  (
            <div className='flex flex-col' style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
            <FontAwesomeIcon icon={faFile} bounce className="text-orange-500 text-8xl mt-40" />

            <h3 className=' font-thin mt-2'>No tiene solicitudes en proceso todavia </h3>
              </div>
          )}

        {datahistorialc.length === 0 && mostrar_cancelado &&  (
          <div className='flex flex-col' style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
          <FontAwesomeIcon icon={faFile} bounce className="text-red-500 text-8xl mt-40" />

          <h3 className=' font-thin mt-2'>No tiene solicitudes canceladas todavia </h3>
            </div>
          )}
        {datahistorialf.length === 0 && mostrar_falsa &&  (
          <div className='flex flex-col' style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
          <FontAwesomeIcon icon={faFile} bounce className="text-gray-500 text-8xl mt-40" />

          <h3 className=' font-thin mt-2'>No tiene solicitudes falsas todavia </h3>
            </div>
          )}
        {datahistoriala.length === 0 && mostrar_aprobado &&  (
          <div className='flex flex-col' style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
          <FontAwesomeIcon icon={faFile} bounce className="text-gray-500 text-8xl mt-40" />

          <h3 className=' font-thin mt-2'>No tiene solicitudes aprobadas todavia </h3>
            </div>
          )}


        {mostrar_pendiente && (
          
            lista_solicitudes_pendiente
          
        )}
        {mostrar_proceso && (
          
            lista_solicitudes_proceso
        
        )}
        {mostrar_cancelado && (
          
            lista_solicitudes_cancelado
        
        )}
        {mostrar_falsa && (
     
            lista_solicitudes_falsa
         
        )}
        {mostrar_aprobado && (
      
            lista_solicitudes_aprobado
        
        )}

       </div>
      

    </div>
  )
}

export default Historial_solicitudes