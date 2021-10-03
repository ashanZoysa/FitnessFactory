import React, {Component} from 'react';
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";
import axios from 'axios';
import { Redirect } from 'react-router';

export default class EditPayment extends Component{

    constructor(props){
        super(props);

        this.onChangeUserName = this.onChangeUserName.bind(this);
        this.onChangeDate = this.onChangeDate.bind(this);
        this.onChangeCategory = this.onChangeCategory.bind(this);
        this.onChangeDescription = this.onChangeDescription.bind(this);
        this.onChangeAmount = this.onChangeAmount.bind(this);

    

        this.state={
            userName:'',
            paymentDate:new Date(),
            category:'',
            description:'',
            amount:0,
            categories:[]
    }


}


/*onChangeUserId(e){
    this.setState({
        userId:e.target.value
    });
}*/

onChangeUserName(e){
    this.setState({
        userName:e.target.value
    });
}


onChangeDate(date){
    this.setState({
        paymentDate:date
    });
}




onChangeCategory(e){
     this.setState({
         category: e.target.value
        });
}

onChangeDescription(e){
    this.setState({
        description:e.target.value
    });
}

onChangeAmount(e){
    this.setState({
        amount:e.target.value
    });
}


    onSubmit=(e)=>{ 

        e.preventDefault();

        const id = this.props.match.params.id;

        const {userName,paymentDate,category,description,amount} = this.state;

        const data = {
            userName:userName,
            description:description,
            paymentDate:paymentDate,
            category:category,
            amount:amount
        }

        console.log(data)

        axios.put(`http://localhost:8000/payment/update/${id}`,data).then((res)=>{

                if(res.data.success){       

                    this.setState({
                        userName:'',
                        paymentDate:'',
                        category:'',
                        description:'',
                        amount:''
                    })
                }

        })

        alert("Payment Updated Successfully !");
        this.setState({redirect:"/"});

   }





    componentDidMount() {

        axios.get('http://localhost:8000/payment/'+ this.props.match.params.id).then(response=>{
                this.setState({
                    userName: response.data.payment.userName,
                    paymentDate: new Date(response.data.payment.paymentDate),
                    category: response.data.payment.category,
                    description: response.data.payment.description,
                    amount: response.data.payment.amount.toFixed(2)
                });
        })
        .catch(function(error){
            console.log(error);
        });

        this.setState({
            categories:['Registration/Admission Fees','Membership Fees','Gym Store','Entrance Fees for an Event','Other'],
            category:'Registration/Admission Fees'
    
        })

    }




    render(){

        if(this.state.redirect){
            return <Redirect to={this.state.redirect}/>
        }

        return(

            <div className="col-md-8 mt-4 mx-auto">
                    <h1 className="h3 mb-3 font-weight-normal" style={{color:"#61fffc"}}>Update Payment</h1><hr style={{color:"#61fffc"}}/>
                    
                    <form className="needs-validation" onSubmit={this.onSubmit}>
                    <div className="transbox2"> 

                    
                    <div className="form-group" style={{marginBottom:'15px'}}>
                      <label htmlFor="userName" className="form-label" style={{marginBottom:'5px', marginLeft:20,color:"#00ffdd"}}>Edit User Name *</label>
                        <input type="text" className="form-control" name="userName" value={this.state.userName} 
                        placeholder="Enter User Name"
                        onChange={this.onChangeUserName}
                        style={{width:950, marginLeft:20,marginRight:20,marginTop:3,backgroundColor:'#ededed'}}
                        required/><br/>
                    </div>    

                    <div className="form-group" style={{marginBottom:'15px'}}>
                      <label htmlFor="paymentDate" className="form-label" style={{marginBottom:'5px', marginLeft:20,color:"#00ffdd"}}>Edit Payment Date&nbsp;&nbsp;<i class="far fa-calendar-alt"></i>&nbsp;&nbsp;&nbsp; *</label>
                        <div style={{width:950, marginLeft:20,marginRight:20,marginTop:3}}> 
                                <DatePicker
                                    selected={this.state.paymentDate}
                                    onChange={this.onChangeDate}
                                />    
                        </div><br/>
                    </div>   

                    <div className="form-group" style={{marginBottom:'15px'}}>
                      <label htmlFor="category" className="form-label" style={{marginBottom:'5px', marginLeft:20,color:"#00ffdd"}}>Edit Category * </label>
                        <select ref="userInput"  value={this.state.category} onChange={this.onChangeCategory}   className="form-select" aria-label="Default select example" 
                        style={{width:950, marginLeft:20,marginRight:20,marginTop:3,backgroundColor:'#ededed'}} required>
                            {
                                this.state.categories.map(function(categ){
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
                      <label htmlFor="description" className="form-label" style={{marginBottom:'5px', marginLeft:20,color:"#00ffdd"}}>Edit Payment Description * </label>
                        <textarea type="text" className="form-control"  value={this.state.description} 
                        placeholder="Add Payment description"
                         onChange={this.onChangeDescription} 
                         style={{width:950, marginLeft:20,marginRight:20,marginTop:3,backgroundColor:'#ededed'}}
                         required/>
                        <br/>
                    </div>
                   
                    <div className="form-group" style={{marginBottom:'15px'}}>
                      <label htmlFor="amount" className="form-label" style={{marginBottom:'5px', marginLeft:20,color:"#00ffdd"}}>Edit Payment Amount (LKR) * </label>
                        <input type="number" className="form-control"  value={this.state.amount}
                        placeholder="Enter Payment Amount" 
                        onChange={this.onChangeAmount}
                        style={{width:950, marginLeft:20,marginRight:20,marginTop:3,backgroundColor:'#ededed'}}
                        required/>
                        <br/>
                    </div>
                    </div><br/>
                     
                    <button type="submit" className="btn btn-success" style={{margin:'15'}} ><i class="far fa-edit"></i>&nbsp;&nbsp;Update Payment</button>&nbsp;&nbsp;
                  
                    
                </form>   
            
            </div>
        

        )
    }
}