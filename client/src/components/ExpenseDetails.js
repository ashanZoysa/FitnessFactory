import React, {Component} from 'react';
import Moment from 'moment';
import axios from 'axios';

export default class PaymentDetails extends Component{

    constructor(props){
        super(props);

        this.state={
            expense:{}
        };

    }

    componentDidMount(){

        const id = this.props.match.params.id;

        axios.get(`http://localhost:8000/expense/${id}`).then((res)=>{
            if(res.data.success){
                this.setState({
                    expense:res.data.expense
                });

                console.log(this.state.expense);
            }

        });

    }



    render(){

        const {ExpenseID,expenseType,expenseDate,expenseDescription,expenseAmount}=this.state.expense;

        return(

            <div style={{marginTop:'20px'}}>
                <h4  style={{color:'#6fff00'}}>Expense Record</h4> 
                <hr style={{color:'#00ff6a'}}/>
            <div className="transbox1">   
            <dl className="row">

                <dt className="col-sm-3" style={{color:'#00ff6a'}}>Expense ID</dt>
                <dd className="col-sm-9" style={{color:'#6fff00'}}>{ExpenseID}</dd>

                <dt className="col-sm-3" style={{color:'#00ff6a'}}>Expense Type</dt>
                <dd className="col-sm-9" style={{color:'#6fff00'}}>{expenseType}</dd>

                <dt className="col-sm-3" style={{color:'#00ff6a'}}>Date of Expense</dt>
                <dd className="col-sm-9" style={{color:'#6fff00'}}>{Moment(expenseDate).format("YYYY-MM-DD")}</dd>

                <dt className="col-sm-3" style={{color:'#00ff6a'}}>Description of Expense</dt>
                <dd className="col-sm-9" style={{color:'#6fff00'}}>{expenseDescription}</dd>

                <dt className="col-sm-3" style={{color:'#00ff6a'}}>Expense Amount (LKR)</dt>
                <dd className="col-sm-9" style={{color:'#6fff00'}}>{Number(expenseAmount).toFixed(2)}</dd>

            </dl>    
            </div>
            </div>

        )
    }
}