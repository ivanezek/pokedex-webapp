import React from 'react'
import { Link } from 'react-router-dom'

export const SinglePokemonCard = ({pokemon}) => {

const typeClass = pokemon.types[0].type.name;

  return (
    <Link to={`/pokemon/${pokemon.name}`} className={`pokemon-card ${typeClass}`}>
		<div className='card-info'>
				<h3>{pokemon.name}</h3>
				<div className='card-types'>
					{pokemon.types.map(type => (
						<span key={type.type.name} className={type.type.name}>
							{type.type.name}
						</span>
					))}
				</div>
		</div>
      <div className='card-image'>
				<img
					src={pokemon.sprites.other.dream_world.front_default}
					alt={`Pokemon ${pokemon.name}`}
				/>
			</div>
    </Link>
  )
}
