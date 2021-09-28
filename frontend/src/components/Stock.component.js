import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Button } from 'react-bootstrap';
import { Container } from 'react-bootstrap';
import { Row } from 'react-bootstrap';
import { Col } from 'react-bootstrap';
import Table from 'react-bootstrap/Table';
import axios from 'axios';
import Background from './back.jpg';

const Stock = props => (
  <tr>
    <td>{props.stock.stockID}</td>
    <td><Link style={{ textDecoration: 'none' }} to={"stock/details/" + props.stock._id}>{props.stock.stockName}</Link></td>
    <td>{props.stock.category}</td>
    <td>{props.stock.quantity}</td>
  </tr>
)

export default class Stocklist extends Component {
  constructor(props) {
    super(props);

    this.stockCostQuantityTotal = this.stockCostQuantityTotal.bind(this)
    this.stockPriceQuantityTotal = this.stockPriceQuantityTotal.bind(this)
    this.onChangeSearch = this.onChangeSearch.bind(this);
    this.onChangeCateSearch = this.onChangeCateSearch.bind(this);
    this.onChangeSort = this.onChangeSort.bind(this);
    this.onClickSearch = this.onClickSearch.bind(this);

    this.state = {
      stocks: [],
      searchKey: '',
      search: [],
      catesearch: '',
    };
  }

  componentDidMount() {
    axios.get('http://localhost:5000/stock/')
      .then(response => {
        this.setState({ stocks: response.data })
      })
      .catch((error) => {
        console.log(error);
      })
    this.setState({
      search: ['', 'Supplements And Nutritions', 'Bags And Backpacks', 'Recovery And Care', 'Electronics', 'Merchandising'],
    })
  }

  /////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

  stockCostQuantityTotal() {
    return (this.state.stocks.reduce((total, currentStock) => total = total + currentStock.unitCost * currentStock.quantity, 0));
  }

  /////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

  stockPriceQuantityTotal() {
    return (this.state.stocks.reduce((total, currentStock) => total = total + currentStock.unitPrice * currentStock.quantity, 0));
  }


  StockList() {
    return this.state.stocks.map(currentStock => {
      return <Stock stock={currentStock} deleteStock={this.deleteStock} key={currentStock._id} />;
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
    axios.get('http://localhost:5000/stock/')
      .then(response => {
        this.filterData(response.data)
      })
      .catch((error) => {
        console.log(error);
      })
  }

  /////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

  filterData(Stock) {

    if (this.state.searchKey !== '' && this.state.catesearch !== '') {
      const result = Stock.filter((Stock) =>
        Stock.stockName.toLowerCase().includes(this.state.searchKey.toLowerCase()) &&
        Stock.category.toLowerCase().includes(this.state.catesearch.toLowerCase())
      )
      this.setState({ stocks: result })
    }
    if (this.state.searchKey === '' && this.state.catesearch !== '') {
      const result = Stock.filter((Stock) =>
        Stock.category.toLowerCase().includes(this.state.catesearch.toLowerCase())
      )
      this.setState({ stocks: result })
    }
    if (this.state.searchKey !== '' && this.state.catesearch === '') {
      const result = Stock.filter((Stock) =>
        Stock.stockName.toLowerCase().includes(this.state.searchKey.toLowerCase())
      )
      this.setState({ stocks: result })
    }
    if (this.state.searchKey === '' && this.state.catesearch === '') {
      this.setState({ stocks: Stock })
    }
  }

  /////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

  onChangeSort() {
    axios.get('http://localhost:5000/stock/')
      .then(response => {
        const result = response.data.sort((a, b) => (a.quantity > b.quantity) ? 1 : -1)
        this.setState({ stocks: result })
      })
      .catch((error) => {
        console.log(error);
      })
  }
  
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

  render() {
    return (
      <div style={{ backgroundImage: `url(${Background})`, backgroundPosition: 'right' }}>
        <hr />
        <Container>
          <Row>
            <Col><h1>Products {this.state.stocks.length}</h1></Col>
            <Col><div style={{ display: "flex", justifyContent: "right", alignItems: "right", marginTop: '10px' }}>
              <Link to={"/stock/add"}><Button> Add new Product </Button></Link></div></Col>
          </Row>

          <Row>
            <Col xs={4}><label>Search:</label>
              <input type="search" onChange={this.onChangeSearch} className="form-control rounded" placeholder="Search" aria-label="Search"
                aria-describedby="search-addon" /></Col>

            <Col xs={4}><label>Product Category:</label>
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

            <Col md="auto" style={{ marginTop: '23px', display: "flex", justifyContent: "center", alignItems: "center" }}>
              <button style={{ width: '190px' }} type="button" onClick={this.onClickSearch} className="btn btn-primary" >
                Search</button></Col>

                <Col md="auto" style={{ marginTop: '23px', display: "flex", justifyContent: "right", alignItems: "right" }}>
              <button style={{ width: '190px' }} type="button" onClick={this.onChangeSort} className="btn btn-primary" >Sort by Quantity</button></Col>

          </Row>
        </Container>

        <div style={{ margin: '30px' }}>
          <Table striped bordered hover variant="light">
            <thead>
              <tr>
                <th>Total Cost (Rupees)</th>
                <th>Total Value (Rupees)</th>
                <th>Gross Profit (Rupees)</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>{this.stockCostQuantityTotal()}</td>
                <td>{this.stockPriceQuantityTotal()}</td>
                <td>{this.stockPriceQuantityTotal()-this.stockCostQuantityTotal()}</td>
              </tr>
            </tbody>
          </Table>
          <hr />
        </div>

        <div style={{ margin: '30px' }}>
          <Table striped bordered hover variant="light">
            <thead>
              <tr>
                <th>ID</th>
                <th>Name</th>
                <th>Category</th>
                <th>Quantity</th>
              </tr>
            </thead>
            <tbody>
              {this.StockList()}
            </tbody>
          </Table>
          <hr />
        </div>
      </div>
    )
  }
}