import React from 'react';
import {useListPokemonQuery} from "api/pokemon";
import {BasePokemon} from "types/pokemon";
import PokemonItem from "components/pokemon";
import styles from "./index.module.css"

const ListPokemon = () => {
    const {isLoading, data} = useListPokemonQuery("listPokemon");

    if (isLoading) {
        return <h3>Loading...</h3>
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