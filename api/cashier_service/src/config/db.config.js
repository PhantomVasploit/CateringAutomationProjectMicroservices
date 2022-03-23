const mongoose = require("mongoose");

mongoose.connect(process.env.DATABASE_URI);

mongoose.connection.once('open', ()=>{
  console.log(`Cashier Service Database initiated...\n`);
}).on('error', ()=>{
  console.log(`Error connecting to the database: ${e.message}`);
});
