
import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { useState } from 'react';
import { Navigate } from 'react-router-dom';
import Registrar from './Components/registrar';
import Iniciar_sesion from './Components/inicio_sesion';
import Principal from './Components/Principal';
import Hacer_solicitud from './Components/componentes_peticiones/hacer_solicitudes';
import Historial_solicitudes from './Components/componentes_peticiones/historial_solicitudes';
import Ver_solicitudes from './Components/componentes_peticiones/ver_solicitudes';
import Solicitudes_aceptadas from './Components/componentes_peticiones/peticiones_aceptadas';
import Solicitudes_proceso from './Components/componentes_peticiones/peticiones_proceso';
import Solicitudes_rechazadas from './Components/componentes_peticiones/peticiones_rechazadas';
import Solicitudes_falsas from './Components/componentes_peticiones/peticiones_falsas';

function App() {
 
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  return (
    <div>
      <BrowserRouter>
       <Routes>
       <Route path="/" element={<Principal />} exact ></Route>
       <Route path="*" element={<Navigate to="/" replace />} />
        <Route path="/registro" element={<Registrar />} exact ></Route>
        <Route path="/inicio_sesion" element={<Iniciar_sesion setIsLoggedIn={setIsLoggedIn}/>} exact></Route>
        <Route path="/Hacer_solicitud" element={<Hacer_solicitud />} exact></Route>
        <Route path='/lista_peticiones' element={<Historial_solicitudes/>} exact></Route>
        <Route path='/ver_solicitudes' element={<Ver_solicitudes/>} exact></Route>
        <Route path='/peticiones_aceptadas' element={<Solicitudes_aceptadas/>} exact></Route>
        <Route path='/peticiones_proceso' element={<Solicitudes_proceso/>} exact></Route>
        <Route path='/peticiones_rechazadas' element={<Solicitudes_rechazadas/>} exact></Route>
        <Route path='/peticiones_falsas' element={<Solicitudes_falsas/>} exact></Route>
     
       </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
