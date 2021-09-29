import React, { Component } from 'react';
import axios from 'axios';
import { Redirect } from 'react-router'; 
import workout7 from '../workout7.jpg';


export default class EditTracker extends Component {

    constructor(props){
        super(props);
        this.state={
            clientID:"",
            eventID:"",
            sessionsCompleted:"",
            caloriesBurnt:""
        }
    }

    handleInputChange = (e) =>{
        const {name,value} = e.target;

        this.setState({
            ...this.state,
            [name]:value

        })
    }

    onSubmit = (e) =>{

        e.preventDefault();

        const id = this.props.match.params.id;

        const {clientID,eventID,sessionsCompleted,caloriesBurnt} = this.state;

        const data ={
            
            clientID:clientID,
            eventID:eventID,
            sessionsCompleted:sessionsCompleted,
            caloriesBurnt:caloriesBurnt
        }

        console.log(data)

        axios.put(`/tracker/update/${id}`,data).then((res) =>{
            if(res.data.success){
                alert("Tracker Updated Successfully")
                this.setState(
                    {
                        
                        clientID:"",
                        eventID:"",
                        sessionsCompleted:"",
                        caloriesBurnt:""

                    }
                )
            }
        })

        alert("Tracker has been edited");
        this.setState({ redirect: "/trackerHome" });

    }

    componentDidMount(){

        const id = this.props.match.params.id;

        axios.get(`/tracker/${id}`).then((res) =>{
            if(res.data.success){
                this.setState({
                   
                    clientID:res.data.tracker.clientID,
                    eventID:res.data.tracker.eventID,
                    sessionsCompleted:res.data.tracker.sessionsCompleted,
                    caloriesBurnt:res.data.tracker.caloriesBurnt,
                }); 

                console.log(this.state.tracker);
            }

        });

    }

    render() {
        if (this.state.redirect) {
            return <Redirect to={this.state.redirect} />
          }
        return (
            <div className="container" style={{ backgroundImage: `url(${workout7})`,  backgroundPosition:'center', backgroundSize:'cover' , width:'1100px', height:'600px'}}>
                <h1 className="container">Edit Tracker</h1>
                <form onSubmit = {this.onSubmit}>

                    <br/>
                    <div className="container" style={{marginBottom:'5px'}}>
                        <label style={{marginBottom:'5px'}}><h5>ClientID</h5></label>
                        <input type="text"
                        className="form-control"
                        name="clientID"
                        placeholder="Enter Client ID"
                        value={this.state.clientID}
                        onChange={this.handleInputChange}
                        required/>
                    </div>

                    <div className="container" style={{marginBottom:'5px'}}>
                        <label style={{marginBottom:'5px'}}><h5>Event ID</h5></label>
                        <input type="text"
                        className="form-control"
                        name="eventID"
                        placeholder="Enter Event ID"
                        value={this.state.eventID}
                        onChange={this.handleInputChange}
                        required/>
                    </div>

                    <div className="container" style={{marginBottom:'5px'}}>
                        <label style={{marginBottom:'5px'}}><h5>Sessions Completed</h5></label>
                        <input type="text"
                        className="form-control"
                        name="sessionsCompleted"
                        placeholder="Enter number of sessions completed"
                        value={this.state.sessionsCompleted}
                        onChange={this.handleInputChange}
                        required/>
                    </div>

                    <div className="container" style={{marginBottom:'5px'}}>
                        <label style={{marginBottom:'5px'}}><h5>Calories Burnt</h5></label>
                        <input type="text"
                        className="form-control"
                        name="caloriesBurnt"
                        placeholder="Enter Calories"
                        value={this.state.caloriesBurnt}
                        onChange={this.handleInputChange}
                        required/>
                    </div>

                    &nbsp;&nbsp;

                    <button className="btn btn-success" type="submit" style={{marginTop:'45px'}}>
                        <i className="far fa-check-square"></i>
                        &nbsp; Update
                    </button>

                </form>
            
            </div>
        );
    }
}
