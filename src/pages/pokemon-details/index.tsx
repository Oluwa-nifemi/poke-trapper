import React, {useRef, useState} from 'react';
import {useGetPokemonByNameQuery} from "api/pokemon";
import {useParams} from "react-router-dom";
import {classNames} from "utils/classNames";
import PixelatedButton from "components/pixelated-button";
import styles from "./index.module.css"
import Popup from "components/popup";
import SuccessPopup from "components/success-popup";
import {MODAL_STATES} from "types/modal-states";
import Typewriter from "components/typewriter/typewriter";
import calculateCatchPokemon from "../../utils/calculateCatchPokemon";

const PokemonDetails = () => {
    const {name} = useParams();

    const [popupState, setPopupState] = useState(MODAL_STATES.IDLE)

    const {isLoading, data} = useGetPokemonByNameQuery(name as string);

    const timeoutRef = useRef<ReturnType<typeof setTimeout>>();

    const resetPopupState = () => {
        setPopupState(MODAL_STATES.IDLE)
    }

    const handleClickCatch = () => {
        clearTimeout(timeoutRef.current);

        //Super complex algorithm to detect if the pokemon was successfully caught : )
        const caught = calculateCatchPokemon();

        if (caught) {
            if (data) {
                setPopupState(MODAL_STATES.SUCCESS)
            }
        } else {
            setPopupState(MODAL_STATES.ERROR)

            //Hide modal after 6 seconds
            //Wipe message after 6 seconds but also store the timeout incase we need to reset the timeout if the user tries to catch again
            timeoutRef.current = setTimeout(() => {
                resetPopupState()
            }, 4000)
        }
    }

    if(isLoading){
        return <div>Loading...</div>
    }

    if(data) {
        return (
            <>
                {
                    popupState === MODAL_STATES.SUCCESS && (
                        <SuccessPopup
                            handleClose={resetPopupState}
                            imageUrl={data.sprites.front_default}
                            pokemonName={data.name}
                        />
                    )
                }
                <Popup isVisible={popupState === MODAL_STATES.ERROR}>
                    <Typewriter text={`${name} was not caught : (`}/>
                </Popup>
                <h1 className={styles.pokemonName}>
                    {data.name}
                </h1>
                <img className={styles.pokemonImage} src={data.sprites.front_default} alt={data.name}/>
                <PixelatedButton className={styles.pokemonCatchButton} onClick={handleClickCatch}>
                    CATCH
                </PixelatedButton>
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