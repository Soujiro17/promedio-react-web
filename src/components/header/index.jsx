import React from 'react'
import './index.scss'
import { Link } from 'react-router-dom'

export default function Header() {
    return (
        <header className = "header-container">
                <ul>
                    <Link to = "/"><li>Inicio</li></Link>
                    <Link to = "/about-us"><li>Sobre nosotros</li></Link>
                    <Link to = "/contact"><li>Contacto</li></Link>
                </ul>
        </header>

    )
}
