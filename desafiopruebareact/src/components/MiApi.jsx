import { useEffect, useState } from "react"; 
import './pokemones.css'
import Buscador from "./Buscador";

function Pokemon({ id, nombre, imagen }) {
    return (
        <div className="pokemon-card" >
                <img src={imagen} alt={nombre} className="pokemon-imagen" />
                <p className="pokemon-titulo">
                    <span>#{id}</span>
                    <span>{nombre}</span>
                </p>
        </div>
    )
}

function Pokemones() {
    const [pokemones, setPokemones] = useState([]);
    const [busqueda, setBusqueda] = useState('');

    const buscarPokemon = (e) => {
        e.preventDefault();
        
        const filteredPokemones = pokemones.filter((pokemon) =>
            pokemon.nombre.toLowerCase().includes(busqueda.toLowerCase())
        );
        setPokemones(filteredPokemones);
    }

    useEffect(() => {
        const getPokemones = async () => {
            const response = await fetch('https://pokeapi.co/api/v2/pokemon?limit=20&offset=0')
            const listaPokemones = await response.json()
            const { results } = listaPokemones
            
            const newPokemones = results.map(async (pokemon) => {
                const response = await fetch(pokemon.url)
                const poke = await response.json()

                return {
                    id: poke.id,
                    nombre: poke.name,
                    imagen: poke.sprites.other.dream_world.front_default
                }
            })
            
            setPokemones(await Promise.all(newPokemones));
        }
        
        getPokemones();
    }, [])

    return (
        <>
        <Buscador busqueda={busqueda} setBusqueda={setBusqueda} buscarPokemon={buscarPokemon}/>
        <section className="pokemon-container">
            {pokemones.map(pokemon => <Pokemon key={pokemon.id} {...pokemon} />)}
        </section>
        </>
    )
}

export default Pokemones;