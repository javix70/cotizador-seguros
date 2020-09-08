import React, { useState } from 'react'
import styled from '@emotion/styled'
import { calcularMarca, obtenerDiferenciaYear, calcularPlan } from '../helper'

const Campo = styled.div`
    display: block;
    margin-bottom: 1rem;
    align-items: center;
`
const Label = styled.label`
    margin-top:1rem;
`
const Select = styled.select`
    width: 100%;
    padding: 1rem;
    border: 1px solid #e1e1e1;
    -webkit-appearance: none;
  `
const InputRadio = styled.input`
  margin: 1rem 1rem;
  `
const Boton = styled.button`
  background-color: #00838F;
  font-size: 16px;
  width: 100%;
  padding: 1rem;
  color: #fff;
  text-transform: uppercase;
  font-weight: bold;
  transition: background-color .3s ease;
  margin-top: 2rem;

  border:none;
  &:hover{
    cursor: pointer;
    background-color: #26C6DA;
  }
  `
const Error = styled.div`
  background-color: red;
  color: white;
  padding: 1rem;
  width: 100%;
  text-align: center;
  margin-bottom: 2rem;
  `
const Formulario = ({setResumen,setCargando}) => {

  const [datos, setDatos] = useState({
    marca: '',
    year:'',
    plan:''
  })
  //extraer los valores del state
  const {marca, year, plan} = datos
  //error
  const [error, setError] = useState(false)

  //Leer los datos del formulario y colocarlos en el state
  const obtenerDatos = e =>{
    setDatos({
      ...datos,
      [e.target.name] : e.target.value
    })
  }

  const handleSubmit = e => {
    e.preventDefault()
    if(marca.trim() === '' || year.trim() === '' || plan.trim() === ''){
      setError(true)
      return
    }
    setError(false)

    //base de 2000
    let resultado = 2000

    //obtener la diferencia de año
    const diferencia = obtenerDiferenciaYear(year)

    //por cada año hay que restar el 3%
    resultado -= ((diferencia * 3 ) * resultado ) / 100
    
    //americano 15%
    //asiatico 5%
    //europeo 30%
    resultado = calcularMarca(marca) * resultado

    //basico 20%
    //completo 50%
    const incrementoPlan = calcularPlan(plan)
    resultado = parseFloat( incrementoPlan * resultado).toFixed(2)

    setCargando(true)
    setTimeout(() => {
      //Elimina el spinner
      setCargando(false)
      //pasa al componente principal
      //total
      setResumen({
        cotizacion: resultado,
        datos
      })
    }, 3000);

    
  }
  
  return (
    <form
      onSubmit={handleSubmit}
    >
      {error ? <Error>Todos los campos son obligatorio</Error> :null} 
      <Campo>
        <Label>Marca</Label>
        <Select
          name='marca'
          value={marca}
          onChange={obtenerDatos}
        >
          <option value="">--Selecione ---</option>
          <option value="americano">Americano</option>
          <option value="europeo">Europeo</option>
          <option value="asiatico">Asiatico</option>
        </Select>
        <Label>Año</Label>
          <Select
            name='year'
            value={year}
            onChange={obtenerDatos}
          >
            <option value="">-- Seleccione --</option>
            <option value="2021">2021</option>
            <option value="2020">2020</option>
            <option value="2019">2019</option>
            <option value="2018">2018</option>
            <option value="2017">2017</option>
            <option value="2016">2016</option>
            <option value="2015">2015</option>
            <option value="2014">2014</option>
            <option value="2013">2013</option>
            <option value="2012">2012</option>
          </Select>
            <Label>Plan</Label>
            <InputRadio 
              type="radio"
              name='plan'
              value='basico'
              checked={plan === "basico"}
              onChange={obtenerDatos}
              /> Básico
            <InputRadio 
              type="radio"
              name='plan'
              value='completo'
              checked={plan === "completo"}
              onChange={obtenerDatos}
            /> Completo
          <Boton
            input='submit'
          >Cotizar</Boton>
      </Campo>
    </form>
  )
}

export default Formulario
