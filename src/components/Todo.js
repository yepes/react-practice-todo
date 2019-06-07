import React, {Component} from 'react';
import PropTypes from 'prop-types';

export default class Todo extends Component{

    constructor(props) {
        super(props);

        this.state = {
            editing: false,
            todo: this.props.todo
        };

        this.todoInput = React.createRef()
    }

    handleClick = () => {
        this.setState({editing: true}, () => this.todoInput.current.focus() );
    }

    handleChange = e => {
        this.setState({
            todo: {
                id: this.state.todo.id,
                title: e.target.value
            }
        })
    }

    handleBlur = () => {
        this.setState({ editing: false });
        this.props.onBlur(this.state.todo);
    }

    render() {
        const {editing, todo} = this.state;
        return (
            <li
                onClick={this.handleClick}
            >
                {!editing && todo.title}

                {editing &&
                    <input
                        type="text"
                        ref={this.todoInput}
                        value={todo.title}
                        onChange={this.handleChange}
                        onBlur={this.handleBlur}
                    />
                }
            </li>
        );
    }

}

Todo.propTypes = {
    todo: PropTypes.object.isRequired,
};