import {useContext} from "react";
import {UserAuthContext} from "../../contexts/UserAuthContext";
import useAuthAxios from "../../customHooks/useAuthAxios";
import Navbar from "./Navbar";
import Loading from "../Loading";
import Error from "../Error";
import Table from "./Table";

const CreateStock = ()=>{

  const { user } = useContext(UserAuthContext);
  const authenticatedUser = user || JSON.parse(localStorage.getItem("authenticatedStockManager"));
  const {data, isPending, error} = useAuthAxios('http://127.0.0.1:5010/api/stock/foodItems');
  return (
    <div className="container">
      <div className="row">
      <Navbar />
        { isPending && <Loading /> }
        { data && <Table data={data} user={authenticatedUser} /> }
        { error && <Error error={error} /> }
      </div>
    </div>
  )
}

export default CreateStock;
