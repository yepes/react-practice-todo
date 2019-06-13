import React from "react";
import * as PropTypes from "prop-types";

export default function TodoAdd(props)  {
    return <div className="addTodo">
        <input
            type="text"
            value={props.value}
            onChange={props.onChange}
        />
        <button
            disabled={props.title.length === 0}
            onClick={props.onClick}
        >
            Agregar
        </button>
    </div>
}

TodoAdd.propTypes = {
    value: PropTypes.any,
    onChange: PropTypes.func,
    title: PropTypes.any,
    onClick: PropTypes.func
};