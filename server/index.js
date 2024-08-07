const express = require('express');
const app = express();
//Imports
const dotenv = require('dotenv')
const {connectToDB}=require('./connection.js')
const cors=require('cors')

//Router Imports
const authRoute=require('./routes/authRoutes.js');
const postRoute=require('./routes/postRoutes.js');

// Binding dotenv
dotenv.config();

//DB-connection Function
connectToDB()

app.get('/', (req, res) => {
    res.send("Server Running...")
})

//MiddelWares
app.use(express.json());
app.use(cors());

//All Routes
app.use('/api',authRoute);
app.use('/api/post',postRoute);
        
app.listen(process.env.PORT || 5000 , () => {
    console.log(`Server listening on ${process.env.PORT}`)}
)