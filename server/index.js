const express = require('express');
const cors = require('cors');
const {connectDb} = require("./utils/db")
require("dotenv").config()

const employeeRoutes = require("./controller/employe")


const app = express();
app.use(cors());
app.use(express.json());



const PORT = process.env.PORT

app.use('/api', employeeRoutes)



app.listen(PORT, ()=>{
    connectDb()
    console.log(`Server connected at ${PORT}`)
})
