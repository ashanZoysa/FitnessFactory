//Login component
import React, { useState } from "react";
import axios from 'axios';

//react bootstrap imports
import Form from 'react-bootstrap/Form';
import Button from "react-bootstrap/Button";
import '../styles/Login.css';

function Login(){
    //states
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    const login = (e) =>{
        e.preventDefault();

        const user = {
            username,
            password
        }

        axios.post("http://localhost:8070/user/login", user).then((res) => {
            alert("Login successful!")
            console.log(res);
            console.log(user);
            window.location.href = "/homePage";
        }).catch((err) => {
            console.log(err)
        })
    }

    return (
        <div className="loginBody">
            <div className="loginBlock">

                <div>
                    <h1 className="logoBox">Fitness Factory</h1>
                </div>

                <Form onSubmit={login}>
                    <Form.Group className="mb-3" controlId="formUsername">
                        <Form.Label>Username</Form.Label>
                        <Form.Control type="text" placeholder="Enter email" className='formText'
                        onChange = {(e) => {
                            setUsername(e.target.value);
                        }}/>
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="formPassword">
                        <Form.Label>Password</Form.Label>
                        <Form.Control type="password" placeholder="Password" className='formText'
                        onChange = {(e) => {
                            setPassword(e.target.value);
                        }}/>
                    </Form.Group>
        
                    <div className='flex-container'>
                        <Button variant="primary" type="submit" className='loginBtn'>
                            Log In
                        </Button>
                    </div>
                </Form>
            </div>
        </div>
    );
}

export default Login;