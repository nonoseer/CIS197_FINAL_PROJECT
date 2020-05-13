import React, { Component } from 'react'
const axios = require('axios')
axios.default.withCredentials = true
export class AddTodo extends Component {
  constructor(props) {
    super(props)

    this.state = {
      Cadance: 0,
      Message: '',
    }
  }
  onChange = (e) => {
    e.preventDefault()
    this.setState({ [e.target.name]: e.target.value })
  }
  onSubmit = (e) => {
    const { Cadance, Message } = this.state
    e.preventDefault()
    axios
      .post(
        ' http://localhost:8000/api/todos/add',
        {},
        {
          headers: {
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': 'http://localhost:3000',
          },

          params: {
            content: Message,
            cadance: Cadance,
            owner: this.props.user,
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
  render() {
    const { Cadance, Message } = this.state
    return (
      <div className="container">
        <form id="contact" onSubmit={this.onSubmit}>
          <fieldset>
            <div>Cadance</div>
            <input
              type="number"
              name="Cadance"
              placeholder="Cadance"
              value={Cadance}
              onChange={this.onChange}
              style={{ width: '20px', height: '20px' }}
            />
          </fieldset>
          <fieldset>
            <textarea
              type="text"
              name="Message"
              placeholder="Write a new Post..."
              style={{ width: '600px', height: '150px' }}
              value={Message}
              onChange={this.onChange}
              rows="4"
              cols="50"
            >
              {' '}
            </textarea>
          </fieldset>
          <fieldset>
            <input type="submit" value="Submit" className="btn" />
          </fieldset>
        </form>
      </div>
    )
  }
}

export default AddTodo
