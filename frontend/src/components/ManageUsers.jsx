//Create home component
import React, { useEffect, useState } from "react";
import axios from "axios";

//import components
import NavBar from "./NavBar";
import Footer from "./Footer";
import Form from 'react-bootstrap/Form';
import Container from 'react-bootstrap/Container';

const ManageUsers = () => {
  //states
  const [users, setUsers] = useState([]);

  //retrieve users
  function retrieveUsers() {
    axios.get("http://localhost:8070/user/getUser").then((res) => {
      if (res.data.success) {
        setUsers(res.data.existingUsers);
      }
      console.log(users);
    });
  }

  useEffect(() => {
    retrieveUsers()
  },[])

  function deleteUser(id){
      axios.delete(`http://localhost:8070/user/deleteUser/` + id).then((res) => {
          alert("user deleted");
          this.retrieveUsers();
      }).catch((err)=>{
          console.log(err);
      })
  }
  

  return (
    <div>
      <NavBar />
      <h4>User Accounts Management</h4>
      <Container>
      <table className="table">
        <thread>
          <tr>
            <th scope="col">#</th>
            <th scope="col">Username</th>
            <th scope="col">Type</th>
            <th scope="col">Level</th>
            <th scope="col">Remove User</th>
          </tr>
        
        
          <tbody>
            {users.map((users, index) => (
              <tr>
                <th scope="row">{index + 1}</th>
                <td>{users.username}</td>
                <td>{users.accType}&nbsp;&nbsp;</td>
                <td>
                    <Form.Select
                        name="accLevel"
                        aria-label="Default select example"
                    >
                        <option>{users.accLevel}</option>
                        <option value="1">Level 1 (user)</option>
                        <option value="2">Level 2 (admin)</option>
                    </Form.Select>
                </td>
    
                <td>
                  <button className="btn btn-danger" onClick={deleteUser(users._id)}>
                    Delete User
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
          </thread>
      </table>
      </Container>

      <Footer />
    </div>
  );
};

export default ManageUsers;
