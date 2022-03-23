const express = require("express");
const cors = require("cors")
const helmet = require("helmet");
const morgan = require("morgan");
const bodyParser = require("body-parser");
require("dotenv").config();
require("./config/db.config");
require("./consumer/consumer");

const app = express();
const port = process.env.PORT;
const routes = require("./routes/route");

app.use(cors());
app.use(helmet());
app.use(morgan('tiny'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use("/api/reciept", routes);

app.listen(port, ()=>{
  console.log(`Reciept service server initiated on port: ${port}`);
})
