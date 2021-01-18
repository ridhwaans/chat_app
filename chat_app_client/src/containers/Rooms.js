import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class Rooms extends Component {
    displayRooms = (rooms) => {
        let usersRooms = null
        if (this.props.currentUser) {
            usersRooms = this.props.currentUser.attributes.channels
        }
        return rooms.map( (room) => {
            const { name } = room.attributes
            return (
            <div key={room.id}>
                <h3>{name}</h3>
                { usersRooms && usersRooms.some( userRoom => userRoom.id === parseInt(room.id) ) ? (
                    <Link to={`/rooms/${room.id}`}><button>Enter</button></Link>
                ) : (
                    <Link to={`/rooms/${room.id}`}><button id={room.id} onClick={this.props.handleSubscribe}>Subscribe</button></Link>
                ) }
            </div>
            )
        })
    }

    render() {
        console.log("PROPS", this.props.allRooms);
        return (
            <div>
                <h1>Current Rooms</h1>
                {this.displayRooms(this.props.allRooms)}
            </div>
        )
    }
}

export default Rooms