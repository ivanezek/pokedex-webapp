import { useEffect, useState } from "react";
import { PokemonContext } from "./PokemonContext";
import { useForm } from "../hook/useForm";

export const PokemonProvider = ({children}) => {

    // Estados según API
    const [allPokemons, setAllPokemons] = useState([])
    const [globalPokemons, setGlobalPokemons] = useState([])
    const [offset, setOffset] = useState(0)

    // Custom Hook useForm 
    const {valueSearch, onChange, onReset} = useForm({
        valueSearch: ''
    })

    // Estados generales de APP
    const [loader, setLoader] = useState(true)



    //llamado a la API para traer 20 pokemones
    const getPokemons = async (limit = 20) => {
        const URL = "https://pokeapi.co/api/v2/"
        const res = await fetch(`${URL}pokemon?limit=${limit}&offset=${offset}`);
        const data = await res.json()

        const promises = data.results.map(async (pokemon) => {
            const res = await fetch(pokemon.url)
            const data = await res.json()

            return data;
        })

        const results = await Promise.all(promises)

       setAllPokemons([
        ...allPokemons, ...results
       ])
       setTimeout(() => {
        setLoader(false);
      }, 3000);
    }


    // llamado a la api para taer TODOS los pokemones
    const getGlobalPokemons = async() => {
        const URL = "https://pokeapi.co/api/v2/"
        const res = await fetch(`${URL}pokemon?limit=100000&offset=0`);
        const data = await res.json()

        const promises = data.results.map(async (pokemon) => {
            const res = await fetch(pokemon.url)
            const data = await res.json()

            return data;
        })

        const results = await Promise.all(promises)

       setGlobalPokemons(results)
       setTimeout(() => {
        setLoader(false);
      }, 3000);
    }


    // llamado a la api para traer pokemon por nombre

    const getPokemonByName = async(name) => {
        const URL = "https://pokeapi.co/api/v2/"
        const res = await fetch(`${URL}pokemon/${name}`);
        const data = await res.json();

        return data;
    }

    

    useEffect(() => {
        getPokemons()
    }, [offset])

    useEffect(() => {
        getGlobalPokemons()
    }, [])

    // Boton de Load More

    const loadMore = () => {
        setOffset(offset + 20)
    }

    // funcion de filtros + state
    const [typeSelected, setTypeSelected] = useState({
        grass: false,
		normal: false,
		fighting: false,
		flying: false,
		poison: false,
		ground: false,
		rock: false,
		bug: false,
		ghost: false,
		steel: false,
		fire: false,
		water: false,
		electric: false,
		psychic: false,
		ice: false,
		dragon: false,
		dark: false,
		fairy: false,
		unknow: false,
		shadow: false,
    })
    const [filteredPokemons, setFilteredPokemons] = useState([])

    const handleCheckbox = e => {

        setTypeSelected({
            ...typeSelected,
            [e.target.name] : e.target.checked
        })

        if(e.target.checked){
            const filteredResults = globalPokemons.filter(pokemon => pokemon.types.map(type => type.type.name).includes(e.target.name))
            
            setFilteredPokemons([...filteredPokemons, ...filteredResults])
        }
        else{
            const filteredResults = filteredPokemons.filter(pokemon => !pokemon.types.map(type => type.type.name).includes(e.target.name))
            
            setFilteredPokemons([...filteredResults])
        }

        

    }



  return (
    <div>
        <PokemonContext.Provider value={{
            valueSearch, 
            onChange,
            onReset,
            allPokemons,
            globalPokemons,
            getPokemonByName,
            loadMore,
            // Loader
            loader,
            setLoader,
            // Filter checkbox
            handleCheckbox,
            filteredPokemons,


        }}>
            {children}
        </PokemonContext.Provider>
    </div>
  )
}
