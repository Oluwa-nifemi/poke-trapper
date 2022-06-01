import React, {ButtonHTMLAttributes} from 'react';
import styles from "./index.module.css"

interface Props {
    className: string;
    children: React.ReactNode;
}

const DashedButton: React.FC<Props | ButtonHTMLAttributes<HTMLButtonElement>> = ({
                                                                                     children,
                                                                                     className = '',
                                                                                     ...props
                                                                                 }) => {
    return (
        <button className={styles.button} {...props}>
            {children}
        </button>
    );
};

export default DashedButton;