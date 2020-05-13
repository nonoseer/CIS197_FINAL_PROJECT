import React, { Component } from 'react'
const axios = require('axios')

export class Todo extends Component {
  constructor(props) {
    super(props)

    this.state = {
      Cadance: 0,
    }
  }

  onChange = (e) => {
    e.preventDefault()
    this.setState({ [e.target.name]: e.target.value })
  }
  getStyle = () => {
    return {
      background: '#f5f5f5',
      textDecoration: this.props.todo.active ? 'none' : 'line-through',
      borderBottom: '1px #ccc dotted',
      padding: '10px',
    }
  }
  onDelete = (e) => {
    e.preventDefault()
    axios
      .post(
        ' http://localhost:8000/api/todos/delete',
        {},
        {
          headers: {
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': 'http://localhost:3000',
          },

          params: {
            tid: this.props.todo._id,
          },
        }
      )
      .then((res) => {
        this.props.getTodos()
      })
      .then((e) => {
        console.log(e)
      })
  }

  /*
  deleteItem = (e) => {
    axios
      .delete('http://localhost:8000/api/remove', {
        headers: { 'Content-Type': 'application/json' },
        data: { e },
      })
      .then((res) => {
        console.log(res)
      })
      .then((e) => {
        console.log(e)
      })
  }
  */
  render() {
    console.log('todo log', this.props.todo)
    const { todo } = this.props

    return (
      <li key={this.props.todo.key} style={this.getStyle()}>
        Cadance:{'once every'} {todo.cadance} weeks
        <div></div>
        {todo.content}
        {'      '}
        <input
          type="button"
          name="delete"
          value="remove"
          id=""
          onClick={this.onDelete}
        />
      </li>
    )
  }
}

export default Todo
