import React from 'react';
import {useGetPokemonByNameQuery} from "api/pokemon";
import {useParams} from "react-router-dom";

const PokemonDetails = () => {
    const { name } = useParams();

    const { isLoading, data } = useGetPokemonByNameQuery(name as string);

    if(isLoading){
        return <div>Loading...</div>
    }

    if(data) {
        return (
            <div>
                <h1>
                    {data.name}
                </h1>
                <button>
                    Catch
                </button>
                <img src={data.sprites.front_default} alt=""/>
                <h3>
                    Types
                </h3>
                {
                    data.types.map((type) => (
                        <div key={type.type.name}>
                            {type.type.name}
                        </div>
                    ))
                }
                <h3>
                    Moves
                </h3>
                {
                    data.moves.map((move) => (
                        <div key={move.move.name}>
                            {move.move.name}
                        </div>
                    ))
                }
            </div>
        );
    }

    return null;
};

export default PokemonDetails;