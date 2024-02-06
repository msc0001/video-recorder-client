import React, {
    FunctionComponent,
    MouseEventHandler,
    ReactElement,
} from "react";
import "./styles.css";

type Children = ReactElement | String | number | Array<Children>;

interface ButtonProps {
    className?: string;
    children?: Children;
    onClick?: MouseEventHandler<HTMLButtonElement>;
}

const Button: FunctionComponent<ButtonProps> = ({
    className = "",
    children,
    onClick,
}) => {
    return (
        <button className={`btn ${className}`} onClick={onClick}>
            {children}
        </button>
    );
};

export default Button;
