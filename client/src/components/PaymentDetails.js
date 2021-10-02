import React, {Component} from 'react';
import Moment from 'moment';
import axios from 'axios';
import { Link } from 'react-router-dom'

export default class PaymentDetails extends Component{

    constructor(props){
        super(props);

        this.state={
            payment:{}
        };

    }

    componentDidMount(){

        const id = this.props.match.params.id;

        axios.get(`http://localhost:8000/payment/${id}`).then((res)=>{
            if(res.data.success){
                this.setState({
                    payment:res.data.payment
                });

                console.log(this.state.payment);
            }

        });

    }



    render(){

        const {userName,paymentDate,category,description,amount,PaymentID}=this.state.payment;

        return(

            <div style={{marginTop:'20px'}} className="container">
                <h4 style={{color:'#00fff2'}}>Payment Record</h4> 
                <hr style={{color:'#00ff6a'}}/>
            <div className="transbox1">    
            <dl className="row">

                <dt className="col-sm-3" style={{color:'#00ff6a'}}>&nbsp;&nbsp;Payment ID :</dt>
                <dd className="col-sm-9" style={{color:'#00fff2'}}>{PaymentID}</dd>
                <br/><br/><br/>

                <dt className="col-sm-3" style={{color:'#00ff6a'}}>&nbsp;&nbsp;User Name :</dt>
                <dd className="col-sm-9" style={{color:'#00fff2'}}>{userName}</dd>
                <br/><br/><br/>

                <dt className="col-sm-3" style={{color:'#00ff6a'}}>&nbsp;&nbsp;Payment Date :</dt>
                <dd className="col-sm-9" style={{color:'#00fff2'}}>{Moment(paymentDate).format("YYYY-MM-DD")}</dd>
                <br/><br/><br/>

                <dt className="col-sm-3" style={{color:'#00ff6a'}}>&nbsp;&nbsp;Payment Category :</dt>
                <dd className="col-sm-9" style={{color:'#00fff2'}}>{category}</dd>
                <br/><br/><br/>

                <dt className="col-sm-3" style={{color:'#00ff6a'}}>&nbsp;&nbsp;Payment Description :</dt>
                <dd className="col-sm-9" style={{color:'#00fff2'}}>{description}</dd>
                <br/><br/><br/>

                <dt className="col-sm-3" style={{color:'#00ff6a'}}>&nbsp;&nbsp;Payment Amount (LKR) :</dt>
                <dd className="col-sm-9" style={{color:'#00fff2'}}>{Number(amount).toFixed(2)}</dd>
                <br/><br/>

            </dl>    
            &nbsp;&nbsp;
            <Link to="/" className="btn btn-primary" style={{ textDecoration: 'none', color: 'white' }}><i class="fas fa-arrow-left"></i>&nbsp;&nbsp;Back</Link><br/><br/>

            </div>
            </div>

        )
    }
}