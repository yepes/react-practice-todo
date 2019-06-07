import React, { Component } from 'react';

class App extends Component {

  constructor(props) {
    super(props);
    const todos = JSON.parse(localStorage.getItem('todos')) || [];

    this.state = {
      todos
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
    const todos = [...this.state.todos, {
      id: 1 + Math.random(),
      title: this.state.title
    }];
    this.setState({
      todos,
      title: ''
    });
    localStorage.setItem('todos', JSON.stringify(todos));
  };

  render() {
    const { todos } = this.state;
    return (
      <div className="App">
        {todos.length > 0 &&
            <div className="todos">
              <ul>
              {todos.map((todo, index) => {
                return <li key={todo.id}>{todo.title}</li>
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
          <button onClick={this.addTodo}>Agregar</button>
        </div>
      </div>
    );
  }
}

export default App;
