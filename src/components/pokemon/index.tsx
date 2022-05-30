import React from 'react';
import {BasePokemon} from "types/pokemon";
import {Link} from "react-router-dom";
import {useAppSelector} from "../../redux/hooks";
import {getCaughtPokemonStatistics} from "../../redux/my-pokemon.slice";

interface Props {
    pokemon: BasePokemon
}

const PokemonItem: React.FC<Props> = ({pokemon}) => {
    const pokemonStats = useAppSelector(getCaughtPokemonStatistics);

    return (
        <div>
            <Link to={pokemon.name}>{pokemon.name}</Link>
            <p>
                Owned Count: {pokemonStats[pokemon.name] || 0}
            </p>
        </div>
    );
};

export default PokemonItem;