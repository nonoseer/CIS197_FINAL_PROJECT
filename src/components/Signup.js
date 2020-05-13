import React, { Component } from 'react'
const axios = require('axios')
axios.default.withCredentials = true

export class Signup extends Component {
  constructor(props) {
    super(props)

    this.state = {
      Name: '',
      Password: '',
      PhoneNumber: null,
    }
  }
  onChange = (e) => {
    e.preventDefault()
    this.setState({ [e.target.name]: e.target.value })
  }
  onSubmit = (e) => {
    const { Name, Password, PhoneNumber } = this.state
    e.preventDefault()
    axios
      .post(
        ' http://localhost:8000/account/signup',
        {},
        {
          withCredentials: true,
          headers: {
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': 'http://localhost:3000',
            'Access-Control-Allow-Credentials': true,
          },

          params: {
            name: Name,
            password: Password,
            phoneNumber: PhoneNumber,
          },
        }
      )

      .then((res) => {
        console.log(res)
        alert('You just signed up!')
      })

      .then((e) => {
        alert('username already in use')
        console.log(e)
      })

    this.setState({
      Name: '',
      Password: '',
      PhoneNumber: null,
    })
  }
  render() {
    const { Name, Password, PhoneNumber } = this.state
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
          <input
            type="number"
            name="PhoneNumber"
            placeholder="Phone Number"
            onInput={this.onChange}
            value={PhoneNumber}
          />
          <input type="submit" value="Sign Up" className="btn" />
        </form>
      </div>
    )
  }
}

export default Signup
