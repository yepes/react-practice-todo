import React, {Component} from 'react';
import Todo from './components/Todo';
import {Search} from "./components/Search";
import {filterTodos} from "./filters/TodoFilter";
import TodoAdd from "./components/TodoAdd";


class TodoContainer extends Component {

    constructor(props) {
        super(props);
        const todos = JSON.parse(localStorage.getItem('todos')) || [];

        this.state = {
            todos,
            showCompleted: false,
            title: '',
            searchTerm: ''
        };
    };

    filterTodosClickHandler = e => {
        e.preventDefault();
        this.setState({
            showCompleted: !this.state.showCompleted
        });
    };

    handleTitleChange = e => {
        this.setState({
            title: e.target.value
        });
    };

    handleSearchChange = e => {
        this.setState({
            searchTerm: e.target.value
        });
    };

    addTodo = () => {
        const title = this.state.title;
        if (title.length === 0) return;

        const todos = [...this.state.todos, {
            id: 1 + Math.random(),
            title: this.state.title,
            completed: false,
        }];

        this.setState({
            todos,
            title: ''
        }, () => {
            this.saveTodos(todos);
        });
    };

    saveTodos(todos) {
        localStorage.setItem('todos', JSON.stringify(todos));
    };

    handleTodoBlur = (todo) => {
        console.log('handleBlur', todo);

        let todos = this.state.todos.slice();
        let index = todos.findIndex(t => todo.id === t.id);

        todos[index] = todo;

        this.setState({
            todos: todos
        }, () => {
            this.saveTodos(todos);
        });
    };

    render() {
        const {todos, title, showCompleted, searchTerm} = this.state;
        const showCompletedText = showCompleted ? 'Hide Completed' : 'Show completed';

        const todosDisplay = todos
            .filter(filterTodos(showCompleted, searchTerm))
            .map((todo) =>
                <Todo
                    todo={todo}
                    key={todo.id}
                    value={searchTerm}
                    onBlur={this.handleTodoBlur}
                />
        );

        return (
            <div className="TodoContainer">
                <Search onChange={this.handleSearchChange}/>

                {todosDisplay.length > 0 &&
                    <div className="todos">
                        <ul>
                            {todosDisplay}
                        </ul>
                    </div>
                }

                <TodoAdd
                    value={this.state.title}
                    onChange={this.handleTitleChange}
                    title={title}
                    onClick={this.addTodo}
                />

                <footer>
                    <p>{todosDisplay.length} todos</p>
                    <button
                        onClick={this.filterTodosClickHandler}
                    >
                        {showCompletedText}
                    </button>
                </footer>

            </div>
        );
    }
}

export default TodoContainer;
