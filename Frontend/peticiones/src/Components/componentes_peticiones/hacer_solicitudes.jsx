import React from 'react'
import { useEffect } from 'react';
import axios from 'axios';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../../css/hacer_solicitud.css'
import Administradores from './lista_ing_tec';
//icons
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faHandPointLeft } from '@fortawesome/free-solid-svg-icons'
import { faHandPointRight } from '@fortawesome/free-solid-svg-icons'
import { faPaperPlane } from '@fortawesome/free-solid-svg-icons'



import shortid from 'shortid';
// Componente separado para el Carousel
function Carousel({ children,mandarpeticion }) {
  const [active, setActive] = useState(0);
  const count = React.Children.count(children);
  const MAX_VISIBILITY = 2;
  const handleNext = () => {
    if (active < count - 1) {
      setActive(active + 1);
    }
  };

  const handlePrev = () => {
    if (active > 0) {
      setActive(active - 1);
    }
  };

  return (
    <div className="carousel">
      {children.map((child, i) => (
        <div key={i}
          className="card-container"
          style={{
            '--active': i === active ? 1 : 0,
            '--offset': (active - i) / 3,
            '--direction': Math.sign(active - i),
            '--abs-offset': Math.abs(active - i) / 3,
            opacity: Math.abs(active - i) >= MAX_VISIBILITY ? '0' : '1',
            display: Math.abs(active - i) > MAX_VISIBILITY ? 'none' : 'block',

          }}
        >
          {child}
        </div>
      ))}
      <div className="button-container">
        {active > 0 && (
          <button className="nav left" onClick={handlePrev}>
           
            <FontAwesomeIcon icon={faHandPointLeft} beat style={{color: "#eac50b",}} />
          </button>
        )}
        {active < count - 1 ? (
          <button className="nav right" onClick={handleNext}>
        
           <FontAwesomeIcon icon={faHandPointRight} beat style={{color: "#eac50b",}} />
          </button>
        ) : (
          <button className="nav right " onClick={mandarpeticion} >
           
            <FontAwesomeIcon icon={faPaperPlane} shake style={{color: "#57e854",}} />
          </button>
        )}
      </div>
    </div>
  );
}

function Hacer_solicitud() {
    const [nombre, setNombre] = useState('')
    const [apellido, setApellido] = useState('')
    const [problema, setProblema] = useState([])
    const [lugar, setLugar] = useState('')
    const [imagen, setImagen] = useState(null)
    const [descripcion, setDescripcion] = useState('')
    const [idusuario, setIdusuario] = useState('')
    const [showModal, setShowModal] = useState(false);
    const [selectedOption, setSelectedOption] = useState("");
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [enviado, setEnviado] = useState(false);
    const navigate = useNavigate();
    const [dataadmin, setdataadmin] = useState([])
    const [idUsuarioSeleccionado, setIdUsuarioSeleccionado] = useState(null);
    const campos = [];
    const Swal = require('sweetalert2')

    
    const handleProblemaChange = (event) => {
      console.log('entra');
      const selectedProblema = event.target.value;
      setSelectedOption(event.target.value);
      setProblema([selectedProblema]);
      setShowModal(true);
    };
    const handleImagenChange = (event) => {
      const file = event.target.files[0];
      setImagen(file);
    };
    //handle para la segunda opcion 
    const handleProblemaChange2 = (event) => {
      const selectedProblema = event.target.value;
    
      setProblema(prevProblema => {
        // Verificar si el arreglo tiene al menos dos elementos
        if (prevProblema.length >= 2) {
          return [prevProblema[0], selectedProblema]; // Reemplazar solo el segundo elemento
        } else {
          return prevProblema.concat(selectedProblema); // Agregar el nuevo valor si el arreglo tiene menos de dos elementos
        }
      });
      
    };
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
        if (idusuario) {
          axios.get(`/api/usuario/Obtener_Admins`).then(res => {
        
            setdataadmin(res.data);
          }).catch(err => console.log(err));
        }
      }, [idusuario]);
   
    function mandarpeticion() {
    
      const campos = new Set();
      console.log(campos);
      if (problema.length === 0) {
        campos.add('El problema no está seleccionado');
      }
      if(problema.includes("Computador (Impresora)") && selectedOption=="?"){
        campos.add('El problema detallado no está seleccionado');
      }
      if(idUsuarioSeleccionado==null){
        campos.add('No selecciono un tecnico o ingeniero');
      }
      if (nombre === '') {
        campos.add('El nombre está vacío');
      } else {
        if (nombre.length < 3) {
          campos.add('El nombre debe tener al menos 3 caracteres');
        }
        if (nombre.includes('@')) {
          campos.add('El nombre no debe contener el carácter @');
        }
        if (!/^[A-Za-z]+$/.test(nombre)) {
          campos.add('El nombre solo debe contener letras');
        }
      }

      if (apellido === '') {
        campos.add('El apellido está vacío');
      } else {
        if (apellido.length < 3) {
          campos.add('El apellido debe tener al menos 3 caracteres');
        }
        if (apellido.includes('@')) {
          campos.add('El apellido no debe contener el carácter @');
        }
        if (!/^[A-Za-z]+$/.test(apellido)) {
          campos.add('El apellido solo debe contener letras');
        }
      }

  

      if (lugar === '') {
        campos.add('No ingresó el lugar');
      } else {
        if (lugar.length < 5) {
          campos.add('El lugar debe tener al menos 5 caracteres');
        }
      }

      if (descripcion === '') {
        campos.add('No ingresó la descripción');
      } else {
        if (descripcion.length < 10) {
          campos.add('La descripción debe tener al menos 10 caracteres');
        }
      }

      if (campos.size > 0) {
        Swal.fire({
          icon: 'error',
          title: 'No se pudo enviar la petición',
          text: 'Por favor, verifica los siguientes campos:',
          html: '<ul>' + [...campos].map(campo => `<li>${campo}</li>`).join('') + '</ul>'
        });
        return;
      }
    
      var mandar_peticion = {
        nombre: nombre,
        apellido: apellido,
        problema: problema,
        lugar: lugar,
        imagen: imagen,
        descripcion: descripcion,
        idusuario:idusuario,
        idpeticion:shortid.generate(),
        idencargado:idUsuarioSeleccionado

      } 
      

        // Obtener el token de autenticación del localStorage o de donde se almacene
      const token = localStorage.getItem('token');

      // Hacer una solicitud GET para obtener el ID de usuario
      axios.get('/api/usuario/ruta-protegida', {
        headers: {
          Authorization: token
        }
      })
      .then(response => {
       
        console.log(idusuario);
        // Realizar la solicitud de petición con el ID de usuario
        axios.post('/api/peticiones/mandar-peticion', mandar_peticion, {
          headers: {
            Authorization: token,
            'Content-Type': 'multipart/form-data' // Especificar el tipo de contenido como multipart/form-data
          }
        })
          .then(res => {
            console.log('peticion enviada');
            setEnviado(true);
          })
          .catch(err => {
            console.log(err);
          });
      })
      .catch(error => {
        navigate('/inicio_sesion');
      });
    }
    useEffect(() => {
      console.log(problema);
    }, [problema]);
    
  const handleSelectAdmin = (adminId) => {
    // Almacena el idusuario seleccionado en el estado
    setIdUsuarioSeleccionado(adminId);
    console.log(idUsuarioSeleccionado);

  };

    useEffect(() => {
      console.log(enviado);
    }, [enviado]);
    return (
      <div className="fondo">
          <h1 className="gugi text-stone-950 pt-2 pb-10 text-3xl -mt-40" style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
            Solicitar ayuda
          </h1>
          <img width="64" height="64" src="https://img.icons8.com/cotton/64/petition.png" alt="petition" className='mb-3 -mt-3'/>
          <h1 className="gugi text-stone-950 pt-2 pb-10 text-2xl " style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
            Complete el formulario
          </h1>
          <Carousel mandarpeticion={mandarpeticion}  >
           <div className="card">
              <input 
              id="name"
              className={`flex flex-col mr-4 rounded border-2 p-2.5 text-black w-full mb-4 placeholder-dark 
                
             
            ${campos.includes('nombre') ? 'border-red-500' : 'border-stone-800'}`}
            
              
              placeholder="Nombre"
              value={nombre}
              onChange={(e) => setNombre(e.target.value)}
              />
              <input
              id="apellido"
              className={`rounded border-2 p-2.5  text-black	w-full mb-4 placeholder-dark  border-stone-800`}
              placeholder="Apellidos"
              required
              value={apellido}
              onChange={(e) => setApellido(e.target.value)}

              />
              <h2 className='ml-3'>¿Cual es el problema?</h2>
               <select
                id="problema"
                className={`rounded-md border-2 p-2.5 text-black w-full mb-4 placeholder-dark border-stone-800
                `}
                value={selectedOption}
                onChange={handleProblemaChange} 
                >
                    <option value="ninguno">Selecciona una opcion</option>
                    <option value="Computador (Impresora)">Computador (Impresoras)</option>
                    <option value="Software(Software,Internet)">Software (Software, Internet) </option>
                </select>
                <h2 className='ml-3'>Problema seleccionado: {selectedOption}</h2>
            </div>
            <div className="card1">
              <h2>Image del problema (Opcional)</h2>
              <input className="rounded border-2 p-2.5 text-black w-full mb-4 placeholder-dark border-stone-800" id="file_input" type="file"
            accept="image/*"
             onChange={handleImagenChange}
            />
                
                <h2> ¿Donde se encuentra?</h2>
          <input 
              id="lugar"
              className={`flex flex-col mr-4 rounded border-2 p-2.5 text-black w-full mb-4 placeholder-dark  border-stone-800  `}
              placeholder="Lugar"
              value={lugar}
              onChange={(e) => setLugar(e.target.value)}
              />

             <h2>Descripcion del problema</h2>
             <textarea
            type="Description"
          
            className={`rounded-md border-2 p-2.5  text-black	w-full mb-4 placeholder-dark border-stone-800 `}
            placeholder='Describe aqui tu problema con mas detalle...'
            required
            value={descripcion}
            onChange={(e) => setDescripcion(e.target.value)}

          
          />
       
            </div>
            <div className="card2" style={{ maxHeight: '400px', overflowY: 'auto' }}>
            <h2 className="text-stone-950 pt-2 pb-2 text-center">Elige al ingeniero o técnico:</h2>
            {dataadmin.map((usuario, index) => (
              <div key={index}>
                <Administradores Admin={usuario} onSelect={handleSelectAdmin} />
              </div>
            ))}
           
          </div>

            {/* Puedes seguir agregando más cartas aquí */}
          </Carousel>
          
          {problema.includes("Computador (Impresora)") && showModal==true && (
          
          <div className="flex justify-center items-center overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none rounded-lg">
            <div className="rounded-lg border-2 border-black shadow-2xl shadow-cyan-500/50 sm:w-1/2 md:w-1/3 lg:w-1/3 xl:w-1/2 2xl:w-1/3 max-h-screen bg-gray-50 flex flex-col overflow-y-auto">
              <h1 className="gugi text-red-700  text-3xl mt-10" style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                Seleccione detalle del problema:
              </h1>
              <div className="sm:text-2xl md:text-2xl lg:text-2xl xl:text-2xl 2xl:text-2xl" style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                <select
                  id="problema-2"
                  className="rounded-md border-2 p-2.5 text-black w-1/2 mb-4 placeholder-dark border-stone-800"
                  onChange={handleProblemaChange2}
                >
                  <option value="?">Selecciona una opción</option>
                  <option value="Teclado/Mouse">Teclado/Mouse</option>
                  <option value="Pantalla">Pantalla</option>
                  <option value="No enciende">No enciende</option>
                  <option value="Esta lento">Esta lento</option>
                  <option value="Otro Problema">Otro Problema</option>
                </select>
              </div>
              <div className="sm:text-2xl md:text-2xl lg:text-2xl xl:text-2xl 2xl:text-2xl" style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                <button
                  type="button"
                  className="focus:outline-none text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:ring-green-300 font-medium rounded-lg text-sm px-3 py-2.5 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800 mb-4"
                  onClick={() => setShowModal(false)}
                >
                  Aceptar
                </button>
              </div>
            </div>
          </div>
        )}
       
      </div>
    );
}

export default Hacer_solicitud