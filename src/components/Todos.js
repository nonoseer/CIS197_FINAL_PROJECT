import React, { Component } from 'react'
import Todo from './Todo.js'
export class Todos extends Component {
  render() {
    console.log('Todos', this.props.todos)
    const { todos } = this.props

    return (
      <div>
        <h2>Todos</h2>
        <ul>
          {todos.map((todo) => (
            <Todo todo={todo} getTodos={this.props.getTodos} />
          ))}
        </ul>
      </div>
    )
  }
}

export default Todos
