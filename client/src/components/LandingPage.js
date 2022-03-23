import Navbar from "./Navbar";
import LandingPageContent from "./LandingPageContent";

const LandingPage = ()=>{
  return(

    <div className="row">
      <div className="col-lg-12 bg-image backgroundImage">
        <div className="container ">
          <Navbar />
          <LandingPageContent />
        </div>
        </div>
    </div>
  );
}

export default LandingPage;
