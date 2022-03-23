import useAuthAxios from "../../customHooks/useAuthAxios";
import Loading from "../Loading";
import Error from "../Error";
import OrderTable from "./OrderTable";
import ChefNavbar from "./ChefNavbar";

const Orders = ()=>{
    const {data, isPending, error} = useAuthAxios('http://127.0.0.1:5006/api/order');
    return(
      <div className="container">
        <div className="row">
        <ChefNavbar />
        {isPending && <Loading/> }
        {data && <OrderTable data={data} />}
        {error && <Error error={error}/>}
        </div>
      </div>
    );
}

export default Orders;
