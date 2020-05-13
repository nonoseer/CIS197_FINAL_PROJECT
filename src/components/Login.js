import React, { Component } from 'react'
const axios = require('axios')
axios.default.withCredentials = true

export class Login extends Component {
  constructor(props) {
    super(props)

    this.state = {
      Name: '',
      Password: '',
    }
  }
  onChange = (e) => {
    e.preventDefault()
    this.setState({ [e.target.name]: e.target.value })
  }
  onSubmit = (e) => {
    const { Name, Password } = this.state
    e.preventDefault()
    axios
      .post(
        ' http://localhost:8000/account/login',
        {},
        {
          withCredentials: true,
          headers: {
            'Content-Type': 'application/json',
            //  'Access-Control-Allow-Origin': 'http://localhost:3000',
            'Access-Control-Allow-Credentials': true,
            // 'Access-Control-Max-Age': 1,
          },

          params: {
            name: Name,
            password: Password,
          },
        }
      )

      .then((res) => {
        this.props.handleSuccessfulLogin(res.config.params.name)
        this.props.getTodos()
      })

      .then((e) => {
        console.log(e)
      })
  }
  render() {
    const { Name, Password } = this.state
    return (
      <div className="container">
        <form id="contact" onSubmit={this.onSubmit}>
          <input
            type="text"
            name="Name"
            placeholder="Name"
            value={Name}
            onChange={this.onChange}
          />
          <input
            type="text"
            name="Password"
            placeholder="Password"
            value={Password}
            onChange={this.onChange}
          />{' '}
          <input type="submit" value="Login" className="btn" />
        </form>
      </div>
    )
  }
}

export default Login
