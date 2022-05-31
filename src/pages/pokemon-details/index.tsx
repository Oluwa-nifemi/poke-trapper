import React from 'react';
import {useGetPokemonByNameQuery} from "api/pokemon";
import {useParams} from "react-router-dom";
import {useAppDispatch} from "../../redux/hooks";
import {catchPokemon} from "../../redux/my-pokemon.slice";
import {nanoid} from "nanoid";
import styles from "./index.module.css"
import {classNames} from "../../utils/classNames";

const PokemonDetails = () => {
    const {name} = useParams();

    const dispatch = useAppDispatch();

    const {isLoading, data} = useGetPokemonByNameQuery(name as string);

    const handleClickCatch = () => {
        //Super complex algorithm to detect if the pokemon was successfully caught : )
        const caught = Math.random() > 0.5;

        if(caught){
            const nickname = prompt("Enter your nickname") || "";

            if(data){
                dispatch(catchPokemon({
                    id: nanoid(),
                    name: data.name,
                    sprites: {
                        front_default: data.sprites.front_default
                    },
                    nickname
                }))
                alert(`${name} was successfully caught!`);
            }
        }else{
            alert(`${name} was not caught!`);
        }
    }

    if(isLoading){
        return <div>Loading...</div>
    }

    if(data) {
        return (
            <>
                <h1 className={styles.pokemonName}>
                    {data.name}
                </h1>
                <img className={styles.pokemonImage} src={data.sprites.front_default} alt=""/>
                <button onClick={handleClickCatch}>
                    Catch
                </button>
                <div className={styles.statsGrid}>
                    <article className={classNames(styles.statsGridItem, styles.statsGridItemBorderRight)}>
                        <h2 className={styles.statsGridItemName}>
                            HEIGHT
                        </h2>
                        <p className={styles.statsGridItemValue}>
                            {data.height}
                        </p>
                    </article>
                    <article className={classNames(styles.statsGridItem, styles.statsGridItemBorderLeft)}>
                        <h2 className={styles.statsGridItemName}>
                            WEIGHT
                        </h2>
                        <p className={styles.statsGridItemValue}>
                            {data.weight}
                        </p>
                    </article>
                    <article className={classNames(styles.statsGridItem, styles.statsGridItemBottom)}>
                        <h2 className={styles.statsGridItemName}>
                            XP
                        </h2>
                        <p className={styles.statsGridItemValue}>
                            {data.base_experience}
                        </p>
                    </article>
                </div>
                <article className={styles.attributesSection}>
                    <h3 className={styles.attributesSectionHeader}>
                        Types
                    </h3>
                    <ul className={styles.attributesSectionList}>
                        {
                            data.types.map((type) => (
                                <li
                                    className={styles.attributesSectionListItem}
                                    key={type.type.name}
                                >
                                    {type.type.name}
                                </li>
                            ))
                        }
                    </ul>
                </article>
                <article className={styles.attributesSection}>
                    <h3 className={styles.attributesSectionHeader}>
                        Moves
                    </h3>
                    <ul className={styles.attributesSectionList}>
                        {
                            data.moves.map((move) => (
                                <li
                                    className={styles.attributesSectionListItem}
                                    key={move.move.name}
                                >
                                    {move.move.name}
                                </li>
                            ))
                        }
                    </ul>
                </article>
            </>
        );
    }

    return null;
};

export default PokemonDetails;