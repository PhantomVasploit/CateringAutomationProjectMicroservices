import { Link } from "react-router-dom";
import AnimatedText from "./AnimatedText";

const LandingPageContent = ()=>{
  return(
    <div  className="col-lg-6 col-md-6 col-sm-6 col-xs-6 offset-3 float-md-center">
      <div className="jumbotron jumbotron-fluid mt-5">
        <div className="container">
            <AnimatedText />
            <p className="lead jumboTronText  fw-bold text-normal">
              Cooking is all about people.
              Food is maybe the only universal thing that really has the power to bring everyone together.
              No matter what culture, everywhere around the world, people eat together.
            </p>
            <p className="text-end"><em className="fw-bold"> Qoute By Chef Guy Fieri.</em></p>
            <hr className="my-4" />
            <p className="fw-bold">
              Check out our E-Menu for the most delicious, luscious food.
            </p>
            <Link className="btn btn-outline-success" to="/emenu">E-Menu</Link>
            </div>
          </div>
      </div>
  )
}

export default LandingPageContent;
