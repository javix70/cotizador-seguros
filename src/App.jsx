import React, { useState } from 'react';
import Header from './components/Header';
import Formulario from './components/Formulario';

import styled from '@emotion/styled'
import Resumen from './components/Resumen';
import Resultado from './components/Resultado';
import Spinner from './components/Spinner';

const Contenedor = styled.div`
  max-width: 600px;
  margin: 0 auto;
  `
const ContendeorFormulario = styled.div`
  background-color: #FFF;
  padding: 3rem;
  `

function App() {
  const [resumen, setResumen] = useState({
    cotizacion: 0,
    datos:{
      marca: '',
      year:'',
      plan:''
    }
  })

  const [cargando, setCargando] = useState(false)
  //extraer datos
  const { datos, cotizacion } = resumen
  return (
    <Contenedor>
      <Header
        titulo='Cotizador de seguros'
      />      
      <ContendeorFormulario>
        <Formulario
          setResumen={setResumen}
          setCargando={setCargando}
        />
        {cargando ? <Spinner/> : null}
        
        <Resumen
          datos={datos}
        />
        {!cargando ?  
        <Resultado
          cotizacion={cotizacion}
        /> : null}
       
      </ContendeorFormulario>
    </Contenedor>
  );
}

export default App;
