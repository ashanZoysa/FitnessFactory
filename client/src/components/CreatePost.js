import React, { Component } from 'react';
import axios from 'axios';
import { Redirect } from 'react-router'; 
import workout3 from '../workout3.jpg';

export default class CreatePost extends Component {

    constructor(props){
        super(props);
        this.state={
            event:"",
            description:"",
            eventCategory:"",
            calories:""
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

        const {event,description,eventCategory,calories} = this.state;

        const data ={
            
            event:event,
            description:description,
            eventCategory:eventCategory,
            calories:calories
        }

        console.log(data)

        axios.post("/post/save",data).then((res) =>{
            if(res.data.success){
                this.setState(
                    {
                        
                        event:"",
                        description:"",
                        eventCategory:"",
                        calories:""

                    }
                )
            }
        })

        alert("New Event Created");
        this.setState({ redirect: "/" });

    }

    render() {
        if (this.state.redirect) {
            return <Redirect to={this.state.redirect} />
          }
        return (
            <div className="container" style={{ backgroundImage: `url(${workout3})`,  backgroundPosition:'center', backgroundSize:'cover' , width:'1100px', height:'570px'}}>
                <h1 className="h3 mb-3 font-weight-normal">Create New Event</h1>
                <form onSubmit = {this.onSubmit}>

                    <div className="container" style={{marginBottom:'2px'}}>
                        <label style={{marginBottom:'2px'}}><h6>Event</h6></label>
                        <input type="text"
                        className="form-control"
                        name="event"
                        placeholder="Enter Event"
                        value={this.state.event}
                        onChange={this.handleInputChange}
                        required/>
                    </div>

                    <div className="container" style={{marginBottom:'2px'}}>
                        <label style={{marginBottom:'2px'}}><h6>Description</h6></label>
                        <input type="text"
                        className="form-control"
                        name="description"
                        placeholder="Enter Description"
                        value={this.state.description}
                        onChange={this.handleInputChange}
                        required/>
                    </div>

                    <div className="container" style={{marginBottom:'1px'}}>
                        <label style={{marginBottom:'1px'}}><h6>Event Category</h6></label>
                        <input type="text"
                        className="form-control"
                        name="eventCategory"
                        placeholder="Enter Event Category"
                        value={this.state.eventCategory}
                        onChange={this.handleInputChange}
                        required/>
                    </div>

                    <div className="container" style={{marginBottom:'1px'}}>
                        <label style={{marginBottom:'1px'}}><h6>Calories</h6></label>
                        <input type="text"
                        className="form-control"
                        name="calories"
                        placeholder="Enter Calories Burnt Per Session"
                        value={this.state.calories}
                        onChange={this.handleInputChange}
                        required/>
                    </div>

                    &nbsp;&nbsp;&nbsp;&nbsp;
                
                    <button className="btn btn-success" type="submit" style={{marginTop:'40px'}}>
                        <i className="far fa-check-square"></i>
                        &nbsp; Save
                    </button>

                </form>
            
            </div>
        );
    }
}
