import useAuthAxios from "../../customHooks/useAuthAxios";
import Loading from "../Loading";
import Navbar from "./Navbar";
import Error from "../Error";
import StockChart from "./StockChart";

const Stock = ()=>{
  const {data, isPending, error} = useAuthAxios(`http://127.0.0.1:5010/api/stock/today`);

  return(
    <div className="container">
      <Navbar />
      {isPending && <Loading />}
      {data && <StockChart data={data} />}
      {error && <Error />}
    </div>

  )
}

export default Stock;
