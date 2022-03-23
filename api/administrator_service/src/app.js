const express = require("express");
const cors = require("cors");
const helmet = require("helmet");
const morgan = require("morgan");
const bodyParser = require("body-parser");
const routes = require("./routes/routes");

require("dotenv").config();
require("./config/db.config");

const app = express();
const port = process.env.PORT;

app.use(cors());
app.use(helmet());
app.use(morgan('tiny'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use("/api/admin", routes);

app.listen(port, ()=>{
  console.log(`Administrator service server started on port: ${port}`);
})
