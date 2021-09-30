import React, {Component} from 'react';
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";
import axios from 'axios';


export default class CreatePayment extends Component{

    constructor(props){
        super(props);
        
        this.onChangeType = this.onChangeType.bind(this);
        this.onChangeDate = this.onChangeDate.bind(this);
        this.onChangeDescription = this.onChangeDescription.bind(this);
        this.onChangeAmount = this.onChangeAmount.bind(this);

    

        this.state={
            expenseType:'',
            expenseDate:new Date(),
            expenseDescription:'',
            expenseAmount:0,
            types:[]
        }

    }

    onChangeType(e){
        this.setState({
           expenseType: e.target.value
           });
   }
    
   
   onChangeDate(date){
        this.setState({
            expenseDate:date
        });
   }

    onChangeDescription(e){
        this.setState({
            expenseDescription:e.target.value
        });
    }

    onChangeAmount(e){
        this.setState({
            expenseAmount:e.target.value
        });
    }


   onSubmit=(e)=>{

        e.preventDefault();

        const id = this.props.match.params.id;

        const {expenseType,expenseDate,expenseDescription,expenseAmount} = this.state;

        const data = {
            expenseType:expenseType,
            expenseDate:expenseDate,
            expenseDescription:expenseDescription,
            expenseAmount:expenseAmount
        }

        console.log(data)

        axios.put(`http://localhost:8000/expense/update/${id}`,data).then((res)=>{

                if(res.data.success){

                    alert("Expense updated successfully !");

                    this.setState({
                        expenseType:'',
                        expenseDate:'',
                        expenseDescription:'',
                        expenseAmount:''
                    })

                }

        })

   }


   componentDidMount(){


    axios.get('http://localhost:8000/expense/'+ this.props.match.params.id).then(response=>{
                this.setState({
                    expenseType: response.data.expense.expenseType,
                    expenseDate: new Date(response.data.expense.expenseDate),
                    expenseDescription: response.data.expense.expenseDescription,
                    expenseAmount: response.data.expense.expenseAmount.toFixed(2)
                });
        })
        .catch(function(error){
            console.log(error);
        });



        this.setState({
            types:['Equipment Buying','Equipment Maintenance','Light Bill','Water Bill','Building Maintenance','Other'],
            expenseType:'Equipment Buying'

         })

    }



    render(){

        return(

                <div className="col-md-8 mt-4 mx-auto">
                    <h1 className="h3 mb-3 font-weight-normal" style={{color:"#84ff00"}}>Update Expense</h1><hr style={{color:"#84ff00"}}k/>

                    <form className="needs-validation" noValidate onSubmit={this.onSubmit}>
                    <div className="transbox2">
                    <div className="form-group" style={{marginBottom:'15px'}}>
                      <label htmlFor="category" className="form-label" style={{marginBottom:'5px', marginLeft:20,color:"#dbfc03"}}>Choose Expense Type * </label>
                        <select ref="userInput"  value={this.state.expenseType} onChange={this.onChangeType}   className="form-select" aria-label="Default select example"
                        style={{width:950, marginLeft:20,marginRight:20,marginTop:3,backgroundColor:'#ededed'}}>
                            {
                                this.state.types.map(function(categ){
                                        return <option
                                        key={categ}
                                        value={categ}>
                                            {categ}
                                        </option>
                                })
                            }
                         </select>
                         <br/>
                    </div>  
     

                    <div className="form-group" style={{marginBottom:'15px'}}>
                      <label htmlFor="paymentDate" className="form-label" style={{marginBottom:'5px', marginLeft:20,color:"#dbfc03"}}>Choose Date of Expense&nbsp;&nbsp;<i class="far fa-calendar-alt"></i>&nbsp;&nbsp;&nbsp; *</label>
                        <div style={{width:950, marginLeft:20,marginRight:20,marginTop:3}}>
                                <DatePicker
                                    selected={this.state.expenseDate}
                                    onChange={this.onChangeDate}
                                />    
                        </div><br/>
                    </div>   
  

                    <div className="form-group" style={{marginBottom:'15px'}}>
                      <label htmlFor="description" className="form-label" style={{marginBottom:'5px', marginLeft:20,color:"#dbfc03"}}>Edit Expense Description * </label>
                        <textarea type="text" className="form-control"  value={this.state.expenseDescription} 
                        placeholder="Add Payment description"
                         onChange={this.onChangeDescription} 
                         style={{width:950, marginLeft:20,marginRight:20,marginTop:3,backgroundColor:'#ededed'}}
                         required/>
                        <br/>
                    </div>
                   

                    <div className="form-group" style={{marginBottom:'15px'}}>
                      <label htmlFor="amount" className="form-label" style={{marginBottom:'5px', marginLeft:20,color:"#dbfc03"}}>Edit Expense Amount (LKR) * </label>
                        <input type="number" className="form-control"  value={this.state.expenseAmount}
                        placeholder="Enter Payment Amount" 
                        onChange={this.onChangeAmount}
                        style={{width:950, marginLeft:20,marginRight:20,marginTop:3,backgroundColor:'#ededed'}}
                        required/>
                        <br/>
                    </div>
                    </div><br/>
                     
                    <button type="submit" className="btn btn-success" style={{margin:'15'}} >Update Expense Record</button>
                    
                </form>   
            
            </div>

        )
    }
}