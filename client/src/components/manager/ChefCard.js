import {useState} from "react";
import {Link} from "react-router-dom";
import axios from "axios";

const ChefCard = ({data})=>{
  const [deleteUrl, setDeleteUrl] = useState("");

  const authAxios = axios.create({
    baseURL: "http://127.0.0.1:5002/api/chef",
    headers: {
    authorization: `Bearer ${localStorage.getItem("jwt")}`
  }
  });

  const setDeleteUrlFunc = (id)=>{
    setDeleteUrl(`/account/${id}`);
  }

  const deleteChef = async()=>{
      try {
          const response = await authAxios.delete(deleteUrl);
          console.log(`Response is: ${JSON.stringify(response)}`);
      } catch (e) {
        console.log(`Error deleting customer account`);
      }
  }

  return(
    <div className="row">
      {
        data.chefs.length <= 0
        ?
          <div className="container mt-4">
            <div className="row">
              <div className="col-lg-6 col-md-6 col-sm-6 col-xs-6 offset-3 float-md-center">
                <div className="alert alert-info">
                  <h4 className="alert-heading text-uppercase">No User Accounts</h4>
                  <p className=""> There are no chef accounts to display </p>
                </div>
              </div>
            </div>
          </div>
        :
          data.chefs.map((chef)=>(
            <div className="col-md-6" key={chef._id}>
              <div className="card text-center shadow p-3 rounded mt-4">
                <div className="card-header">
                <h1 className="lead text-uppercase">User Accounts</h1>
                <img src="https://img.icons8.com/ios/64/000000/user-male-circle.png" alt="user icon"/>
                </div>
                <div className="card-body">
                  <div className="row">
                    <div className="col">
                      <p className="card-text text-start text-bold text-uppercase">Username</p>
                    </div>
                    <div className="col">
                      <p className="card-text text-end text-bold text-uppercase">{chef.username}</p>
                    </div>
                  </div>
                  <div className="row">
                    <div className="col">
                      <p className="card-text text-start text-bold text-uppercase">Email</p>
                    </div>
                    <div className="col">
                      <p className="card-text text-end text-bold text-uppercase">{chef.email}</p>
                    </div>
                  </div>
                  <div className="row">
                    <div className="col">
                      <p className="card-text text-start text-bold text-uppercase">Employee Number</p>
                    </div>
                    <div className="col">
                      <p className="card-text text-end text-bold text-uppercase">{chef.employeeNumber}</p>
                    </div>
                  </div>
                  <div className="row">
                    <div className="col">
                      <p className="card-text text-start text-bold text-uppercase">National ID</p>
                    </div>
                    <div className="col">
                      <p className="card-text text-end text-bold text-uppercase">{chef.nationalId}</p>
                    </div>
                  </div>
                  <div className="row">
                    <div className="col">
                      <Link
                      to="/manager/chef/update"
                      state={{id: chef._id}}
                      className="card-text text-start btn btn-info text-uppercase">
                      Update
                      </Link>
                    </div>

                    <div className="col">
                      <Link
                      to="/manager/customer"
                      onMouseEnter={()=>{setDeleteUrlFunc(chef._id)}}
                      onMouseLeave={()=>{setDeleteUrl("")}}
                      onClick={()=>{deleteChef(); window.location.reload();}}
                      className="card-text text-end btn btn-danger">
                      Delete</Link>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))
      }
    </div>
  )
}

export default ChefCard;
