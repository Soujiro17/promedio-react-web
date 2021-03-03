import React, { useState } from 'react';
import { Header, StickyHeadTable, TablaOrdenada } from '../';
import './index.scss';

export default function Frecuencia() {
    const [datos, setDatos] = useState("");
    const [ordenada, setOrdenada] = useState(false);

    return (
        <div>
            <Header/>
            <main className = "table-container">
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
                <div className = "datos-agrupados">
                    <h3>Datos agrupados?</h3>
                    <button id="si-datos" onClick = {() => setOrdenada(true)}><span className = "datos-text">Si</span></button>
                    <button id="no-datos" onClick = {() => setOrdenada(false)}><span className = "datos-text">No</span></button>
                </div>
                <div className="table-information">
                    <input className = "table-input" onChange = {(e) => setDatos(e.target.value)}></input>
                    {ordenada? <TablaOrdenada data = {datos} key = {Math.random()}/> : <StickyHeadTable data = {datos} key = {Math.random()}/>}
                </div>
            </main>
        </div>
    )
}
