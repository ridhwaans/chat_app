import './App.css';
import React, { Component } from 'react';
import { Route, Switch, Redirect } from "react-router-dom";
import { LinkContainer } from "react-router-bootstrap";
import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
import axios from 'axios'
import Home from "./containers/Home";
import Login from "./containers/Login";
import Signup from "./containers/Signup";
import Rooms from './containers/Rooms';
import RoomShow from './containers/RoomShow';
import { AppContext } from "./libs/contextLib";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = { 
      isLoggedIn: false,
      user: {},
      allRooms: [],
      currentRoom: {
        room: {}, 
        users: [],
        messages: []
      }
     };
  };
  
  componentDidMount() {
  }

  handleLogin = (data) => {
    this.setState({
      isLoggedIn: true,
      user: data.user
    })
    fetch('/channels')
    .then(resp => resp.json())
    .then(result => {
      this.setState({
        allRooms: result.data
      })
    })
  }
  handleLogout = () => {
    this.setState({
    isLoggedIn: false,
    user: {}
    })
  }
  
  updateAppStateRoom = (newRoom) => {
    this.setState({
      currentRoom: {
        room: newRoom.room.data,
        users: newRoom.users,
        messages: newRoom.messages
      }
    })
  }

  getRoomData = (id) => {
    fetch(`/rooms/${id}`)
    .then(response => response.json())
    .then(result => {
      this.setState({
        currentRoom: {
          room: result.data,
          users: result.data.attributes.users,
          messages: result.data.attributes.messages
        }
      })
    })
  }

  subscribeToRoom = (event) => {
    const room_id = event.target.id
    this.state.isLoggedIn ? (this.postFirstMessage(room_id)) : (alert('You must be logged in to subscribe to a room.'))
  }

  postFirstMessage = (roomId) => {
    window.history.pushState(null, null, `/rooms/${roomId}`)
    const message = {
      content: `${this.state.currentUser.attributes.username} has joined this room!`,
      user_id: this.state.user.id,
      channel_id: roomId
    }
    fetch("/messages", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            Accept: "application/json"
        },
        body: JSON.stringify({message: message})
    })
    .then(resp => resp.json())
    .then(result => {
        console.log(result)
    })
  }

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
              <Navbar.Text> Welcome, {this.state.user.data.attributes.username} </Navbar.Text>
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
        <Route exact path='/rooms' 
          render={ (props) => (<Rooms {...props}
                allRooms={this.state.allRooms}
                handleSubscribe={this.subscribeToRoom}
                currentUser={this.state.user.data}
              />
            )} />
        <Route exact path='/rooms/:id' 
          render={ (props) => {
            return this.state.isLoggedIn ? (<RoomShow {...props}
            cableApp={this.props.cableApp}
            getRoomData={this.getRoomData}
            updateApp={this.updateAppStateRoom}
            roomData={this.state.currentRoom}
            currentUser={this.state.user.data}
          />
          ) : (
            <Redirect to='/rooms' />
          )
          }} />
      </Switch>
    </div>
  );
  }
};

export default App;