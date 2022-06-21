const express = require('express');
const bodyParser = require('body-parser');
const router =require('./router/rout')
const app =express();

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }));

app.use('/',router)

app.listen(3000,()=>{
    console.log(`server Start on ${3000}`)
})