//Create account component
import React, {useState} from "react";
import axios from 'axios';

//bootstrap imports
import Form from 'react-bootstrap/Form';
import Button from "react-bootstrap/Button";
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
//custom styles
import '../styles/CreateAccount.css';
import NavBar from './NavBar';
import Footer from './Footer';

function CreateAccount(){

    //set states
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [reEnterPassword, setReEnterPassword] = useState("");
    const [accType, setAccType] = useState("");
    const [accLevel, setAccLevel] = useState("");

    //handle change
    function handleSubmit(e){
        e.preventDefault();

        if (password !== reEnterPassword){
            alert("Passwords do not match!")
        }
        else if (accType === ''){
            alert("Select account type!")
        }
        else if (accLevel === ''){
            alert("Select account level!")
        }
        else{
            const newUser = {
                username,
                password,
                accType,
                accLevel
            }
    
            console.log(newUser);

            axios.post("http://localhost:8070/user/createUserAccount", newUser).then(()=>{
                alert("account created")
            }).catch((err)=>{
                alert(err)
            })
        }
    }

    return (
        <div>
            <NavBar/>
            <div className='createAccountBlock'>
                <h1>Create Account</h1>

                <form onSubmit={handleSubmit}>
                    <Form.Group name="username" className="mb-3" controlId="username">
                        <Form.Label>Username</Form.Label>
                        <Form.Control type="text" placeholder="Enter Username" className='formText'
                        onChange = {(e)=>{
                            setUsername(e.target.value);
                        }}
                        />
                    </Form.Group>

                    <Form.Group name="password" className="mb-3" controlId="password">
                        <Form.Label>Password</Form.Label>
                        <Form.Control type="password" placeholder="Password" className='formText'
                        onChange = {(e)=>{
                            setPassword(e.target.value);
                        }}
                        />
                    </Form.Group>

                    <Form.Group name="reEnterPassword" className="mb-3" controlId="reEnterPassword">
                        <Form.Label>Re-enter Password</Form.Label>
                        <Form.Control type="password" placeholder="Re-enter Password" className='formText'
                        onChange = {(e)=>{
                            setReEnterPassword(e.target.value);
                        }}
                        />
                    </Form.Group>

                    <Container>
                        <Row>
                            <Col>
                                <Form.Select name="accType" aria-label="Default select example" 
                                onChange = {(e)=>{
                                    setAccType(e.target.value);
                                }}
                                >
                                    <option>Select Account Type</option>
                                    <option value="customer">Customer</option>
                                    <option value="instructor">Instructor</option>
                                </Form.Select>
                            </Col>
                            <Col>
                                <Form.Select name="accLevel" aria-label="Default select example" 
                                onChange = {(e)=>{
                                    setAccLevel(e.target.value);
                                }}
                                >
                                    <option>Select Account Level</option>
                                    <option value="1">Level 1 (user)</option>
                                    <option value="2">Level 2 (admin)</option>
                                </Form.Select>
                            </Col>
                        </Row>

                        <div className='flex-container'>
                            <Button variant="primary" type="submit" className='btn1'>
                                Create Account
                            </Button>
                        </div>
                    </Container>
                </form>
            </div>
            <Footer/>
        </div>
    );
}

export default CreateAccount;