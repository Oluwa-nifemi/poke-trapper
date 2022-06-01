import React from 'react';
import {useAppDispatch, useAppSelector} from "../../redux/hooks";
import {getCaughtPokemon, releasePokemon} from "../../redux/my-pokemon.slice";
import {CaughtPokemon} from "types/pokemon";
import PixelatedButton from "components/pixelated-button";
import styles from "./index.module.css"

const MyPokemonList = () => {
    const myPokemon = useAppSelector(getCaughtPokemon);
    const dispatch = useAppDispatch();

    const handleReleasePokemon = (pokemonId: string, pokemonName: string) => () => {
        dispatch(releasePokemon({pokemonId, pokemonName}));
    }

    return (
        <div>
            <h1 className={styles.header}>My Pokemon</h1>
            <ul className={styles.myPokemonList}>
                {myPokemon.map((pokemon: CaughtPokemon) => (
                    <li key={pokemon.name} className={styles.myPokemonListItem}>
                        <h2 className={styles.myPokemonListItemNickname}>
                            {pokemon.nickname}
                        </h2>
                        <h3 className={styles.myPokemonListItemName}>
                            {pokemon.name}
                        </h3>
                        <img src={pokemon.sprites.front_default} alt={pokemon.name}/>
                        <PixelatedButton onClick={handleReleasePokemon(pokemon.id, pokemon.name)}
                                         className={styles.myPokemonListItemRelease}>
                            Release
                        </PixelatedButton>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default MyPokemonList;