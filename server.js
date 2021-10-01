const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express(); //invoke express

//import routes
const paymentRoutes = require('./routes/payments');
const expenseRoutes = require('./routes/expenses');


//app middleware
app.use(bodyParser.json());
app.use(cors());

//route middleware
app.use(paymentRoutes);
app.use(expenseRoutes);

const PORT = 8000;

const DB_URL = 'mongodb+srv://thimethhansana699:thimeth30068@gympayment.aycdv.mongodb.net/GymPayment?retryWrites=true&w=majority';

mongoose.connect(DB_URL,{
    useNewUrlParser: true,
    useUnifiedTopology: true

})
.then(()=>{
    console.log('Database connected!');
})
.catch((err)=>{
    console.log('DB connection error !',err);
})


app.listen(PORT,()=>{
    console.log(`App is running on ${PORT}`);
})




