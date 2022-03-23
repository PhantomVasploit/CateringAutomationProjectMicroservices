const mongoose = require("mongoose");

mongoose.connect(process.env.DATABASE_URI);

mongoose.connection.once('open', ()=>{
  console.log(`Manager service database server initiated...\n`);
}).on('error', (error)=>{
  console.log(`Error connecting to manager service database server: ${error.message}`);
})
