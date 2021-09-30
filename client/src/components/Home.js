import React, { Component } from 'react';
import Moment from 'moment';
import axios from 'axios';
import { Link } from 'react-router-dom';
import '../styles/Home.css';


export default class Home extends Component {

  constructor(props) {
    super(props);

    this.state = { payments: [] };

  }


  componentDidMount() {
    this.retrievePayments();
  }



  retrievePayments() {

    axios.get("http://localhost:8000/payments").then(res => {
      if (res.data.success) {
        this.setState({
          payments: res.data.existingPayments
        });

        console.log(res.data);
      }

    });

  }


  onDelete = (id) => {
    axios.delete(`http://localhost:8000/payment/delete/${id}`).then((res) => {
      alert("Delete Successfully !");
      this.retrievePayments();
    })
  }


  filterData(payments, searchKey) {

    const result = payments.filter((payment) =>
      payment.userName.toLowerCase().includes(searchKey) ||
      payment.description.toLowerCase().includes(searchKey)


    )

    this.setState({ payments: result })

  }





  handleSearchArea = (e) => {

    const searchKey = e.currentTarget.value;

    axios.get("http://localhost:8000/payments").then(res => {
      if (res.data.success) {

        this.filterData(res.data.existingPayments, searchKey)

      }

    });

  }


createAndDownloadPaymentPdf = () =>{
    axios.post('http://localhost:8000/payments/createPdf',this.state)
}









  render() {

    return (

      <div className="container">
        <div className="row">
          <div className="col-lg-9 mt-2 mb-2"><br/>
            <h5 style={{ color: "#03fcf4" }}>All Payments</h5>
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
        </div><hr  style={{ color: "#03fcf4" }}/>

        <div className="transbox1" >
        <table className="table table-hover" style={{ marginTop: '40px'}}>
          <thead style={{color:"#00ff6a"}}>
            <tr>
              <th scope="col">No.</th>
              <th scope="col">User Name</th>
              <th scope="col">Payment ID</th>
              <th scope="col">Payment Date</th>
              <th scope="col">Payment Category</th>
              <th scope="col">Payment Description</th>
              <th scope="col">Payment Amount (LKR)</th>
              <th scope="col">Action</th>
            </tr>
          </thead>
          <tbody>
            {this.state.payments.map((payments, index) => (
              <tr key={index}  style={{color:"#00fff2"}}>
                <th scope="row">{index + 1}</th>
                <td>{payments.userName}</td>
                <td style={{hover:"#ff00b3",textDecoration:'none'}}>
                  <Link to={`/payment/${payments._id}`} style={{ textDecoration: 'none' }}>
                    {payments.PaymentID}
                  </Link>
                </td>
                <td>{Moment(payments.paymentDate).format("YYYY-MM-DD")}</td>
                <td>{payments.category}</td>
                <td>{payments.description}</td>
                <td>{payments.amount.toFixed(2)}</td>
                <td>
                  <Link className="btn btn-warning" to={`/edit/${payments._id}`}>
                    <i className="fas fa-edit"></i>&nbsp;Edit
                  </Link>
                  <br/><br/>
                  <Link className="btn btn-danger" to="#" onClick={() => this.onDelete(payments._id)}>
                    <i className="fas fa-trash-alt"></i>&nbsp;Delete
                  </Link>
                  &nbsp;

                </td>
              </tr>
            ))}
          </tbody>
        </table>
        </div>
        <br/>

        <button className="btn btn-success"><Link to="/add" style={{ textDecoration: 'none', color: 'white' }}>Add New Payment Record</Link></button><br/><br/>
        <button className="btn btn-primary" onClick={this.createAndDownloadPaymentPdf}>Download PDF&nbsp;<i class="fas fa-file-download"></i></button>

      </div>
      

    )
  }
}