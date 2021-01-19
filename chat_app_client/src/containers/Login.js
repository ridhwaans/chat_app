import "./Login.css";
import axios from 'axios'
import React, { PropTypes, Component } from "react";
import { Link } from 'react-router-dom'
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";

class Login extends Component {
    constructor(props) {
      super(props);
      this.state = { 
        username: '',
        password: '',
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
        const {username, password} = this.state
        let user = {
          username: username,
          password: password
        }
        
    axios.post('/login', {user}, {withCredentials: true})
        .then(response => {
          if (response.data.logged_in) {
            this.props.handleLogin(response.data)
            this.redirect();
          } else {
            this.setState({
              errors: response.data.errors
            })
          }
        })
        .catch(error => {
          this.handleErrors();
          console.log('api errors:', error)
        })
      };


    redirect = () => {
        this.props.history.push('/')
      }

    handleErrors = () => {
      };


    render() {
        const {username, password} = this.state
        return (
            <div className="Login">
            <Form onSubmit={this.handleSubmit}>
                <Form.Group size="lg" controlId="username">
                <Form.Label>Username</Form.Label>
                <Form.Control
                    autoFocus
                    type="text"
                    name="username"
                    onChange={this.handleChange}
                />
                </Form.Group>
                <Form.Group size="lg" controlId="password">
                <Form.Label>Password</Form.Label>
                <Form.Control
                    type="password"
                    name="password"
                    onChange={this.handleChange}
                />
                </Form.Group>
                <Button block size="lg" type="submit">
                Login
                </Button>
                <div>
                    or <Link to='/signup'>sign up</Link>
                </div>
            </Form>
            </div>
        );
    }
}
export default Login;