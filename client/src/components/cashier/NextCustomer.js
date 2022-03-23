import {Link} from "react-router-dom";
import Navbar from "./Navbar";

const NextCustomer = ()=>{

  return(
    <div className="container mt-4">
      <div className="row">
      <Navbar />
        <div className="col-lg-6 col-md-6 col-sm-6 col-xs-6 offset-3 float-md-center">
          <div className="alert alert-info mt-4">
            <h4 className="alert-heading">Serve The Next Customer</h4>
            <p>Click here to take the next customer's orders</p>
            <Link className="btn btn-info" to="/cashier/CreateOrder">Next Order</Link>
          </div>
        </div>
      </div>
    </div>
  )
}

export default NextCustomer;
