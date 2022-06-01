import React, {ButtonHTMLAttributes} from 'react';
import styles from "./index.module.css"
import {classNames} from "utils/classNames";

interface Props {
    className: string;
    children: React.ReactNode;
}

const DashedButton: React.FC<Props | ButtonHTMLAttributes<HTMLButtonElement>> = (
    {
        children,
        className = '',
        ...props
    }) => {
    return (
        <button className={classNames(styles.button, className)} {...props}>
            {children}
        </button>
    );
};

export default DashedButton;