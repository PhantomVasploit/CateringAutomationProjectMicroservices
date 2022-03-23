import {useContext} from "react";
import {Link} from "react-router-dom"
import { UserAuthContext }from "../../contexts/UserAuthContext";
import useAuthAxios from "../../customHooks/useAuthAxios";
import Navbar from "./Navbar";
import CustomerLogin from "./CustomerLogin";
import Loading from "../Loading";
import Error from "../Error";

const CustomerHome = () =>{
  const { user } = useContext(UserAuthContext);
  const authenticatedUser = user || JSON.parse(localStorage.getItem('authenticatedCustomer'));
  const jwt = localStorage.getItem("jwt");
  const {data, isPending, error} = useAuthAxios(`http://127.0.0.1:5000/api/customer/account/${authenticatedUser._id}`);

  return(
    <div>
      {
        !authenticatedUser && !jwt
        ?
          <CustomerLogin/>
        :
          <div className="container">
            <div className="row">

              { isPending && <Loading /> }

              {
                data &&
                <div className="row">
                  <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12">
                    <div className="container">
                    <Navbar />
                      <div className="row">

                      <div className="d-flex justify-content-center mt-4">
                        <p className="lead">Balance</p>
                      </div>

                      <div className="d-flex justify-content-center">
                        <p className="text-bold">{data.customer.balance}</p>
                      </div>

                        <div className="col-md-6 mt-4">
                          <div className="card text-center shadow p-3 rounded cardOpacity">
                            <div className="card-header">
                              <h1 className="lead">My Profile</h1>
                              <img className="mt-2" src="https://img.icons8.com/ios/100/000000/user--v1.png" alt="User Icon"/>
                            </div>

                            <div className="card-body">
                              <div className="row">
                                <div className="col">
                                  <p className="card-text text-start text-bold text-uppercase">Username</p>
                                </div>
                                <div className="col">
                                  <p className="card-text text-end text-bold text-uppercase">{data.customer.username}</p>
                                </div>
                              </div>
                              <div className="row">
                                <div className="col">
                                  <p className="card-text text-start text-bold text-uppercase">Email</p>
                                </div>
                                <div className="col">
                                  <p className="card-text text-end text-bold text-uppercase">{data.customer.email}</p>
                                </div>
                              </div>
                              <div className="row">
                                <div className="col">
                                  <p className="card-text text-start text-bold text-uppercase">Registration</p>
                                </div>
                                <div className="col">
                                  <p className="card-text text-end text-bold text-uppercase">{data.customer.registrationNumber}</p>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>

                        <div className="col-md-6 mt-4">

                        </div>

                        <div className="d-flex justify-content-center mt-4">
                          <Link className="btn btn-outline-success" to="/customer/menu">Menu</Link>
                        </div>

                      </div>
                    </div>
                  </div>
                </div>
              }

              { error && <Error /> }

            </div>
          </div>
      }
    </div>


  );
}

export default CustomerHome;
