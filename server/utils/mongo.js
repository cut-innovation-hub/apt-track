const mongoose = require('mongoose')

// mongodb url 
const DB_NAME = 'cut_hub_DB'
const LOCAL_DB = `mongodb://localhost:27017/${DB_NAME}`
// const LOCAL_DB = 'mongodb+srv://cut_buses:KigALN07o01Tave0@bondsmaster.nsffl.mongodb.net/cut_buses_DB?retryWrites=true&w=majority'

// funciton to conenct db
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

// export databse funtoin to yse it in other files
module.exports=connectDB