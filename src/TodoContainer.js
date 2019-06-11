import React, {Component} from 'react';
import Todo from './components/Todo';

class TodoContainer extends Component {

    constructor(props) {
        super(props);
        const todos = JSON.parse(localStorage.getItem('todos')) || [];

        this.state = {
            todos,
            todosDisplay: [],
            showCompleted: false,
            title: ''
        };

        console.log(todos);
    };

    componentDidMount() {
        this.filterTodos();
    }

    filterTodos() {
        const { showCompleted, todos } = this.state;
        console.log(`Filter todos: mostrando completados ${showCompleted}`);

        if (showCompleted)
            this.setState({
                todosDisplay: todos
            });
        else {
            const todosDisplay = todos.filter(t => {return t.completed === false});
            this.setState({ todosDisplay });
        }
    }

    filterTodosClickHandler = e => {
        e.preventDefault();
        this.setState({
            showCompleted: !this.state.showCompleted
        }, () => { this.filterTodos(); });

    };

    handleTitleChange = e => {
        console.log(e);
        console.log(e.target.keyCode);
        this.setState({
            title: e.target.value
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
            this.filterTodos();
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
            this.filterTodos();
        });


    };

    render() {
        const {todosDisplay, title, showCompleted} = this.state;
        const showCompletedText = showCompleted ? 'Hide Completed' : 'Show completed';

        return (
            <div className="TodoContainer">
                {todosDisplay.length > 0 &&
                <div className="todos">
                    <ul>
                        {todosDisplay.map((todo, index) => {
                            console.log(todo.title);
                            return (
                                <Todo
                                    todo={todo}
                                    key={index}
                                    onBlur={this.handleTodoBlur}
                                />
                            )
                        })}
                    </ul>
                </div>
                }

                <div className="addTodo">
                    <input
                        type="text"
                        value={this.state.title}
                        onChange={this.handleTitleChange}
                    />
                    <button
                        disabled={title.length === 0}
                        onClick={this.addTodo}
                    >
                        Agregar
                    </button>
                </div>

                <footer>
                    <p>{todosDisplay.length} todos</p>
                    <a href="#" onClick={this.filterTodosClickHandler}>{showCompletedText}</a>
                </footer>

            </div>
        );
    }
}

export default TodoContainer;
