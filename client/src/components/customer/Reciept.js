import { useLocation } from 'react-router-dom';
import Navbar from "./Navbar";

const CustomerReceipt = ()=>{
  const location = useLocation();
  const {orders} = location.state;


  return(
    <div className="row">
      <div className="container">
        <div className="container">
          <Navbar />
            <div className="sideContainer2 text-light">
            <h1 className="lead text-uppercase mt-5 float-md-center">
                <hr/>
                <img className="ms-3" src="https://img.icons8.com/external-kosonicon-lineal-color-kosonicon/64/000000/external-receipt-black-friday-kosonicon-lineal-color-kosonicon.png"/>Reciept
            </h1>


            <div className="row">
              <div className="col-lg-12">
                <hr />
                <h3 className="lead text-uppercase ms-3">Your Reciept</h3>
                {
                  !orders
                  ?
                  <p className="badge bg-primary text-wrap text-center"></p>
                  :
                  orders.map((order)=>(
                    <div className="mb-3">
                      <div className="row">
                        <div className="col ">
                          <div className="ms-3">Food Item</div>
                        </div>

                        <div className="col">
                          <div>{order.foodItem.itemName}</div>
                        </div>
                      </div>

                      <div className="row">
                        <div className="col">
                          <div className="ms-3">Price</div>
                        </div>

                        <div className="col">
                          <div>{order.foodItem.studentCafeteriaPrice}</div>
                        </div>
                      </div>
                    </div>
                  ))

                  }
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default CustomerReceipt;
