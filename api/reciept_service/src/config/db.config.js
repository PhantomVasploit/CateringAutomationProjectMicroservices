const mongoose = require("mongoose");

mongoose.connect(process.env.DATABASE_URI);

mongoose.connection.once('open', ()=>{
  console.log("Reciept server database server initiated...\n");
}).on('error', (error)=>{
  console.log(`Error connecting to database server: ${error.message}`);
})
