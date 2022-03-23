import {useContext} from "react";
import { Link } from "react-router-dom";
import Navbar from "./Navbar";
import {UserAuthContext} from "../../contexts/UserAuthContext";
import AdminLogin from "./AdminLogin";

const AdminHome = () =>{
  const{user} = useContext(UserAuthContext);
  const authenticatedUser = user || JSON.parse(localStorage.getItem('authenticatedAdmin'));
  const jwt = localStorage.getItem("jwt");

  return(
    <div>
      {
        !authenticatedUser && !jwt
        ?
          <AdminLogin />
        :
          <div className="container">
            <div className="row">
              <div className="row">
                <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12">
                  <div className="container">
                    <Navbar />

                    <div className="row">

                      <div className="col mt-4">
                        <div className="card text-center shadow p-3 rounded">
                          <div className="card-header">
                            <h1 className="lead text-uppercase"> Create User Accounts</h1>
                            <img src="https://img.icons8.com/ios/64/000000/user-male-circle.png" alt="user icon"/>
                          </div>
                          <div className="card-body">
                            <p className="card-text text-center text-bold text-uppercase">Create varoius user accounts</p>
                            <Link to="/admin/accounts" className="btn btn-info">Create User Accounts</Link>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="row">


                    </div>

                  </div>
                </div>
              </div>
            </div>
          </div>
      }
    </div>
  )
}

export default AdminHome;
