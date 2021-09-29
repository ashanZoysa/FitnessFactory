import React, { Component } from 'react';
import axios from 'axios';
import workout4 from '../workout4.jpg';

export default class ProgressDetails extends Component {
    constructor(props){
        super(props);

        this.state={
            tracker:{}
        };
    }

    componentDidMount(){

        const id = this.props.match.params.id;

        axios.get(`/tracker/${id}`).then((res) =>{
            if(res.data.success){
                this.setState({
                    tracker:res.data.tracker
                }); 

                console.log(this.state.tracker);
            }

        });

    }

    render() {
        const {clientID,eventID,sessionsCompleted,caloriesBurnt} = this.state.tracker;

        return (
            <div style={{marginTop:'5px', backgroundImage: `url(${workout4})`,  backgroundPosition:'cover', backgroundSize:'cover' , width:'1250px', height:'600px'}}>
            <h1>Progress Tracker</h1>
            <hr/>

            <dl className="row">

                <dt className="col-sm-3"  ><h3>Client ID</h3></dt>
                <dd className="col-sm-9" ><h3>{clientID}</h3><br/></dd>

                <dt className="col-sm-3" ><h3>Event ID</h3></dt>
                <dd className="col-sm-9"><h3>{eventID}</h3><br/></dd>

                <dt className="col-sm-3"><h3>Sessions Completed&nbsp;&nbsp;&nbsp;</h3></dt>
                <dd className="col-sm-9"><h3>{sessionsCompleted}</h3><br/></dd>

                <dt className="col-sm-3"><h3>Calories Burnt</h3></dt>
                <dd className="col-sm-9"><h3>{caloriesBurnt}</h3><br/></dd>
                
            </dl>  
            </div>
        )
        
    }
}
