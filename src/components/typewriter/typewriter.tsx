import React from 'react';
import styles from "./index.module.css"

interface Props {
    text: string;
    className?: string;
}

const Typewriter: React.FC<Props> = ({text, className}) => {
    return (
        <p className={className} title={text}>
            {text.split("").map((char, index) => {
                return (
                    <span
                        key={index}
                        className={styles.letter}
                        style={{
                            animationDelay: `${0.06 * index}s`
                        }}
                    >
                        {char}
                    </span>
                )
            })}
        </p>
    );
};

export default Typewriter;