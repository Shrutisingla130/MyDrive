const mongoose= require('mongoose');

// connection between database and node.js
function connectTODB(){
    mongoose.connect(process.env.MONGO_URI).then(()=>{
        console.log('connected to db');
    })
}

module.exports = connectTODB;//to export connection