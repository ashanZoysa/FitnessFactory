import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Button } from 'react-bootstrap';
import { Container } from 'react-bootstrap';
import Background from './back.jpg';

export default class main extends Component {

    render() {
        return (
            <div >
                <Container style={{ marginTop: '20px', backgroundImage: `url(${Background})`, backgroundPosition: 'right', width: '500px' }}>
                    <hr />
                    <h1 style={{ margin: '5px', display: "flex", justifyContent: "center", alignItems: "center" }}>
                        Inventory Management</h1>
                    <hr />
                    <Link style={{ margin: '40px', display: "flex", justifyContent: "center", alignItems: "center" }}
                        to={"/equipment"}>
                        <Button>View Equipments Details</Button>
                    </Link>
                    <Link style={{ margin: '40px', display: "flex", justifyContent: "center", alignItems: "center" }}
                        to={"/stock"}>
                        <Button>View Products Details</Button>
                    </Link>
                    <hr />
                </Container>
            </div>
        );
    }
}