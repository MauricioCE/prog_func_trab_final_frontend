import { useState } from "react";
import classNames from "classnames";
import classes from './Input.module.css';

const className = classNames('label');

const Input = ({text = "Sem texto", placeHolder = "Placeholder"}) => {
    const [inputText, setInputText] = useState();
    return (
        <label className={classes.label}>
            <span>{text}</span>
            <input type="text" placeholder={placeHolder} />
        </label>
    )
}

export default Input;