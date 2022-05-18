const mongoose = require('mongoose')

const LOCAL_DB = `mongodb://localhost:27017/meetA_DB`

const connectDB = () =>{
    mongoose.connect(LOCAL_DB, {})
    mongoose.connection.once('open',(err)=>{
        if(err){
            console.log('there was an error :- ',err)
        }else{
            console.log(`Database Connected Successfully`)
        }
    })
}

module.exports=connectDB