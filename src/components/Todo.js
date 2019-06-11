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
    };

    handleClick = () => {
        this.setState({editing: true}, () => this.todoInput.current.focus() );
    };

    handleChange = e => {

        const target = e.target;
        const value = target.type === 'checkbox' ? target.checked : target.value;

        this.setState({
            todo: {
                ...this.state.todo,
                [e.target.name]: value
            }
        }, () => {
            if (target.type === 'checkbox') this.handleBlur();
        })
    };

    handleBlur = () => {
        this.setState({ editing: false }, () => {this.props.onBlur(this.state.todo);});

    };

    render() {
        const {editing, todo} = this.state;
        return (
            <li>

                <input
                    type="checkbox"
                    name="completed"
                    checked={todo.completed}
                    onChange={this.handleChange}
                />

                {!editing && <span onClick={this.handleClick}>{todo.title}</span>}

                {editing &&
                    <input
                        type="text"
                        name="title"
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