import React, { useContext, useState } from 'react'
import { Filter, PokemonList } from "../components"
import { PokemonContext } from '../context/PokemonContext'
import { useNavigate } from 'react-router-dom'
import { LuSettings2 } from 'react-icons/lu'
import { GrClose } from 'react-icons/gr'



export const Home = () => {

  const {onChange, valueSearch, onReset, loadMore} = useContext(PokemonContext)

  const navigate = useNavigate()

  const onSubmitSearch = e => {
    e.preventDefault()
    navigate('/search', {
      state: valueSearch
    })

    onReset()
  }

  const [isSidebarOpen, setSidebarOpen] = useState(false); 

  const openSidebar = () => {
    setSidebarOpen(true);
  };

  const closeSidebar = () => {
    setSidebarOpen(false);
  };




  return (
    <div className='home-container app-body'>
    <div id="form-container" className='container'>
      <h2>¿Estás buscando algún Pokemón específico?</h2>
      <form onSubmit={onSubmitSearch}>
        <input
                type='search'
                name='valueSearch'
                id=''
                value={valueSearch}
                onChange={onChange}
                placeholder='Buscar nombre de Pokemón'
                className='input-search'
                required
          />
          <input 
          type="submit" 
          className='app-btn'
          value='Buscar'
          />
      </form>
      <button className="sidebar-toggle-button-open" onClick={openSidebar}>
        <LuSettings2 />
      </button>
    </div>
    <div className={`sidebar-filter ${isSidebarOpen ? 'open' : ''}`}>
      <div className="close-btn-container">
        <button className="sidebar-toggle-button-close" onClick={closeSidebar}>
          <GrClose/>
        </button>
      </div>
        <Filter />
      </div>

      <PokemonList />
      <div className="load-container container">
        <button className='app-btn' onClick={loadMore}>
          Cargar más
        </button>
      </div>
      </div>
  )
}
