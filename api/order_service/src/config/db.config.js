const mongoose = require("mongoose");

mongoose.connect(process.env.DATABASE_URI);

mongoose.connection.once('open', ()=>{
  console.log(`Order service database connection initiated...\n`);
}).on('error', (error)=>{
  console.log(`Error on order service connecting tp the database server: ${error.message}`);
})
