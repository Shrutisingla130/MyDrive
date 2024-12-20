const mongoose=require('mongoose')
const { stringify } = require('querystring')

const userSchema= new mongoose.Schema({
    username:{
        type : String ,
        required : true,
        trim: true,
        lowercase:true,
        unique:true,
        minlength: [3, 'username must be atleast 3 char long']
    },
    email:{
        type : String ,
        required : true,
        trim: true,
        lowercase:true,
        unique:true,
        minlength: [13, 'email must be atleast 13 char long']
    },
    password:{
        type : String ,
        required : true,
        trim: true,
        minlength: [5, 'password must be atleast 5 char long']
    },
    
})



const user= mongoose.model('user',userSchema)


module.exports=user;