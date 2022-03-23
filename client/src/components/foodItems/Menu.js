const Menu = ({data})=>{
  return(
    <div className="container">
      <div className="row menuContainer mt-4">

              <div className="col-md-4 sideImg sideContainer border border-success rounded-start">
                <div className="ms-4 verticalCenter">
                  <div className="jumbotron jumbotron-fluid align-text-bottom">
                    <h1 className="text-center textColor">Food</h1>
                    <h2 className="text-center textColor">Menu</h2>
                    <p className="lead jumboTronText text-normal text-light">
                      <em fw-lighter> Student . Staff . Food  Restraunt </em>
                    </p>
                  </div>
                </div>
              </div>


              <div className="col-md-8 shadow-lg">
                <div className="border border-success sideContainer2">
                  <div className="row">
                    <div className="col mt-4 ms-4 fw-bold  fs-5 text-uppercase textColor">Food Item</div>
                    <div className="col mt-4 fw-bold  fs-5 text-uppercase textColor">Staff Price</div>
                    <div className="col mt-4 fw-bold  fs-5 text-uppercase textColor">Student Price</div>
                  </div>
                    {
                      data.items.map((item)=>(
                        <div className="row">
                          <div className="col ms-4 fw-normal text-light">{item.foodItem.itemName}</div>
                          <div className="col fw-normal text-light">{item.foodItem.staffCafeteriaPrice}</div>
                          <div className="col fw-normal text-light">{item.foodItem.studentCafeteriaPrice}</div>
                        </div>
                      ))
                    }
                </div>
              </div>

      </div>
    </div>
  )
}

export default Menu;
