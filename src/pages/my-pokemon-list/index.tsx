import React, {useRef} from 'react';
import {useAppDispatch, useAppSelector} from "../../redux/hooks";
import {getCaughtPokemon, releasePokemon} from "../../redux/my-pokemon.slice";
import {CaughtPokemon} from "types/pokemon";
import PixelatedButton from "components/pixelated-button";
import styles from "./index.module.css"
import Popup from "components/popup";
import Typewriter from "components/typewriter/typewriter";

const MyPokemonList = () => {
    const myPokemon = useAppSelector(getCaughtPokemon);
    const dispatch = useAppDispatch();

    const [deletedPokemon, setDeletedPokemon] = React.useState("");

    const timeoutRef = useRef<ReturnType<typeof setTimeout>>();

    const handleReleasePokemon = (pokemon: CaughtPokemon) => () => {
        clearTimeout(timeoutRef.current);

        dispatch(releasePokemon({pokemonId: pokemon.id, pokemonName: pokemon.name}));

        setDeletedPokemon(pokemon.nickname);

        //Wipe message after 3 seconds but also store the timeout incase we need to reset the timeout if the user releases another pokemon
        timeoutRef.current = setTimeout(() => setDeletedPokemon(""), 3000);
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
                        <PixelatedButton
                            onClick={handleReleasePokemon(pokemon)}
                            className={styles.myPokemonListItemRelease}
                        >
                            Release
                        </PixelatedButton>
                    </li>
                ))}
            </ul>
            <Popup isVisible={!!deletedPokemon}>
                <Typewriter text={`${deletedPokemon} has been released!`}/>
            </Popup>
        </div>
    );
};

export default MyPokemonList;