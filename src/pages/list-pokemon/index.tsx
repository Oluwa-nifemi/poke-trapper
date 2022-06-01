import React from 'react';
import {useListPokemonQuery} from "api/pokemon";
import {BasePokemon} from "types/pokemon";
import PokemonItem from "components/pokemon";
import styles from "./index.module.css"
import {API_ERROR} from "types/error";
import {classNames} from "utils/classNames";

const ListPokemon = () => {
    const {isLoading, data, isError, error} = useListPokemonQuery("listPokemon");

    if (isLoading) {
        return <h1 className={classNames(styles.statusMessage, "loading-text")}>Loading</h1>
    }

    if (isError) {
        return <h1 className={styles.statusMessage}>Error: {(error as API_ERROR).data}</h1>
    }

    return (
        <>
            <h1 className={styles.header}>
                List of pokemon
            </h1>
            <section className={styles.pokemonRows}>
                <article className={styles.pokemonRowsHeader}>
                    <span>
                        Name
                    </span>
                    <span>
                        Owned
                    </span>
                </article>
                {
                    data?.results.map((pokemon: BasePokemon) => (
                        <PokemonItem pokemon={pokemon} key={pokemon.name}/>
                    ))
                }
            </section>
        </>
    );
};

export default ListPokemon;