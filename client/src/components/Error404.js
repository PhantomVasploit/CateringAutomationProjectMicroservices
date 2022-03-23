import { Link } from "react-router-dom";
import Navbar from "./Navbar"
const Error404 = (props)=>{
  return(
    <div className="container mt-4">
      <div className="row">
        <Navbar />
        <div className="col-lg-6 col-md-6 col-sm-6 col-xs-6 offset-3 float-md-center">
            <div className="alert alert-danger mt-4">
              <h3 className="alert-heading">404</h3>
              <h4 className="fw-bold">You're beyond the border</h4>
              <Link className="btn btn-outline-info" to="/">Home</Link>
            </div>
          </div>
      </div>
    </div>
  );
}

export default Error404;
