import React, { useContext } from 'react'
import { PokemonContext } from '../context/PokemonContext'
import { SinglePokemonCard } from './SinglePokemonCard'
import { Loader } from './Loader'

export const PokemonList = () => {
// Utilizamos el contexto para acceder a los datos y funciones necesarios.
  const {allPokemons, loader, filteredPokemons } = useContext(PokemonContext)


  return (
    <>
    {
      loader ? (
        <Loader/>
      ) :
      
      (
        <div id="pokemonContainer" className='pokemon-list container'>
          {
            filteredPokemons.length ? (
               // muestra los pokemon filtrados (si existen).
              <>
                {filteredPokemons.map(pokemon => <SinglePokemonCard pokemon={pokemon} key={pokemon.id} />)}
              </>
            ) : (

              // si no existen los pokemon filtrados, muestra todos los pokemones disponibles)
              <>
              {allPokemons.map(pokemon => <SinglePokemonCard pokemon={pokemon} key={pokemon.id} />)}
              </>
            )
          }
          
        </div>
      )
    }

    </>
  )
}

export default PokemonList;