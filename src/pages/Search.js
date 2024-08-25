import React, { useContext } from 'react'
import { PokemonContext } from '../context/PokemonContext'
import { Link, useLocation } from 'react-router-dom'
import { SinglePokemonCard } from '../components'

export const Search = () => {

  const location = useLocation()

  const {globalPokemons} = useContext(PokemonContext)

  const filteredPokemons = globalPokemons.filter(pokemon => pokemon.name.includes(location.state.toLowerCase()))

  console.log(filteredPokemons)

  return (
    <div className="app-body">
      <div className="search-container container">
        <p className="p-search">
          Se encontraron <span className='search-result'>{filteredPokemons.length}</span> resultados:
        </p>
        <div className="card-list-pokemon container">
          {filteredPokemons.map(pokemon => (<SinglePokemonCard pokemon={pokemon} key={pokemon.id}/>) )}
        </div>
        <Link to="/" className='app-btn'>
          Volver al inicio
        </Link>
      </div>
    </div>
  )
}
