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
        }
    }

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

    componentDidMount() {
        axios.get('http://localhost:5000/equipment/' + this.props.match.params.id)
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

                    <h1 style={{ margin: '5px' }}>Update Equipment Dates</h1>
                    <hr />

                    <form onSubmit={this.onSubmit}>
                        <div style={{ margin: '5px' }}>
                            <label>Name: </label>
                            <input type="text"
                                disabled
                                className="form-control"
                                value={this.state.equipmentName}
                                onChange={this.onChangeEquipmentName}
                            />
                        </div>

                        <div className="form-group">
                            <label>Category: </label>
                            <input type="text"
                                required
                                className="form-control"
                                value={this.state.category}
                                disabled
                            />
                        </div>
                        <div style={{ margin: '5px' }}>
                            <label>Date of purchase: </label>
                            <div>
                                <DatePicker
                                    disabled
                                    selected={this.state.DOP}
                                    onChange={this.onChangeDOP}
                                />
                            </div>
                        </div>

                        <div style={{ margin: '5px' }}>
                            <label>Warranty (in months): </label>
                            <input
                                type="number"
                                disabled
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
                    </form>
                    <hr />
                </Container>
            </div>
        )
    }
}