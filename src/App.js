import React, { Component } from 'react'
import './App.css'
import Todos from './components/Todos.js'
import AddTodo from './components/AddTodo.js'
import Signup from './components/Signup.js'
import Login from './components/Login.js'
import axios from 'axios'
class App extends Component {
  constructor() {
    super()
    this.state = {
      todos: [
        {
          content: 'hellp',
          cadance: 10,
          hoursRemaining: 10,
          active: true,
          owner: '1',
        },
      ],
      username: '',
      loggedIn: false,
    }
  }
  componentDidMount() {
    console.log('App mounted')
    this.getTodos()
  }
  getTodos = () => {
    console.log('right', this.state.username)
    axios
      .post(
        'http://localhost:8000/api/getTodos',
        {},
        {
          withCredentials: true,
          headers: {
            'Content-Type': 'application/json',
            'Access-Control-Allow-Credentials': true,
          },

          params: {
            name: this.state.username,
          },
        }
      )

      .then((res) => {
        console.log('old state', this.state)
        this.setState({ todos: res.data })
        console.log('new state', this.state)
      })

      .then((e) => {
        console.log(e)
      })
  }
  /*
  getTodos = () => {
    fetch('/api/getTodos')
      .then((res) => res.json())
      .then((todos) =>
        this.setState({ todos }, () => console.log('list fectched', todos))
      )
  }
  */
  handleSuccessfulLogin = (data) => {
    this.setState({
      loggedIn: true,
      username: data,
    })
    console.log('login info', this.state)
  }

  render() {
    //console.log('App', this.state.todos)
    const { loggedIn, todos } = this.state
    return (
      <div>
        {loggedIn ? (
          <div>
            hello {this.state.username}
            <div>
              <AddTodo user={this.state.username} getTodos={this.getTodos} />
              <div>
                {' '}
                <Todos todos={todos} getTodos={this.getTodos} />{' '}
              </div>
            </div>
          </div>
        ) : (
          <div>
            <Login
              handleSuccessfulLogin={this.handleSuccessfulLogin}
              getTodos={this.getTodos}
            />
            <Signup />
          </div>
        )}
      </div>
    )
  }
}

export default App
