import {useContext} from "react";
import { Link} from "react-router-dom";
import { UserAuthContext }from "../../contexts/UserAuthContext";
import Navbar from "./Navbar";
import StockManagerLogin from "./StockManagerLogin";

const StockManagerHome = () =>{
  const {user} =  useContext(UserAuthContext);
  const authenticatedUser = user || JSON.parse(localStorage.getItem("authenticatedStockManager"));
  const jwt = localStorage.getItem("jwt");

  return(
    <div>
      {
        !authenticatedUser && !jwt
        ?
          <StockManagerLogin />
        :
          <div className="row">
            <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12">
              <div className="container">
              <Navbar />
                <h1 className="lead text-uppercase mt-5 col-lg-6 col-md-6 col-sm-6 col-xs-6 offset-3 float-md-center">
                <img src="https://img.icons8.com/ios/64/000000/user-male-circle.png" alt="User Icon"/> Hi {authenticatedUser.username}
                </h1>
                <div className="row justify-content-center">
                  <div className="row">

                    <div className="col mt-3">
                      <div className="card text-center shadow p-3 mb-5 rounded">
                        <div className="card-body">
                          <h4 className="card-title text-uppercase">
                            <img src="https://img.icons8.com/external-phatplus-lineal-phatplus/64/000000/external-stock-global-shipping-phatplus-lineal-phatplus.png" alt=""/>
                            <span> Day's Stock </span>
                          </h4>
                          <p className="card-text text-muted">
                            Create today's Stock.
                          </p>
                          <Link to="/stock_manager/stock" className="btn btn-outline-success">Create Stock </Link>
                        </div>
                      </div>
                    </div>


                  </div>
                </div>
              </div>
            </div>
          </div>
      }
    </div>

  );
}

export default StockManagerHome;
