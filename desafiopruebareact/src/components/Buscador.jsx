import './Buscador.css'


function Buscador ({ busqueda, setBusqueda, buscarPokemon }){

    return(
        <>
        <h3 className='titulo'>Elige tu pokemon favorito</h3>
        <form className='container-buscador' onSubmit={buscarPokemon}>
            <input type="text" placeholder='Encuentra tu pokemon' className='input-buscar' value={busqueda} onChange={(e) => setBusqueda(e.target.value)} />
            <button className='btn-buscar' type='submit'>               
                Buscar pokemon
            </button>
        </form>
        </>
    )
}

export default Buscador;