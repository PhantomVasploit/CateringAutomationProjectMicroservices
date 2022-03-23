const mongoose = require("mongoose");

mongoose.connect(process.env.DATABASE_URI);

mongoose.connection.once('open', ()=>{
  console.log(`Administrator service connected to the database server..\n`);
}).on('error', (error)=>{
  console.log(`Error the administrator service can not connect to the database server: ${e.message}`);
})
