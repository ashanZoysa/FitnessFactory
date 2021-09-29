import React, { Component } from 'react';
import axios from 'axios';
import { Redirect } from 'react-router';
import workout5 from '../workout5.jpeg';


export default class CreateTracker extends Component {

    constructor(props) {
        super(props);
        this.state = {
            clientID: "",
            eventID: "",
            sessionsCompleted: "",
            caloriesBurnt: ""

        }
    }

    handleInputChange = (e) => {
        const { name, value } = e.target;

        this.setState({
            ...this.state,
            [name]: value

        })
    }

    onSubmit = (e) => {

        e.preventDefault();

        const { clientID, eventID, sessionsCompleted, caloriesBurnt } = this.state;

        const data = {

            clientID: clientID,
            eventID: eventID,
            sessionsCompleted: sessionsCompleted,
            caloriesBurnt: caloriesBurnt
        }

        console.log(data)

        axios.post("/tracker/save", data).then((res) => {
            if (res.data.success) {
                this.setState(
                    {

                        clientID: "",
                        eventID: "",
                        sessionsCompleted: "",
                        caloriesBurnt: ""

                    }
                )
            }
        })

        alert("New Tracker Created");
        this.setState({ redirect: "/trackerHome" });

    }

    render() {
        if (this.state.redirect) {
            return <Redirect to={this.state.redirect} />
        }


        return (
            <div className="container" style={{ backgroundImage: `url(${workout5})`, backgroundPosition: 'center', backgroundSize: 'cover', width: '1100px', height: '570px' }}>
                <h1 className="container">Create New Tracker</h1>
                <form onSubmit = {this.onSubmit}>

                    <br />

                    <div className="container" style={{ marginBottom: '1px' }}>
                        <label style={{ marginBottom: '5px' }}><h5>ClientID</h5></label>
                        <input type="text"
                            className="form-control"
                            name="clientID"
                            placeholder="Enter Client ID"
                            value={this.state.clientID}
                            onChange={this.handleInputChange}
                            required/>
                    </div>

                    <div className="container" style={{ marginBottom: '1px' }}>
                        <label style={{ marginBottom: '5px' }}><h5>Event ID</h5></label>
                        <input type="text"
                            className="form-control"
                            name="eventID"
                            placeholder="Enter Event ID"
                            value={this.state.eventID}
                            onChange={this.handleInputChange}
                            required />
                    </div>

                    <div className="container" style={{ marginBottom: '1px' }}>
                        <label style={{ marginBottom: '5px' }}><h5>Sessions Completed</h5></label>
                        <input type="text"
                            className="form-control"
                            name="sessionsCompleted"
                            placeholder="Enter Number Of Sessions Completed"
                            value={this.state.sessionsCompleted}
                            onChange={this.handleInputChange}
                            required />

                    </div>

                    <div className="container" style={{ marginBottom: '1px' }}>
                        <label style={{ marginBottom: '5px' }}><h5>Calories Burnt</h5></label>
                        <input type="text"
                            className="form-control"
                            name="caloriesBurnt"
                            placeholder="Enter Total Calories Burnt"
                            value={this.state.caloriesBurnt}
                            onChange={this.handleInputChange}
                            required />
                    </div>

                    &nbsp;&nbsp;&nbsp;&nbsp;

                    <button className="btn btn-success" type="submit" style={{ marginTop: '30px' }}>
                        <i className="far fa-check-square"></i>
                        &nbsp; Save
                    </button>

                </form>

            </div>
        );
    }
}
