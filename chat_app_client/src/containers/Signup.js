import "./Signup.css";
import axios from 'axios'
import React, { propTypes, Component } from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Alert from "react-bootstrap/Alert";

class Signup extends Component {
    constructor(props) {
      super(props);
      this.state = { 
        username: '',
        password: '',
        password_confirmation: '',
        errors: ''
       };
    }
  handleChange = (event) => {
      const {name, value} = event.target
      this.setState({
        [name]: value
      })
    };
    
    handleSubmit = (event) => {
      event.preventDefault()
      const {username, password, password_confirmation} = this.state
      let user = {
        username: username,
        password: password,
        password_confirmation: password_confirmation
      }
      axios.post('/users', {user}, {withCredentials: true})
      .then(response => {
        if (response.data.status === "created") {
          this.props.handleLogin(response.data)
          this.redirect()
        } else {
          this.setState({
            errors: response.data.errors
          })
          console.log(response.data.errors)
          this.handleErrors();
        }
      })
      .catch(error => {
        console.log('api errors:', error)
        this.handleErrors();
      })
    };

  redirect = () => {
      this.props.history.push('/')
    };

  handleErrors = () => {
      return (
        [this.state.errors].map((error, idx) => (
          <Alert key={idx} variant='danger'>
            {error}
          </Alert>
        ))
      )
    };

  render() {
    const {username, password, password_confirmation} = this.state
    return (
      <Form onSubmit={this.handleSubmit}>
        <Form.Group controlId="username" size="lg">
          <Form.Label>Username</Form.Label>
          <Form.Control
            autoFocus
            type="text"
            name="username"
            onChange={this.handleChange}
          />
        </Form.Group>
        <Form.Group controlId="password" size="lg">
          <Form.Label>Password</Form.Label>
          <Form.Control
            type="password"
            name="password"
            onChange={this.handleChange}
          />
        </Form.Group>
        <Form.Group controlId="confirmPassword" size="lg">
          <Form.Label>Confirm Password</Form.Label>
          <Form.Control
            type="password"
            name="password_confirmation"
            onChange={this.handleChange}
          />
        </Form.Group>
        <Button
          block
          size="lg"
          type="submit"
          variant="success"
        >
          Signup
        </Button>
      </Form>
    );
  }
}


export default Signup;
