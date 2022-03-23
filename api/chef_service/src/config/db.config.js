const mongoose = require("mongoose");

mongoose.connect(process.env.DATABASE_URI);

mongoose.connection.once('open', ()=>{
  console.log(`Chef service database initiated...\n`);
}).on('error', ()=>{
  console.log(`Error in connecting to mongodb server...\n`);
})
