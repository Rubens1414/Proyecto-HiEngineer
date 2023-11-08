import React from 'react'
import { useEffect } from 'react';
import axios from 'axios';
import { useState } from 'react';
import '../css/Principal.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import Notificaciones from './notificaciones_ind';
import Notificaciones_admin from './notificaciones_ind_admin';


//icons
import { FaRegUser } from 'react-icons/fa';
import { HiLogin } from 'react-icons/hi';
import {BsCaretDownSquareFill} from 'react-icons/bs';
import {BsCaretUpSquareFill} from 'react-icons/bs'
import {FaUserCircle} from 'react-icons/fa'
import {GoSignOut} from 'react-icons/go'
import {faBell} from '@fortawesome/free-solid-svg-icons'
import {faHourglass} from '@fortawesome/free-solid-svg-icons'
function Principal() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);
  const [cambioFondo, setCambioFondo] = useState('fondo_iniciar');
  const [isOpen, setIsOpen] = useState(false);
  const [notiOpen, setnotiOpen] = useState(false);
  const [userOpen, setUserOpen] = useState(false);
  const [idusuario, setIdusuario] = useState('')
  const [datanoti, setdatanoti] = useState([])

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
          setIdusuario(response.data.userId);

          setIsLoggedIn(true);
          response.data.admin ? setIsAdmin(true) : setIsAdmin(false);
          response.data.admin ? setCambioFondo('fondo_admin') : setCambioFondo('fondo_user');
         
        })
        .catch(error => {
          console.log('Acceso no autorizado'); // El token no es válido o el usuario no está autenticado
          setIsLoggedIn(false);
        });
    } else {
      setIsLoggedIn(false);
    }
  }, []);

  //obtener notificaciones
  useEffect(() => {
    if (idusuario) {
      axios.get(`/api/notificaciones/obtener-notificaciones/${idusuario}`).then(res => {
    
        setdatanoti(res.data);
      }).catch(err => console.log(err));
    }
  }, [idusuario]);
  //useEffect para usuario
  useEffect(() => {
    function handleClickOutside(event) {
      const container = document.querySelector('.dropdown-container');
      const button = document.querySelector('.icon_desplazar');
      const container2 = document.querySelector('.dropdown-user');
      const button2 = document.querySelector('.icon_desplazar');
  
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
  //useEffect para notificaciones
  useEffect(() => {
    function handleClickOutside(event) {
      const container = document.querySelector('.dropdown-container');
      const button = document.querySelector('.icon_desplazar');
      const container2 = document.querySelector('.dropdown-user-noti');
      const button2 = document.querySelector('.icon_desplazar');

      if (isOpen && !container.contains(event.target) && event.target !== button) {
        setIsOpen(false);
      }
      if (notiOpen && !container2.contains(event.target) && event.target !== button2) {
        setnotiOpen(false);
      }
    }

    document.addEventListener('mousedown', handleClickOutside);

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen, notiOpen]);

  
  
  const handleLogout = () => {
    localStorage.removeItem('token');
    window.location.reload();
  };
  

  return (
    <div className={cambioFondo} >
      
      <div>
          {isLoggedIn===false && (
            <div>
       
            <nav className="navegacion_sin_inicio">
              <div className='pl-2 my-2 '>
              <a href="" className="flex items-center">
                          <img src={require('../Images/Hi_inge.png')} className="w-20 h-20	" />
                          <span className="self-center text-2xl font-semibold whitespace-nowrap dark:text-black">Hi Engineer</span>
                 </a>
              </div>
              <ul className="m-8">
                <li className='boton_inicio_nav '>
                  <a href="/inicio_sesion" className="" >    <span style={{ display: 'flex', alignItems: 'center' }}>
                  <FaRegUser style={{ marginRight: '5px' }}/>
                  <HiLogin style={{ marginRight: '5px' }}/> 
                  <span className='texto'> Iniciar sesión</span>
                </span></a>
                </li>
              </ul>
            </nav>
            </div>
          
          )}
          {isLoggedIn===true && isAdmin==true && ( 
           
            <div>
                   <nav className="navegacion_admin">
              <div className='pl-4 my-2 '>
              <a  className="flex items-center ">
                <img src={require('../Images/Hi_inge.png')} className="w-20 h-20	" />
                <span className="self-center text-2xl font-semibold whitespace-nowrap dark:text-black esconder_opciones">Hi Admin</span>
              
                <a href="/ver_solicitudes" className="esconder_opciones boton_solicitudes_pend">Solicitudes Pendientes</a>
                <a href="/peticiones_aceptadas" className="esconder_opciones boton_solicitudes_realizadas">Solicitudes Completadas </a>
                <a href="/peticiones_proceso" className="esconder_opciones boton_solicitudes_en_proceso">Solicitudes en proceso </a>
                <a href="/peticiones_rechazadas" className="esconder_opciones boton_solicitudes_canceladas">Solicitudes Rechazadas </a>
                <a href="/peticiones_falsas" className="esconder_opciones boton_solicitudes_falsas">Solicitudes Falsas </a>
                  <button type='button'  className="esconder " onClick={() => setIsOpen(!isOpen)}>
                    {!isOpen &&(
                       <BsCaretDownSquareFill className='icon_desplazar_admin'/>
                    )}
                    {isOpen &&(
                        <BsCaretUpSquareFill className='icon_desplazar_admin'/>
                    )}
                 </button>
                 {isOpen && (
                  <div className=" esconder dropdown-container">
                    <ul className="dropdown-menu">
      
                      <li className='opciones_drop_solicitudes_pend'><a href='/ver_solicitudes'>Solicitudes Pendientes</a></li>
                      <li className='opciones_drop_completadas'><a href='/peticiones_aceptadas'>Solicitudes Completadas </a></li>
                      <li className='opciones_drop_en_proceso'><a href='/peticiones_proceso'>Solicitudes en proceso </a></li>
                      <li className='opciones_drop_rechazadas'><a href='/peticiones_rechazadas'>Solicitudes Rechazadas </a></li>
                      <li className='opciones_drop_falsas'><a href='/peticiones_falsas'>Solicitudes Falsas </a></li>
                      <li className='opciones_drop_registrar_user'><a href='/registro'>Registrar Usuario</a></li>
                    </ul>
                  </div>
                )}
              </a>
              </div>
                <div className='flex flex-row'>
                <a href="" className="flex items-center  ">
                     <a href="/registro" className="esconder_opciones boton_registrar_usuarios">Registrar Usuario</a>
                     </a>
                    
               <div >
               <button className='my-8 mx-2'onClick={() => setnotiOpen(!notiOpen)} ><FontAwesomeIcon icon={faBell} className='icon_desplazar_admin' /></button>
                <button className='my-8'onClick={() => setUserOpen(!userOpen)} ><FaUserCircle className='icon_desplazar_admin'/></button>
               
               {userOpen && (
                  <div className="dropdown-user">
                    <div className="dropdown-menu-user">
                         <button className='boton_cerrar'  onClick={handleLogout}><GoSignOut/> </button>
                    </div>
                  </div>
                )}
                  {notiOpen && (
                  <div className="dropdown-user-noti" >
                    <div className="dropdown-menu-noti">
                    {datanoti.map((usuario, index) => (
                      <div key={index}>
                        <Notificaciones_admin notificacion={usuario}  />
                      </div>
                    ))}
                    </div>
                  </div>
                )}
              
               </div>
                </div>
            </nav>
            </div>
       )}
        {isLoggedIn===true && isAdmin==false && (
           <div>
           <nav className="navegacion_inicio">
             <div className='pl-4 my-2 '>
             <a className="flex items-center ">
                 <img src={require('../Images/Hi_inge.png')} className="w-20 h-20	" />
                 <span className="self-center text-2xl font-semibold whitespace-nowrap dark:text-black esconder_opciones">Hi Engineer</span>
                
                 <a href="/Hacer_solicitud" className=" esconder_opciones boton_hacer_solicitud">Hacer una solicitud</a>
                 <a href="/lista_peticiones" className=" esconder_opciones boton_historial">Historial de peticiones</a>

                 <button type='button'  className=" esconder " onClick={() => setIsOpen(!isOpen)}>
                    {!isOpen &&(
                       <BsCaretDownSquareFill className='icon_desplazar'/>
                    )}
                    {isOpen &&(
                        <BsCaretUpSquareFill className='icon_desplazar'/>
                    )}
                 </button>
                 {isOpen && (
                  <div className=" esconder dropdown-container">
                    <ul className="dropdown-menu">
      
                      <li className='opciones_drop_solicitud'><a href='/peticiones'>Hacer una solicitud</a></li>
                      <li className='opciones_drop_historial'><a href='/lista_peticiones'>Historial de peticiones</a></li>
                      
                    </ul>
                  </div>
                )}
           
             </a>
         
             </div>
           
               <div >
                <button className='my-8 mx-2'onClick={() => setnotiOpen(!notiOpen)} ><FontAwesomeIcon icon={faBell} className='icon_desplazar' /></button>
                <button className='my-8'onClick={() => setUserOpen(!userOpen)} ><FaUserCircle className='icon_desplazar'/></button>
               {userOpen && (
                  <div className="dropdown-user">
                    <div className="dropdown-menu-user">
                         <button className='boton_cerrar'  onClick={handleLogout}><GoSignOut/> </button>
                    </div>
                  </div>
                )}
                {notiOpen && (
                  <div className="dropdown-user-noti" >
                    <div className="dropdown-menu-noti">
                    {datanoti.map((usuario, index) => (
                 
                        <div key={index}>
                        <Notificaciones notificacion={usuario}  />
                      </div>
                      

                     
                      
                      
                    ))}

                    {datanoti.length==0 &&(
                      <div className="text-center">
     
                      <div className="mt-4">
                        <div className="bg-white shadow-md rounded-lg p-4 w-full max-w-xl mx-auto">
                         <FontAwesomeIcon icon={faHourglass} style={{color: "#fae500",}} />
                          <h2 className="text-xl font-semibold mb-2"> No hay notificaciones</h2>
                         
                        </div>
                      </div>
                    </div>
                    )}
                  
                    </div>
                  </div>
                )}
              
               </div>
             
               
               
           
           </nav>
           </div>
      )}
  
      </div>
      <div className='m-8  flex flex-col 'style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
              <img src={require('../Images/Hi_inge.png')} />
               <div>
               <h1 className='text-4xl font-bold'>¡Bienvenido a Hi Engineer!</h1>
              </div>
        </div>
    </div>
  )
}

export default Principal
