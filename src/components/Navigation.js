import React from 'react'
import { Link, Outlet } from 'react-router-dom'
import logo from "../assets/logo.webp"

export const Navigation = () => {

  return (
    <>
      <header>
        <Link to="/">
          <div className="logo-container container">
            <img src={logo} alt="Logo de Pokedex" className='logo-app'/>
          </div>
        </Link>
      </header>
      <Outlet/>
    </>
  )
}
