import React from 'react';
import styles from "./index.module.css";
import {classNames} from "../../utils/classNames";

interface Props {
    children: React.ReactNode;
    className?: string;
    onClick: React.EventHandler<React.MouseEvent>;
}

//Pixelated button inspired by https://codepen.io/YoannM/pen/yyExEO
const PixelatedButton: React.FC<Props> = ({children, className = '', ...props}) => {
    return (
        <button className={classNames(styles.pixelatedButton, className)} {...props}>
            <span className={styles.pixelatedButtonText}>
                {children}
            </span>
        </button>
    );
};

export default PixelatedButton;