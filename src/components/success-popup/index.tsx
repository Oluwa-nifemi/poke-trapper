import React from 'react';
import styles from "./index.module.css";
import Typewriter from "components/typewriter/typewriter";
import Popup from "components/popup";
import {useAppDispatch} from "../../redux/hooks";
import {catchPokemon} from "../../redux/my-pokemon.slice";
import {nanoid} from "nanoid";

interface Props {
    pokemonName: string;
    imageUrl: string;
    handleClose: React.MouseEventHandler
}

const SuccessPopup: React.FC<Props> = ({pokemonName, imageUrl, handleClose}) => {
    const [nickname, setNickname] = React.useState('');
    const [hasSaved, setHasSaved] = React.useState(false);

    const dispatch = useAppDispatch();

    const handleInputChange: React.ChangeEventHandler<HTMLInputElement> = (event) => {
        setNickname(event.target.value);
    };

    const handleFormSubmit: React.FormEventHandler = (e) => {
        e.preventDefault();

        setNickname("");

        dispatch(catchPokemon({
            id: nanoid(),
            name: pokemonName,
            sprites: {
                front_default: imageUrl
            },
            nickname
        }))

        setHasSaved(true)
    }

    const typewriterText = `${pokemonName} was caught!`;

    const renderBody = () => {
        if (hasSaved) {
            return (
                <>
                    <Typewriter text={`${pokemonName} was saved!`}/>
                    <button className={styles.successPopupButton} onClick={handleClose} type="button">
                        Close
                    </button>
                </>
            )
        }

        return (
            <>
                <Typewriter text={typewriterText}/>
                <form
                    className={styles.successPopupForm}
                    onSubmit={handleFormSubmit}
                    style={{
                        animationDelay: `${(0.06 * typewriterText.length) + 0.1}s`
                    }}
                >
                    <input type="text" placeholder="Nickname" className={styles.successPopupInput}
                           onChange={handleInputChange} value={nickname}/>
                    <button className={styles.successPopupButton} type="submit">
                        Save
                    </button>
                    <button className={styles.successPopupButton} onClick={handleClose} type="button">
                        Close
                    </button>
                </form>
            </>
        )
    }

    return (
        <Popup isVisible className={styles.successPopup}>
            {renderBody()}
        </Popup>
    );
};

export default SuccessPopup;