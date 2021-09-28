import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Button from '@material-ui/core/Button';
import DeleteIcon from '@material-ui/icons/Delete';
import Table from 'react-bootstrap/Table';
import Background from './back.jpg';
import { Container } from 'react-bootstrap';
import { Row } from 'react-bootstrap';
import { Col } from 'react-bootstrap';
import axios from 'axios';

export default class StockDetails extends Component {
    constructor(props) {
        super(props);

        this.deleteStock = this.deleteStock.bind(this)

        this.state = {
            stockID: '',
            stockName: '',
            category: '',
            quantity: 0,
            unitPrice: 0,
            unitCost: 0,
        }
    }
    
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

    componentDidMount() {
        axios.get('http://localhost:5000/Stock/' + this.props.match.params.id)
            .then(response => {

                this.setState({
                    stockID: response.data.stockID,
                    stockName: response.data.stockName,
                    category: response.data.category,
                    quantity: response.data.quantity,
                    unitPrice: response.data.unitPrice,
                    unitCost: response.data.unitCost,
                })
            })
            .catch(function (error) {
                console.log(error);
            })
    }

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

    deleteStock(id) {
        axios.delete('http://localhost:5000/stock/' + id)
            .then(response => { console.log(response.data) });
    }
    
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

    render() {
        return (
            <div style={{ backgroundImage: `url(${Background})`, backgroundPosition: 'right' }}>
                <hr />

                <div style={{ margin: '20px' }}>

                    <h1>{this.state.stockName}</h1>
                    <hr />

                    <Table striped bordered hover variant="light">
                        <tbody>
                            <tr>
                                <td>ID</td>
                                <td>{this.state.stockID}</td>
                            </tr>
                            <tr>
                                <td>Category</td>
                                <td>{this.state.category}</td>
                            </tr>
                            <tr>
                                <td>Quantity</td>
                                <td>{this.state.quantity}</td>
                            </tr>
                            <tr>
                                <td>Unit Price(Rupees)</td>
                                <td>{this.state.unitPrice}</td>
                            </tr>
                            <tr>
                                <td>Total Unit Cost(Rupees)</td>
                                <td>{this.state.quantity * this.state.unitPrice}</td>
                            </tr>
                            <tr>
                                <td>Unit Cost(Rupees)</td>
                                <td>{this.state.unitCost}</td>
                            </tr>
                            <tr>
                                <td>Total Unit Cost(Rupees)</td>
                                <td>{this.state.quantity * this.state.unitCost}</td>
                            </tr>
                        </tbody>
                    </Table>
                    <hr />
                    <Container>
                        <Row style={{ marginTop: '10px' }}>
                            <Col><Link style={{ marginLeft: '50px', display: "flex", justifyContent: "left", alignItems: "left" }} to={"/stock/edit/" + this.props.match.params.id}>
                                <Button variant="contained" color="primary" > Edit </Button>
                            </Link></Col>

                            <Col><Link style={{ marginRight: '50px', display: "flex", justifyContent: "right", alignItems: "right" }} to="/stock" onClick={() => { this.deleteStock(this.props.match.params.id) }}>
                                <Button variant="contained" color="secondary" startIcon={<DeleteIcon />}> Delete </Button>
                            </Link></Col>
                        </Row>
                    </Container>
                </div>
                <hr />
            </div>
        )
    }
}