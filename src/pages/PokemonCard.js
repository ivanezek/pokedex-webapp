import React, { useContext, useEffect, useState } from 'react'
import { PokemonContext } from '../context/PokemonContext'
import { useParams } from 'react-router-dom'
import { Loader } from '../components'
import { BsFillHeartFill, BsFillShieldFill } from "react-icons/bs"
import { GiArrowsShield, GiBattleAxe, GiSwordsEmblem, GiBodyHeight, GiWeight } from "react-icons/gi"
import { AiFillThunderbolt } from "react-icons/ai"



export const PokemonCard = () => {



  const {getPokemonByName} = useContext(PokemonContext)

  const [loader, setLoader] = useState(true)
  const [pokemon, setPokemon] = useState({})


  const {name} = useParams()

  const fetchPokemon = async(name) => {
    const data = await getPokemonByName(name)
    setPokemon(data)
	setTimeout(() => {
        setLoader(false);
      }, 1500);

    console.log(data)
  }

  useEffect(()=>{
    fetchPokemon(name)
  }, [])

  const getTypeClass = (types) => {
    if (types && types.length > 0) {
      const primaryType = types[0].type.name;
      return primaryType;
    } else {
      return ''; 
    }
  };

  return (
	<div className={`app-body ${getTypeClass(pokemon.types)}`}>
	{loader ? (
		<Loader />
	) : (
		<main className='main-pokemon container'>
		<div className='header-main-pokemon '>
			<div className='container-img-pokemon'>
			<h1>{pokemon.name}</h1>
				<div className='card-types info-pokemon-type'>
					{pokemon.types.map(type => (
					<span key={type.type.name} className={`${type.type.name}`}>
						{type.type.name}
					</span>
					))}
				</div>
			<img
				src={pokemon.sprites.other.dream_world.front_default}
				alt={`Pokemon ${pokemon?.name}`}
			/>
			</div>
		</div>
		<div className='container-info-pokemon'>
				<div className='info-pokemon'>
					<h2>Información</h2>
					<div className="info-container">
						<div className='group-info'>
							<p> <GiBodyHeight/> Altura</p>
							<span>{pokemon.height}M</span>
						</div>
						<div className='group-info'>
							<p> <GiWeight/> Peso</p>
							<span>{pokemon.weight}KG</span>
						</div>
					</div>
				</div>
				<div className='container-stats'>
			<h2>Estadísticas</h2>
			<div className='stats'>
			<div className='stat-group'>
				<h3><BsFillHeartFill />HP </h3>
				<div className='progress-bar'></div>
				<span className='counter-stat'>{pokemon.stats[0].base_stat}</span>
			</div>
			<div className='stat-group'>
				<h3> <GiSwordsEmblem /> Attack</h3>
				<div className='progress-bar'></div>
				<span className='counter-stat'>{pokemon.stats[1].base_stat}</span>
			</div>
			<div className='stat-group'>
				<h3> <BsFillShieldFill /> Defense</h3>
				<div className='progress-bar'></div>
				<span className='counter-stat'>{pokemon.stats[2].base_stat}</span>
			</div>
			<div className='stat-group'>
				<h3> <GiBattleAxe/> Special Attack</h3>
				<div className='progress-bar'></div>
				<span className='counter-stat'>{pokemon.stats[3].base_stat}</span>
			</div>
			<div className='stat-group'>
				<h3> <GiArrowsShield /> Special Defense</h3>
				<div className='progress-bar'></div>
				<span className='counter-stat'>{pokemon.stats[4].base_stat}</span>
			</div>
			<div className='stat-group'>
				<h3> <AiFillThunderbolt /> Speed</h3>
				<div className='progress-bar'></div>
				<span className='counter-stat'>{pokemon.stats[5].base_stat}</span>
			</div>
			</div>
		</div>
			</div>


		</main>
	)}
	</div>

  )
}
