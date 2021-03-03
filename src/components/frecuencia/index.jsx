import React, { useState } from 'react';
import { Header, StickyHeadTable, TablaOrdenada } from '../';
import './index.scss';
import 'bootstrap/dist/css/bootstrap.min.css';

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
                        <li><p className="card-text">Para utilizar la tabla se deben ingresar todos los datos separados por comas SIN espacios. Ejemplo: 1,2,15,2,)</p></li>
                        <li><p className="card-text">El cambio de tipo de tabla con los datos ingresados NO hará que estos desaparezcan, la tabla realizará los cálculos igualmente.</p></li>
                        <li><p className="card-text">En caso ingresar letras o separar los números sin coma (",") la tabla no devolverá resultados.</p></li>
                        <li><p className="card-text">Si debe ingresar datos con coma, reemplace esta por un punto. Ejemplo: 16.2,22.0,7</p></li>
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
