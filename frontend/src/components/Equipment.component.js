import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Button } from 'react-bootstrap';
import { Container } from 'react-bootstrap';
import { Row } from 'react-bootstrap';
import { Col } from 'react-bootstrap';
import Table from 'react-bootstrap/Table';
import axios from 'axios';
import Background from './back.jpg';

const Equipment = props => (

  <tr>
    <td>{props.equipment.equipmentID}</td>
    <td><Link style={{ textDecoration: 'none' }} to={"/equipment/details/" + props.equipment._id}>{props.equipment.equipmentName} </Link></td>
    <td>{props.equipment.category}</td>
    <td>{props.equipment.lastRD.substring(0, 10)}</td>
    <td>{props.equipment.nextRD.substring(0, 10)}</td>
  </tr>
)

export default class Equipmentlist extends Component {
  constructor(props) {
    super(props);

    this.onChangeSearch = this.onChangeSearch.bind(this);
    this.onChangeCateSearch = this.onChangeCateSearch.bind(this);
    this.onChangeSort = this.onChangeSort.bind(this);
    this.onClickSearch = this.onClickSearch.bind(this);

    this.state = {
      equipments: [],
      searchKey: '',
      search: [],
      catesearch: '',
    };
  }

  /////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

  componentDidMount() {
    axios.get('http://localhost:5000/equipment/')
      .then(response => {
        this.setState({ equipments: response.data })
      })
      .catch((error) => {
        console.log(error);
      })
    this.setState({
      search: ['', 'Treadmills', 'Bikes', 'Rowing Machines', 'Benches', 'Crosstrainers'],
      catesearch: '',
    })
  }

  /////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

  equipmentList() {
    return this.state.equipments.map(currentequipment => {
      return <Equipment equipment={currentequipment} key={currentequipment._id} />;
    })
  }

  /////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

  onChangeSearch(e) {
    this.setState({
      searchKey: e.currentTarget.value
    })
  }

  /////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

  onChangeCateSearch(e) {
    this.setState({
      catesearch: e.currentTarget.value
    })
  }

  /////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

  onClickSearch() {
    console.log(this.state.catesearch);
    console.log(this.state.searchKey);
    axios.get('http://localhost:5000/equipment/')
      .then(response => {
        this.filterData(response.data)
      })
      .catch((error) => {
        console.log(error);
      })
  }

  /////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

  filterData(equipments) {

    if (this.state.searchKey !== '' && this.state.catesearch !== '') {
      const result = equipments.filter((equipments) =>
        equipments.equipmentName.toLowerCase().includes(this.state.searchKey.toLowerCase()) &&
        equipments.category.toLowerCase().includes(this.state.catesearch.toLowerCase())
      )
      this.setState({ equipments: result })
    }
    if (this.state.searchKey === '' && this.state.catesearch !== '') {
      const result = equipments.filter((equipments) =>
        equipments.category.toLowerCase().includes(this.state.catesearch.toLowerCase())
      )
      this.setState({ equipments: result })
    }
    if (this.state.searchKey !== '' && this.state.catesearch === '') {
      const result = equipments.filter((equipments) =>
        equipments.equipmentName.toLowerCase().includes(this.state.searchKey.toLowerCase())
      )
      this.setState({ equipments: result })
    }
    if (this.state.searchKey === '' && this.state.catesearch === '') {
      this.setState({ equipments: equipments })
    }
  }

  /////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

  onChangeSort() {
    axios.get('http://localhost:5000/equipment/')
      .then(response => {
        const result = response.data.sort((a, b) => (a.nextRD > b.nextRD) ? 1 : -1)
        this.setState({ equipments: result })
      })
      .catch((error) => {
        console.log(error);
      })
  }
  /////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

  render() {
    return (
      <div style={{ backgroundImage: `url(${Background})`, backgroundPosition: 'right' }}>
        <hr />
        <Container>
          <Row>
            <Col><h1>Equipments {this.state.equipments.length}</h1></Col>

            <Col><div style={{ display: "flex", justifyContent: "right", alignItems: "right", marginTop: '10px' }}>
              <Link to={"/equipment/add"}><Button> Add new equipment </Button></Link></div></Col>
          </Row>

          <Row style={{ display: "flex", justifyContent: "center", alignItems: "center" }} >
            <Col xs={4}><label>Search: </label>
              <input type="search" onChange={this.onChangeSearch} className="form-control rounded" placeholder="Search" aria-label="Search" aria-describedby="search-addon" /></Col>

            <Col xs={4}><label>Equipment Category:</label>
              <select ref="userInput"
                className="form-select"
                value={this.state.catesearch}
                onChange={this.onChangeCateSearch}>
                {
                  this.state.search.map(function (search) {
                    return <option
                      key={search}
                      value={search}>{search}
                    </option>;
                  })
                }
              </select></Col>

            <Col md="auto" style={{ marginTop: '23px', display: "flex", justifyContent: "center", alignItems: "center"  }}>
            <button style={{width:'180px'}} type="button" onClick={this.onClickSearch} className="btn btn-primary" >Search</button></Col>

            <Col md="auto" style={{ marginTop: '23px', display: "flex", justifyContent: "right", alignItems: "right" }}>
              <button type="button" onClick={this.onChangeSort} className="btn btn-primary" >Sort by Next Repair Date</button></Col>


          </Row>
        </Container>

        <div style={{ margin: '30px' }}>
          <Table striped bordered hover variant="light">
            <thead>
              <tr>
                <th>ID</th>
                <th>Name</th>
                <th>Category</th>
                <th>Last repair date</th>
                <th>Next repair date</th>
              </tr>
            </thead>
            <tbody>
              {this.equipmentList()}
            </tbody>
          </Table>
          <hr />
        </div>
      </div>
    )
  }
}