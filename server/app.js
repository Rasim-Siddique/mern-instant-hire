const dotenv=require('dotenv');
const express=require('express');
const app=express();

dotenv.config({
    path:"./config.env"
})
require('./db/conn')

app.use(express.json())
// we are linking router file here
app.use(require('./router/clientInfo'))

const PORT=process.env.PORT




app.listen(PORT, ()=>{
    console.log(`server is running on ${PORT}`)
})


