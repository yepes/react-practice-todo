import React, {Component} from 'react';
import Todo from './components/Todo';

class App extends Component {

    constructor(props) {
        super(props);
        const todos = JSON.parse(localStorage.getItem('todos')) || [];

        this.state = {
            todos,
            title: ''
        }
    }

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
            title: this.state.title
        }];

        this.setState({
            todos,
            title: ''
        });
        this.saveTodos(todos)
    };

    saveTodos(todos) {
        console.log('saving todos');
        console.log(todos);
        console.log(JSON.stringify(todos));
        localStorage.setItem('todos', JSON.stringify(todos));
    }

    handleTodoBlur = (todo) => {

        let index = false;
        for (let i=0; i<this.state.todos.length; i++) {
            if (todo.id === this.state.todos[i].id){
                index = i;
                break;
            }
        }
        console.log(index);
        let todos = this.state.todos;
        todos[index] = todo;
        console.log(todos);
        console.log(todos[index]);

        this.setState({
            todos: todos
        });
        this.saveTodos(todos);

    };

    findTodoById(id) {
        console.log(`Finding todo ${id}`);
        const todos = this.state.todos;
        const result = todos.filter(t => {
            return t.id === id;
        });
        return result.length > 0 ? result[0] : false;
    }

    render() {
        const {todos, title} = this.state;
        return (
            <div className="App">
                {todos.length > 0 &&
                <div className="todos">
                    <ul>
                        {todos.map((todo, index) =>
                            <Todo
                                todo={todo}
                                key={index}
                                onBlur={this.handleTodoBlur}
                            />
                        )}
                    </ul>
                </div>
                }
                <div className="addTodo">
                    <input
                        type="text"
                        value={this.state.title}
                        onChange={this.handleTitleChange}
                    />
                    <button disabled={title.length === 0} onClick={this.addTodo}>Agregar</button>
                </div>
            </div>
        );
    }
}

export default App;
