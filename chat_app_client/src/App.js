import './App.css';
import React, { Component } from 'react';
import { Route, Switch } from "react-router-dom";
import { LinkContainer } from "react-router-bootstrap";
import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
import axios from 'axios'
import Routes from "./Routes";
import Home from "./containers/Home";
import Login from "./containers/Login";
import Signup from "./containers/Signup";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = { 
      isLoggedIn: false,
      user: {}
     };
  };

  componentDidMount() {
    this.loginStatus()
  }

  handleLogin = (data) => {
    this.setState({
      isLoggedIn: true,
      user: data.user
    })
  }
  handleLogout = () => {
    this.setState({
    isLoggedIn: false,
    user: {}
    })
  }
  
  loginStatus = () => {
    axios.get('/logged_in', {withCredentials: true})    
  .then(response => {
      if (response.data.logged_in) {
        this.handleLogin(response)
      } else {
        this.handleLogout()
      }
    })
    .catch(error => console.log('api errors:', error))
  };
  
  render() {
    return (
    <div className="App container py-3">
      <Navbar collapseOnSelect bg="light" expand="md" className="mb-3">
        <Navbar.Brand href="/" className="font-weight-bold text-muted">
          Chat
        </Navbar.Brand>
        <Navbar.Toggle />
        <Navbar.Collapse className="justify-content-end">
          <Nav activeKey={window.location.pathname}>
            {this.state.isLoggedIn ? (
              <>
              <Navbar.Text> Welcome, {this.state.user.username} </Navbar.Text>
              <Nav.Item><Nav.Link onClick={this.handleLogout}>Logout</Nav.Link>
              </Nav.Item>
              </>
            ) : (
              <>
                <LinkContainer to="/signup">
                  <Nav.Link>Signup</Nav.Link>
                </LinkContainer>
                <LinkContainer to="/login">
                  <Nav.Link>Login</Nav.Link>
                </LinkContainer>
              </>
            )}
          </Nav>
        </Navbar.Collapse>
      </Navbar>
      <Switch>
      <Route exact path="/">
        <Home />
      </Route>
      <Route exact path="/login"
       render={ (props) => (<Login {...props}
                  handleLogin={this.handleLogin} />) } />
      <Route exact path="/signup"
        render={ (props) => (<Signup {...props}
                  handleLogin={this.handleLogin} />) } />
    </Switch>
    </div>
  );
  }
};

export default App;