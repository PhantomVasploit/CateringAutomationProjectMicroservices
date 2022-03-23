import Menu from "./Menu";

const Card = ({data})=>{
  return(
    <div className="cardContainer">
      <div className="row">
        {
          data.items.length <= 0
          ?
            <div className="container mt-4">
              <div className="row">
                <div className="col-lg-6 col-md-6 col-sm-6 col-xs-6 offset-3 float-md-center">
                  <div className="alert alert-info">
                    <h4 className="alert-heading text-uppercase">No Menu</h4>
                    <p className=""> The Menu is yet to be prepared </p>
                  </div>
                </div>
              </div>
            </div>
          :
            <div>
              { data && <Menu data={data} />}
            </div>
        }
      </div>
    </div>

  );
}

export default Card;
