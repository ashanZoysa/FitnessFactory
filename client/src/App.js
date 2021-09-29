import React, {Component} from 'react';
import {BrowserRouter,Route} from 'react-router-dom';
import CreatePayment from './components/CreatePayment';
import EditPayment from './components/EditPayment';
import Home from './components/Home';
import NavBar from './components/NavBar';
import PaymentDetails from './components/PaymentDetails';
import AddExpense from './components/AddExpense';
import ExpenseList from './components/ExpenseList';
import ExpenseDetails from './components/ExpenseDetails';
import EditExpense from './components/EditExpense';

export default class App extends Component{

      render(){

        return(

          <BrowserRouter>
          
          <div>
            <NavBar/>
            <Route path="/" exact component={Home}></Route>
            <Route path="/add" exact component={CreatePayment}></Route>
            <Route path="/edit/:id" exact component={EditPayment}></Route>
            <Route path="/payment/:id" exact component={PaymentDetails}></Route> 
            <Route path="/expenses" exact component={ExpenseList}></Route>
            <Route path="/expense/:id" exact component={ExpenseDetails}></Route>
            <Route path="/addExpense" exact component={AddExpense}></Route>
            <Route path="/editExpense/:id" exact component={EditExpense}></Route>

          </div>

          </BrowserRouter>
          

        )

      }
}