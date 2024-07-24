const express = require('express');
const app = express();
//Imports
const dotenv = require('dotenv')
const {connectToDB}=require('./connection.js')

// Binding dotenv
dotenv.config();

//DB-connection Function
connectToDB()

app.get('/', (req, res) => {
    res.send("Server Running...")
})

        
app.listen(process.env.PORT || 5000 , () => {
    console.log(`Server listening on ${process.env.PORT}`)}
)