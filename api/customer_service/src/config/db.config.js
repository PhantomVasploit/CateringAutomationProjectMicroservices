const mongoose = require("mongoose");

// connecting to mongodb
mongoose.connect(process.env.DATABASE_URI);

// listening for the connection
mongoose.connection.once('open', ()=>{
  console.log(`Customer Service Database initiated...`);
}).on('error', (error)=>{
  console.log(`An error occurred on connection ${error.message}`);
})
