import React from 'react'
import './index.scss'
import { Link } from 'react-router-dom'
import 'bootstrap/dist/css/bootstrap.min.css';

export default function Header() {
    return (
        <header className = "header-container">
                <ul>
                    <li><Link to = "/">Calculadora de promedios</Link></li>
                    <li><Link to = "/tabla-frecuencia">Tabla de frecuencia</Link></li>
                </ul>
        </header>

    )
}
