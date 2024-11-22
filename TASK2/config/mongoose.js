const mongoose = require("mongoose");
mongoose.connect(process.env.MONGO_URI);

const db = mongoose.connection;

db.on("error",function(err){
    console.log("Not connected to DATABASE",err);
});

db.on("open",function(){
    console.log("connected to database");
});
