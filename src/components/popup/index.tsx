import React from 'react';
import styles from "./index.module.css"
import {classNames} from "../../utils/classNames";

interface Props {
    children: React.ReactNode;
    isVisible: boolean;
    className?: string;
}

const Popup: React.FC<Props> = ({children, className = '', isVisible}) => {
    return (
        <div className={classNames(styles.popup, [isVisible, styles.isVisible], className)}>
            {isVisible ? children : null}
        </div>
    );
};

export default Popup;