const express = require('express');//immutable variabale
var bodyParser = require('body-parser');

const route = require('./routes/route.js');//require inbuilt funtion

const app = express();//e


app.use(bodyParser.json());//middle ware
app.use(bodyParser.urlencoded({ extended: true }));//middleware

const mongoose = require('mongoose')

mongoose.connect("mongodb+srv://sp01041998:71HOQkRVAWXnVxw0@cluster0.deqvc.mongodb.net/group61Database?retryWrites=true&w=majority", {useNewUrlParser: true, useUnifiedTopology : true , useCreateIndex: true})
    .then(() => console.log('mongodb running on 27017'))
    .catch(err => console.log(err))

app.use('/', route);//middleware

app.listen(process.env.PORT || 3000, function() {
	console.log('Express app running on port ' + (process.env.PORT || 3000))
});


