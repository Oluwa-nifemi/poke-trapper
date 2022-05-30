import React from 'react';
import {useListPokemonQuery} from "api/pokemon";

const ListPokemon = () => {
    const {isLoading, data} = useListPokemonQuery("listPokemon");

    if (isLoading) {
        return <div>Loading...</div>
    }

    return (
        <div>
            List of pokemon
            {JSON.stringify(data)}
        </div>
    );
};

export default ListPokemon;