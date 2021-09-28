import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import Button from '@material-ui/core/Button';
import DeleteIcon from '@material-ui/icons/Delete';
import Table from 'react-bootstrap/Table';
import Background from './back.jpg';
import { Container } from 'react-bootstrap';
import { Row } from 'react-bootstrap';
import { Col } from 'react-bootstrap';

export default class EquipmentDetails extends Component {
    constructor(props) {
        super(props);

        this.deleteEquipment = this.deleteEquipment.bind(this)
        this.getNumberOfDays = this.getNumberOfDays.bind(this)

        this.state = {
            equipmentID: '',
            equipmentName: '',
            category: '',
            DOP: '',
            warranty: 0,
            lastRD: '',
            nextRD: '',
            remDates: '',
        }
    }

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

    componentDidMount() {
        axios.get('http://localhost:5000/equipment/' + this.props.match.params.id)
            .then(response => {
                this.setState({
                    equipmentID: response.data.equipmentID,
                    equipmentName: response.data.equipmentName,
                    category: response.data.category,
                    DOP: response.data.DOP.substring(0, 10),
                    warranty: response.data.warranty,
                    lastRD: response.data.lastRD.substring(0, 10),
                    nextRD: response.data.nextRD.substring(0, 10),
                    remDates: this.getNumberOfDays(response.data.nextRD.substring(0, 10))
                })
            })
            .catch(function (error) {
                console.log(error);
            })

    }

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

    deleteEquipment(id) {
        axios.delete('http://localhost:5000/equipment/' + id)
            .then(response => { console.log(response.data) });

    }

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

    getNumberOfDays(start) {
        const date = new Date(start);
        const tdy = new Date();

        const oneDay = 1000 * 60 * 60 * 24;
        const diffInTime = date.getTime() - tdy.getTime();
        const diffInDays = Math.round(diffInTime / oneDay);

        return diffInDays;
    }
    
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

    render() {
        return (
            <div style={{ backgroundImage: `url(${Background})`, backgroundPosition: 'right' }}>
                <hr />

                <div style={{ margin: '20px' }}>

                    <h1>{this.state.equipmentName}</h1>
                    <hr />

                    <Table striped bordered hover variant="light">
                        <tbody>
                            <tr>
                                <td>ID</td>
                                <td>{this.state.equipmentID}</td>
                            </tr>
                            <tr>
                                <td className="col-sm-3">Category</td>
                                <td className="col-sm-9">{this.state.category}</td>
                            </tr>
                            <tr>
                                <td className="col-sm-3">Date of purchase</td>
                                <td className="col-sm-9">{this.state.DOP}</td>
                            </tr>
                            <tr>
                                <td className="col-sm-3">Warranty (in months)</td>
                                <td className="col-sm-9">{this.state.warranty}</td>
                            </tr>
                            <tr>
                                <td className="col-sm-3">Last Repaired Date</td>
                                <td className="col-sm-9">{this.state.lastRD}</td>
                            </tr>
                            <tr>
                                <td className="col-sm-3">Next Repair Date</td>
                                <td className="col-sm-9">{this.state.nextRD}</td>
                            </tr>
                            <tr>
                                <td className="col-sm-3">Days until next repair date</td>
                                <td className="col-sm-9">{this.state.remDates + ' days'}</td>
                            </tr>
                        </tbody>
                    </Table>
                    <hr />
                    <Container>
                        <Row style={{ marginTop: '10px' }}>
                            <Col><Link style={{ marginLeft: '50px', display: "flex", justifyContent: "left", alignItems: "left" }} to={"/equipment/edit/" + this.props.match.params.id}>
                                <Button variant="contained" color="primary" > Edit </Button>
                            </Link></Col>

                            <Col><Link style={{ display: "flex", justifyContent: "center", alignItems: "center" }} to={"/equipment/editdates/" + this.props.match.params.id}>
                                <Button variant="contained" color="primary" > Update Dates </Button>
                            </Link></Col>

                            <Col><Link style={{ marginRight: '50px', display: "flex", justifyContent: "right", alignItems: "right" }} to="/equipment" onClick={() => { this.deleteEquipment(this.props.match.params.id) }}>
                                <Button variant="contained" color="secondary" startIcon={<DeleteIcon />}> Delete </Button>
                            </Link></Col>
                        </Row>
                    </Container>
                </div>
                <hr />
            </div >
        )
    }
}