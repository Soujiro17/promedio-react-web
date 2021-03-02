import './index.scss';
import { React, useState, useEffect, useRef } from 'react'
import 'bootstrap/dist/css/bootstrap.min.css';
import { Field, Header, Footer } from '../';

function Home() {

  const [count, setCount] = useState(1);
  const [inputNota, setInputNota] = useState([]);
  const [arrayNotas, setArrayNotas] = useState([]);
  const [arrayPercentages, setArrayPercentages] = useState([]);
  const [promedio, setPromedio] = useState(0);

  const addField = () => {
    setCount(count + 1);
    setInputNota(inputNota.concat(<Field count = {count} key = {inputNota.length} id = {inputNota.length} arrayNotas = {arrayNotas} arrayPercentages = {arrayPercentages} />));
    if(inputNota.length === arrayNotas.length){
      arrayNotas.push("");
      arrayPercentages.push("");
    }
    console.log(arrayNotas)
    console.log(inputNota)
  }

  const deleteInput = () => {
      setCount(count - 1);
      const index = arrayNotas.lastIndexOf("");
      arrayNotas.splice(index, 1);
      arrayPercentages.splice(index, 1);
      inputNota.pop();
  }

  const calcularPromedio = () => {
    setPromedio(0);
    let resultado = 0
    let percentage = 0;
    console.log(arrayNotas)
    console.log(inputNota[0])
    if (arrayNotas.includes(false) || arrayNotas.includes("") || arrayPercentages.includes(false) || arrayPercentages.includes("")) {
      return setPromedio("la forma ingresada no es válida o el espacio está en blanco.")
    }

    for(let x = 0; x<arrayNotas.length; x++){
      resultado += arrayNotas[x] * (arrayPercentages[x] / 100);
      percentage += parseInt(arrayPercentages[x]);
    }

    if(percentage > 100) resultado = "error, la suma de porcentajes es mayor a 100%."
    else if (percentage === 100);
    else resultado = "error, la suma de porcentajes es menor a 100%."
    setPromedio(resultado);
  }

  const deleteAllFields = () =>{
    setTimeout(() => {
      setArrayNotas([])
      setArrayPercentages([])
      setInputNota([])
      setCount(1);
      setPromedio(0);
    }, 50)

  }

  
  return (
    <>
      <Header/>
      <div className="instructions-container">
        <div className="card-container">
          <div className="card-body">
            <h3 className="card-title">Modo de uso</h3>
            <ul>
              <li><p className="card-text">El modo de uso es sencillo: en los espacios en blanco debes poner tus notas y el porcentaje respectivo a cada una. Ejemplo: 45 (equivalente a un 4,5) y 20 (equivalente al 20% del promedio).</p></li>
              <li><p className="card-text">Para las notas y porcentajes se deben ingresar números enteros. Por ejemplo: 20 (equivale a un 20% del promedio).</p></li>
              <li><p className="card-text">NO se deben dejar espacios en blanco. Todas las notas deben ser ingresadas con números, en caso de ingresar texto, lanzará error.</p></li>
              <li><p className="card-text">La suma de los porcentajes de las notas debe ser 100%. En caso contrario, lanzará error.</p></li>
            </ul>
          </div>
        </div>
      </div>
      <div className = "main-container">
        <div className = "form-group">
          <h3>Notas</h3>
          <div className = "form-item">{inputNota}</div>
          <button className = "addButton" onClick = {addField}>Agregar nota</button>
          {count === 1? addField() : ""}
          {inputNota.length > 1? <button className = "deleteButton" onClick = {deleteInput}>Borrar nota</button> : ""}
          {count > 3? <button className = "delAllButton" onClick = {deleteAllFields}>Borrar todas las notas</button>:""}
          <br/>
          <button className = "resultButton" onClick = {calcularPromedio}>Calcular promedio</button>
          <h1>{promedio === 0? "" : promedio >= 39.5? <span className = "addButton">Promedio: {promedio}</span> : <span className = "deleteButton">Promedio: {promedio}</span>}</h1>
        </div>
      </div>
      <Footer/>
    </>
  );
}

export default Home;
