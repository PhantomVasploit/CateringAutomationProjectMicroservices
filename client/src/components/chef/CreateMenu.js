import {useContext} from "react";
import {UserAuthContext} from "../../contexts/UserAuthContext";
import useAuthAxios from "../../customHooks/useAuthAxios";
import ChefNavbar from "./ChefNavbar";
import Loading from "../Loading";
import Error from "../Error";
import Table from "./Table";
import bgImg from "../../video/background.mp4";

const CreateMenu = ()=>{

  const { user } = useContext(UserAuthContext);
  const authenticatedUser = user || JSON.parse(localStorage.getItem("authenticatedChef"));
  const {data, isPending, error} = useAuthAxios('http://127.0.0.1:5005/api/e_menu/foodItems');
  return (
    <div className="container">
      <video className="backgroundVideo" autoPlay loop muted>
        <source src={bgImg} type="video/mp4" />
      </video>
      <div className="row">
      <ChefNavbar />
        { isPending && <Loading /> }
        { data && <Table data={data} user={authenticatedUser} /> }
        { error && <Error error={error} /> }
      </div>
    </div>
  )
}

export default CreateMenu;
