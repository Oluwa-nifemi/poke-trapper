import React from 'react';
import {useListPokemonQuery} from "api/pokemon";
import {Pokemon} from "types/pokemon";
import PokemonItem from "components/pokemon";

const ListPokemon = () => {
    const {isLoading, data} = useListPokemonQuery("listPokemon");

    if (isLoading) {
        return <h3>Loading...</h3>
    }

    return (
        <>
            <h1>
                List of pokemon
            </h1>
            <section>
                {
                    data?.results.map((pokemon: Pokemon) => (
                        <PokemonItem pokemon={pokemon} key={pokemon.name}/>
                    ))
                }
            </section>
        </>
    );
};

export default ListPokemon;