import React from 'react'
import './index.scss'
import { Link } from 'react-router-dom'

export default function Header() {
    return (
        <header className = "header-container">
                <ul>
                    <Link to = "/"><li>Calculadora de promedios</li></Link>
                    <Link to = "/tabla-frecuencia"><li>Tabla de frecuencia</li></Link>
                    <Link to = "/contact"><li>Contacto</li></Link>
                </ul>
        </header>

    )
}
