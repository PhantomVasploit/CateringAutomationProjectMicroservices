import useAuthAxios from "../../customHooks/useAuthAxios";
import Loading from "../Loading";
import Error from "../Error";
import ChefCard from "./ChefCard";
import Navbar from "./Navbar";

const ChefAccounts = ()=>{
  const {data, isPending, error} = useAuthAxios("http://127.0.0.1:5002/api/chef/accounts");
  return(
    <div className="row">
      <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12">
        <div className="container">
          <Navbar />
          {isPending && <Loading/>}
          {error && <Error  error={error}/>}
          {
              data && <ChefCard className="mt-4" data={data} />
          }
        </div>
      </div>
    </div>
  )
}

export default ChefAccounts;
