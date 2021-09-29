import React, { Component } from 'react';
import axios from 'axios';
import { Redirect } from 'react-router';
import workout2 from '../workout2.jpg'; 

export default class EditPost extends Component {

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
            [name]:value

        })
    }

    onSubmit = (e) =>{

        e.preventDefault();

        const id = this.props.match.params.id;

        const {event,description,eventCategory,calories} = this.state;

        const data ={
            
            event:event,
            description:description,
            eventCategory:eventCategory,
            calories:calories
        }

        console.log(data)

        axios.put(`/post/update/${id}`,data).then((res) =>{
            if(res.data.success){
                alert("Event Updated Successfully")
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

        alert("Event has been edited");
        this.setState({ redirect: "/" });

    }

    componentDidMount(){

        const id = this.props.match.params.id;

        axios.get(`/post/${id}`).then((res) =>{
            if(res.data.success){
                this.setState({
                   
                    event:res.data.post.event,
                    description:res.data.post.description,
                    eventCategory:res.data.post.eventCategory,
                    calories:res.data.post.calories,
                }); 

                console.log(this.state.post);
            }

        });

    }

    render() {
        if (this.state.redirect) {
            return <Redirect to={this.state.redirect} />
          }
        return (
            <div className="container" style={{ backgroundImage: `url(${workout2})`,  backgroundPosition:'center', backgroundSize:'cover' , width:'1100px', height:'570px'}}>
                <h1 className="container">Edit Event</h1>
                <form onSubmit = {this.onSubmit}>

                   <br/>
                    <div className="container" style={{marginBottom:'5px'}}>
                        <label style={{marginBottom:'5px'}}><h5>Event</h5></label>
                        <input type="text"
                        className="form-control"
                        name="event"
                        placeholder="Enter Event"
                        value={this.state.event}
                        onChange={this.handleInputChange}
                        required/>
                    </div>

                    <div className="container" style={{marginBottom:'5px'}}>
                        <label style={{marginBottom:'5px'}}><h5>Description</h5></label>
                        <input type="text"
                        className="form-control"
                        name="description"
                        placeholder="Enter Description"
                        value={this.state.description}
                        onChange={this.handleInputChange}
                        required/>
                    </div>

                    <div className="container" style={{marginBottom:'5px'}}>
                        <label style={{marginBottom:'5px'}}><h5>Event Category</h5></label>
                        <input type="text"
                        className="form-control"
                        name="eventCategory"
                        placeholder="Enter Event Category"
                        value={this.state.eventCategory}
                        onChange={this.handleInputChange}
                        required/>
                    </div>

                    
                    <div className="container" style={{marginBottom:'5px'}}>
                        <label style={{marginBottom:'5px'}}><h5>Calories</h5></label>
                        <input type="text"
                        className="form-control"
                        name="calories"
                        placeholder="Enter Calories"
                        value={this.state.calories}
                        onChange={this.handleInputChange}
                        required/>
                    </div>

                    &nbsp;&nbsp;

                    <button className="btn btn-success" type="submit" style={{marginTop:'35px'}}>
                        <i className="far fa-check-square"></i>
                        &nbsp; Update
                    </button>

                </form>
            
            </div>
        );
    }
}
