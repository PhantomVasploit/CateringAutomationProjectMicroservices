const mongoose = require("mongoose");

mongoose.connect(process.env.DATABASE_URI);

mongoose.connection.once('open', ()=>{
  console.log(`E_menu service database connection initiated...\n`);
}).on('error', (error)=>{
  console.log(`E_menu service can not connect to the database: ${e.message}`);
})
