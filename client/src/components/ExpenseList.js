import React, { Component } from 'react';
import Moment from 'moment';
import axios from 'axios';
import { Link } from 'react-router-dom';


export default class ExpenseList extends Component {

  constructor(props) {
    super(props);

    this.state = { expenses: [] };

  }

  componentDidMount() {
    
    this.retrieveExpenses();

  }


  retrieveExpenses(){

    axios.get('http://localhost:8000/expenses').then(res => {
      if (res.data.success) {
        this.setState({
          expenses: res.data.existingExpenses
        });

        console.log(res.data);
      }

    });


  }



  onDelete = (id) => {
    axios.delete(`http://localhost:8000/expense/delete/${id}`).then((res) => {
      alert("Delete Successfully !");
      this.retrieveExpenses();
    })
  }


  filterData(expenses,searchKey) {

    console.log(expenses);
    console.log(searchKey);


    const result = expenses.filter((expenses) => 

    expenses.expenseType.toLowerCase().includes(searchKey)||
    expenses.expenseDescription.toLowerCase().includes(searchKey)

    )

    console.log(result);

    this.setState({ expenses: result })

  }

  handleSearchArea = (e) => {

    const searchKey = e.currentTarget.value.toLowerCase();
    console.log(searchKey);

    axios.get('http://localhost:8000/expenses').then(res => {
      if (res.data.success) {

        this.filterData(res.data.existingExpenses, searchKey);

      }

    });

  }

  TotalExpenseAmount() {
    return (this.state.expenses.reduce((totalExpense, expenses) =>
    totalExpense = totalExpense + expenses.expenseAmount, 0.0));
  }





  render() {

    return (
      
      <div className="container">
        <div className="row">
          <div className="col-lg-9 mt-2 mb-2"><br/>
            <h5 style={{ color: "#6fff00" }}>All Expenses</h5>
          </div>
          <div className="col-lg mt-2 mb-2">
            <input
              className="form-control"
              type="search"
              placeholder="Search"
              name="searchQuery"
              style={{backgroundColor:'#b5b5b5'}}
              onChange={this.handleSearchArea}
            />
          </div>
        </div>
        <hr style={{ color: "#6fff00" }}/>
        <div className="transbox1" >
        <table className="table table-hover" style={{ marginTop: '40px' }}>
          <thead  style={{color:"#00ff91"}}>
            <tr>
              <th scope="col">No.</th>
              <th scope="col">Expense ID</th>
              <th scope="col">Expense Type</th>
              <th scope="col">Date of Expense</th>
              <th scope="col">Description of Expense</th>
              <th scope="col">Expense Amount (LKR)</th>
              <th scope="col">Action</th>
            </tr>
          </thead>
          <tbody>
            {this.state.expenses.map((expenses, index) => (
              <tr key={index} style={{color:"#dbfc03"}}>

                <th scope="row">{index + 1}</th>

                <td>
                  <Link to={`/expense/${expenses._id}`} style={{ textDecoration: 'none' }}>
                    {expenses.ExpenseID}
                  </Link>
                </td>

                <td>{expenses.expenseType}</td>
                <td>{Moment(expenses.expenseDate).format("YYYY-MM-DD")}</td>
                <td>{expenses.expenseDescription}</td>
                <td>{expenses.expenseAmount.toFixed(2)}</td>
                <td>
                  <Link className="btn btn-warning" to={`/editExpense/${expenses._id}`}>
                    <i className="fas fa-edit"></i>&nbsp;Edit
                  </Link>
                  <br/><br/>
                  <Link className="btn btn-danger" to="#" onClick={() => this.onDelete(expenses._id)}>
                    <i className="fas fa-trash-alt"></i>&nbsp;Delete
                  </Link>
                  &nbsp;

                </td>
              </tr>
            ))}
          </tbody>
        </table>
        </div><br/>

        <div className="transbox1">
          <dl className="row">
                <dt className="col-sm-3" style={{color:'#00ff6a'}}>&nbsp;&nbsp;Total&nbsp;&nbsp;Expense&nbsp;&nbsp;Amount&nbsp;&nbsp;(LKR) :</dt>
                <dd className="col-sm-9" style={{color:'#dbfc03'}}> {this.TotalExpenseAmount().toFixed(2)}</dd>
          </dl>
        </div><br/><br/>     


        <button className="btn btn-success"><Link to="/addExpense" style={{ textDecoration: 'none', color: 'white' }}>Add New Expense Record</Link></button>

      </div>


    )

  }


}