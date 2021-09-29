import React, { Component } from 'react';
import axios from 'axios';
import workout6 from '../workout6.jpg';

export default class PostDetails extends Component {
    constructor(props){
        super(props);

        this.state={
            post:{}
        };
    }

    componentDidMount(){

        const id = this.props.match.params.id;

        axios.get(`/post/${id}`).then((res) =>{
            if(res.data.success){
                this.setState({
                    post:res.data.post
                }); 

                console.log(this.state.post);
            }

        });

    }

    render() {
        const {eventID,event,description,eventCategory,calories} = this.state.post;

        return (
            <div style={{marginTop:'20px', backgroundImage: `url(${workout6})`,  backgroundPosition:'center', backgroundSize:'cover' , width:'1100px', height:'570px'}}>
            <h1>{event}</h1><br/>
            <hr/>

            <dl className="row">

                <dt className="col-sm-3"><h3>Event ID</h3></dt>
                <dd className="col-sm-9"><h3>{eventID}</h3><br/></dd>
            
                <dt className="col-sm-3"><h3>Description</h3></dt>
                <dd className="col-sm-9"><h3>{description}</h3><br/></dd>

                <dt className="col-sm-3"><h3>Event Category</h3></dt>
                <dd className="col-sm-9"><h3>{eventCategory}</h3><br/></dd>

                <dt className="col-sm-3"><h3>Calories</h3></dt>
                <dd className="col-sm-9"><h3>{calories}</h3><br/></dd>
                
            </dl>  
            </div>
        )
        
    }
}
