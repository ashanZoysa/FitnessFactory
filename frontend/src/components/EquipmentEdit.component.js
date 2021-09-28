import React, { Component } from 'react';
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";
import { Container } from 'react-bootstrap';
import Button from '@material-ui/core/Button';
import SaveIcon from '@material-ui/icons/Save';
import axios from 'axios';
import Background from './back.jpg';

export default class EquipmentEdit extends Component {
    constructor(props) {
        super(props);

        this.onChangeEquipmentName = this.onChangeEquipmentName.bind(this);
        this.onChangeCategory = this.onChangeCategory.bind(this);
        this.onChangeDOP = this.onChangeDOP.bind(this);
        this.onChangeWarranty = this.onChangeWarranty.bind(this);
        this.onChangeLastRD = this.onChangeLastRD.bind(this);
        this.onChangeNextRD = this.onChangeNextRD.bind(this);
        this.onSubmit = this.onSubmit.bind(this);

        this.state = {
            equipmentName: '',
            category: '',
            DOP: new Date(),
            warranty: 0,
            lastRD: new Date(),
            nextRD: new Date(),
            categorys: []
        }
    }

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

    componentDidMount() {
        axios.get('http://localhost:5000/equipment/'+this.props.match.params.id)
      .then(response => {
        this.setState({
            equipmentName: response.data.equipmentName,
            category: response.data.category,
            DOP: new Date(response.data.DOP),
            warranty: response.data.warranty,
            lastRD: new Date(response.data.lastRD),
            nextRD: new Date(response.data.nextRD)
        })   
      })
      .catch(function (error) {
        console.log(error);
      })

        this.setState({
            categorys: ['Treadmills', 'Bikes', 'Rowing Machines', 'Benches', 'Crosstrainers'],
        })
        console.log(this.state);
    }

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

    onChangeEquipmentName(e) {
        this.setState({
            equipmentName: e.target.value
        })
    }

    onChangeCategory(e) {
        this.setState({
            category: e.target.value
        })
    }

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

    onChangeDOP(date) {
        this.setState({
            DOP: date
        })
    }

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

    onChangeWarranty(e) {
        this.setState({
            warranty: e.target.value
        })
    }

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

    onChangeLastRD(date) {
        this.setState({
            lastRD: date
        })
    }

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

    onChangeNextRD(date) {
        this.setState({
            nextRD: date
        })
    }

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

    onSubmit(e) {
        e.preventDefault();

        const equipment = {
            equipmentName: this.state.equipmentName,
            category: this.state.category,
            DOP: this.state.DOP,
            warranty: this.state.warranty,
            lastRD: this.state.lastRD,
            nextRD: this.state.nextRD
        }

        console.log(equipment);

        axios.post('http://localhost:5000/equipment/update/' + this.props.match.params.id, equipment)
            .then(res => console.log(res.data));

            window.location = '/equipment';

    }
    
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

    render() {
        return (
            <div style={{ backgroundImage: `url(${Background})`, backgroundPosition: 'right' }}>
                <hr />
                <Container style={{ marginTop: '5px' }}>

                    <h1 style={{ margin: '5px' }}>Edit Equipment</h1>
                    <hr />

                    <form onSubmit={this.onSubmit}>
                        <div style={{ margin: '5px' }}>
                            <label>Name: </label>
                            <input type="text"
                                required
                                className="form-control"
                                value={this.state.equipmentName}
                                onChange={this.onChangeEquipmentName}
                            />
                        </div>

                        <div style={{ margin: '5px' }}>
                            <label>Category: </label>
                            <select ref="userInput"
                                required
                                className="form-select"
                                value={this.state.category}
                                onChange={this.onChangeCategory}>
                                {
                                    this.state.categorys.map(function (categorys) {
                                        return <option
                                            key={categorys}
                                            value={categorys}>{categorys}
                                        </option>;
                                    })
                                }
                            </select>
                        </div>
                        <div style={{ margin: '5px' }}>
                            <label>Date of purchase: </label>
                            <div>
                                <DatePicker
                                    selected={this.state.DOP}
                                    onChange={this.onChangeDOP}
                                />
                            </div>
                        </div>

                        <div style={{ margin: '5px' }}>
                            <label>Warranty (in months): </label>
                            <input
                                type="number"
                                className="form-control"
                                value={this.state.warranty}
                                onChange={this.onChangeWarranty}
                            />
                        </div>
                        <div style={{ margin: '5px' }}>
                            <label>Last Repaired Date: </label>
                            <div>
                                <DatePicker
                                    selected={this.state.lastRD}
                                    onChange={this.onChangeLastRD}
                                />
                            </div>
                        </div>
                        <div style={{ margin: '5px' }}>
                            <label>Next Repair Date: </label>
                            <div>
                                <DatePicker
                                    selected={this.state.nextRD}
                                    onChange={this.onChangeNextRD}
                                />
                            </div>
                        </div>
                        <hr />
                        <div style={{ margin: '5px' }}>
                            <Button variant="contained" type="submit" color="primary" startIcon={<SaveIcon />}>
                            Save
                            </Button>
                        </div>
                        <hr />
                    </form>
                </Container>
            </div>
        )
    }
}