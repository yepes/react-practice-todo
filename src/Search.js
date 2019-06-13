import * as PropTypes from "prop-types";
import React from "react";

export function Search(props) {
    return <input
        type="text"
        name="search"
        onChange={props.onChange}
    />
}

Search.propTypes = {
    onChange: PropTypes.func
};