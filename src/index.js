const express = require('express');
const bodyParser=require('body-parser');
const cors=require('cors')
require('dotenv').config();
const{ userRoutes }=require('./users/routes') //destructure
const{notesRoutes}=require('./notes/routes')
const{notebookRoutes}=require('./notebooks/routes')

const app=express();
const corsOptions ={
    origin:[process.env.uiUrl,'http://localhost:3000'], 
    credentials:true,            
    optionSuccessStatus:200
}
app.use(cors(corsOptions));

app.use(bodyParser.json());
app.use('',userRoutes)
app.use('',notesRoutes)
app.use('',notebookRoutes)
module.exports=app;


