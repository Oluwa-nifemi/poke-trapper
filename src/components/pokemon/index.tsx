import React from 'react';
import {BasePokemon} from "types/pokemon";
import {Link} from "react-router-dom";
import {useAppSelector} from "../../redux/hooks";
import {getCaughtPokemonStatistics} from "../../redux/my-pokemon.slice";
import styles from "./index.module.css"

interface Props {
    pokemon: BasePokemon
}

const PokemonItem: React.FC<Props> = ({pokemon}) => {
    const pokemonStats = useAppSelector(getCaughtPokemonStatistics);

    return (
        <article className={styles.pokemon}>
            <Link to={pokemon.name} className={styles.pokemonName}>{pokemon.name}</Link>
            <span>
                {pokemonStats[pokemon.name] || 0}
            </span>
        </article>
    );
};

export default PokemonItem;