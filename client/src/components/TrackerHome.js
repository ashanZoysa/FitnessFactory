import React, { Component } from 'react';
import axios from 'axios';
import workout8 from '../workout8.jpg';
import { Link } from 'react-router-dom';

export default class TrackerHome extends Component {
constructor(props){
    super(props);

    this.state={
        trackers:[]
    
    }; 
}

componentDidMount(){
    this.retrieveTrackers();
}


retrieveTrackers(){
    axios.get("/trackers").then(res =>{
        if(res.data.success){
            this.setState({
                trackers:res.data.existingTrackers
            });

            console.log(this.state.trackers)
        }

    });

}

onDelete = (id) =>{

    axios.delete(`/tracker/delete/${id}`).then((res) =>{

        alert("Tracker Deleted Successfully");
        this.retrieveTrackers();
    })
}

filterData(trackers,searchKey){

const result = trackers.filter((tracker) =>

    tracker.clientID.toLowerCase().includes(searchKey)||
    tracker.eventID.toLowerCase().includes(searchKey)||
    tracker.sessionsCompleted.toLowerCase().includes(searchKey)||
    tracker.caloriesBurnt.toLowerCase().includes(searchKey)
)

this.setState({trackers:result})

}

handleSearchArea = (e) =>{
    const searchKey = e.currentTarget.value;

    axios.get("/trackers").then(res =>{
        if(res.data.success){
            
            this.filterData(res.data.existingTrackers,searchKey)

        }

    });
}

    render() {
        return (
            <div className="container" style={{ backgroundImage: `url(${workout8})`,  backgroundPosition:'center', backgroundSize:'cover' , width:'1100px', height:'600px'}}>
              
              <br/>
              <h4>All Trackers</h4>

            <div className="input-group">
            <input 
            type="search" 
            className="form-control rounded" 
            placeholder="Please enter here to search..." 
            name="searchQuery"
            aria-label="Search" 
            aria-describedby="search-addon"
            onChange={this.handleSearchArea} />

            </div>
            <br/>

              <table className="table">
                  <thead>
                    <tr>
                        
                        <th scope="col"><h5><center>Client ID</center></h5></th>
                        <th scope="col"><h5><center>Event ID</center></h5></th>
                        <th scope="col"><h5><center>Sessions Completed</center></h5></th>
                        <th scope="col"><h5><center>Calories Burnt</center></h5></th>
                        <th scope="col"><h5>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Action</h5></th>
                    </tr> 
                </thead>

                <tbody>
                    {this.state.trackers.map((trackers,index) =>(
                        <tr key={index}>
                            
                            <td><h6><center>{trackers.clientID}</center></h6></td> 
                            <td>
                                <Link to={`/tracker/${trackers._id}`} style={{textDecoration:'none'}}>
                                <h6><center>{trackers.eventID}</center></h6>
                                </Link> 
                                </td> 
                            <td><h6><center>{trackers.sessionsCompleted}</center></h6></td>
                            <td><h6><center>{trackers.caloriesBurnt}</center></h6></td>        
                            <td>
                                <Link className="btn btn-warning" to={`/editTracker/${trackers._id}`}>
                                    <i className="fas fa-edit"></i>&nbsp;Edit
                                </Link>
                                &nbsp;&nbsp;&nbsp;&nbsp;
                                <Link className="btn btn-danger" to="#" onClick={() =>this.onDelete(trackers._id)}>
                                    <i className="far fa-trash-alt"></i>&nbsp;Delete
                                </Link>
                                &nbsp;&nbsp;&nbsp;&nbsp;
                                

                            </td>

                        </tr>

                    ))}

                </tbody>

            </table> 

            <button className="btn btn-success"><Link to="/addTracker" style={{textDecoration:'none',color:'white'}}>Create New Tracker</Link></button>

        </div>
        )         
    }   
}
