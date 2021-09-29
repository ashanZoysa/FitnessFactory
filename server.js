const express = require('express');

const mongoose = require('mongoose');

const bodyParser = require('body-parser');

const cors = require('cors');

const app = express();

//import routes
const postRoutes = require('./routes/posts');
const trackerRoutes = require('./routes/trackers');

//app middleware
app.use(bodyParser.json());
app.use(cors());

//route middleware
app.use(postRoutes);
app.use(trackerRoutes);

const PORT = 8000;

const DB_URL ='mongodb+srv://Hasal:hasal123@mernapp.c4uh7.mongodb.net/mernCrud?retryWrites=true&w=majority';

mongoose.connect(DB_URL,{
useNewUrlParser: true,
useUnifiedTopology: true
})
.then(() =>{
    console.log('Successfully connected to the database');
})
.catch((err) => console.log('DB connection error',err));

app.listen(PORT, () =>{
    console.log(`App is running on ${PORT}`);
});