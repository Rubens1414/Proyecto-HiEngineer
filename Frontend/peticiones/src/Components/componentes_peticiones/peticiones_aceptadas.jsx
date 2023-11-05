import React from 'react'
import { useEffect } from 'react';
import axios from 'axios';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Peticiones_aceptadas_ind from './peticiones_ind_a';
import '../../css/Principal.css'
import '../../css/Ver_solicitudes.css'
import '../../css/solicitudes_completadas.css'
//icons
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import { faFile } from '@fortawesome/free-solid-svg-icons'


import {BsCaretDownSquareFill} from 'react-icons/bs';
import {BsCaretUpSquareFill} from 'react-icons/bs'
import {FaUserCircle} from 'react-icons/fa'
import {GoSignOut} from 'react-icons/go'

function Peticiones_aceptadas() {
    const [tipo_user, setTipo_user] = useState('no registrado');
    const [datapeticiones, setPeticiones] = useState([])
    const [idusuario, setIdusuario] = useState('')
    const navegate = useNavigate();
    const [isOpen, setIsOpen] = useState(false);
    const [userOpen, setUserOpen] = useState(false);
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
  
  
          
            setTipo_user(() => (response.data.admin ? 'admin' : 'usuario'));
  
            
          
          })
          .catch(error => {
            console.log('Acceso no autorizado'); // El token no es válido o el usuario no está autenticado
            setTipo_user('no registrado');
          });
         
  
      } 
    }, []);
    useEffect(() => {
  
      function handleClickOutside(event) {
        const container = document.querySelector('.dropdown-container');
        const button = document.querySelector('.icon_desplazar_solicitudes_a');
        const container2 = document.querySelector('.dropdown-user');
        const button2 = document.querySelector('.icon_desplazar_solicitudes_a');
    
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
    
    if (tipo_user === 'no registrado') {
      navegate('/inicio_sesion');
    }
    if (tipo_user === 'usuario') {
      navegate('/peticiones');
    }
    const handleLogout = () => {
      localStorage.removeItem('token');
      window.location.reload();
    };
  
    useEffect(() => {
      if (idusuario) {
        axios.get(`/api/peticiones/obtener_solicitudes_aceptadas`).then(res => {
      
          setPeticiones(res.data);
        }).catch(err => console.log(err));
      }
    }, [idusuario]);
    const lista_peticiones = datapeticiones.map((usuario) => {
      return (
        <div>
           <Peticiones_aceptadas_ind peticiones={usuario}/>
        </div>
      )
    })
    return (
      <div>
          <div>
        <nav className="navegacion_solicitudes_completas">
             <div className='pl-4 my-2 '>
             <a className="flex items-center ">
                 <img src={require('../../Images/Hi_inge.png')} className="w-20 h-20	" />
                 <span className="self-center text-2xl font-semibold whitespace-nowrap dark:text-black esconder_opciones">Solicitudes</span>
                
                 <a href="/" className=" esconder_opciones boton_ir_inicio">Inicio</a>
                 <a href="/ver_solicitudes" className=" esconder_opciones boton_solicitudes_pendientes">Solicitudes Pendientes</a>
                  <a href="/peticiones_proceso" className=" esconder_opciones boton_solicitudes_en_proceso">Solicitudes en proceso</a>
                  <a href="/peticiones_rechazadas" className=" esconder_opciones boton_solicitudes_canceladas">Solicitudes rechazadas</a>
                  <a href="/peticiones_falsas" className=" esconder_opciones boton_solicitudes_falsas">Solicitudes falsas</a>

                 <button type='button'  className=" esconder " onClick={() => setIsOpen(!isOpen)}>
                    {!isOpen &&(
                       <BsCaretDownSquareFill className='icon_desplazar_solicitudes_a'/>
                    )}
                    {isOpen &&(
                        <BsCaretUpSquareFill className='icon_desplazar_solicitudes_a'/>
                    )}
                 </button>
                 {isOpen && (
                  <div className=" esconder dropdown-container">
                    <ul className="dropdown-menu_completas">

                      <li className='opciones_drop_inicio_c'><a href='/'>Inicio</a></li>
                      <li className='opciones_drop_s_p'><a href='/ver_solicitudes'>Solicitudes Pendientes</a></li>
                      <li className='opciones_drop_en_proceso'><a href='/peticiones_proceso'>Solicitudes en proceso </a></li>
                      <li className='opciones_drop_rechazadas'><a href='/peticiones_rechazadas'>Solicitudes rechazadas </a></li>
                      <li className='opciones_drop_falsas'><a href='/peticiones_falsas'>Solicitudes falsas </a></li>
                      
                    </ul>
                  </div>
                )}
           
             </a>
             </div>
           
               <div >
                <button className='m-8'onClick={() => setUserOpen(!userOpen)} ><FaUserCircle className='icon_desplazar_solicitudes_a'/></button>
               
               {userOpen && (
                  <div className="dropdown-user">
                    <div className="dropdown-menu-user_completas">
                         <button className='boton_cerrar'  onClick={handleLogout}><GoSignOut/> </button>
                    </div>
                  </div>
                )}
              
               </div>
           </nav>
       
       <div>
           <div className='border-b-4 border-green-500' style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                <h1 className='gugi text-stone-950 pt-2 pb-2 text-3xl'>Solicitudes Completas</h1>
           </div>
         
           
       </div>
     
       {datapeticiones.length === 0 && (
              <div className='flex flex-col' style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
             <FontAwesomeIcon icon={faFile} bounce className="text-green-500 text-8xl mt-40" />
          
             <h3 className=' font-thin mt-2'>No hay solicitudes completadas</h3>
              </div>
       )}
       </div>
       <div className='contenedor_lista_peticiones'style={{ flexWrap: 'wrap' }} >
        {lista_peticiones}
       </div>
        
      </div>
    )
}

export default Peticiones_aceptadas