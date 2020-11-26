import React from 'react';

export default function ListItem(props) {
    return (
        <li>
            <input onChange={props.onChange} type="checkbox" checked={props.checked} disabled={props.disabled}></input>
            <label>{props.taskName}</label>
        </li>
    );
}
