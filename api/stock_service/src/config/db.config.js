const mongoose = require("mongoose");

mongoose.connect(process.env.DATABASE_URI);

mongoose.connection.once('open', ()=>{
  console.log(`Stock service database server connection initiated...\n`);
}).on('error', (error)=>{
  console.log(`Error connecting to the database server: ${e.message}`);
})
