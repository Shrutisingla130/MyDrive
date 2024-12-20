const express = require('express');
const userRouter= require('./routes/user.routes.js')
const app= express();
const dotenv= require('dotenv');
dotenv.config();
const connectTODB = require('./config/db')
connectTODB();
const cookieParser = require('cookie-parser');
const indexRouter= require('./routes/index.routes.js')


app.set('view engine','ejs');
app.use(express.json())
app.use(express.urlencoded({extended:true}))
app.use(cookieParser())

app.use('/user',userRouter)
app.use('/',indexRouter)

app.listen(process.env.PORT,()=>{ 
    console.log('server running')
})