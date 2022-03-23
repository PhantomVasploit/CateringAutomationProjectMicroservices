import { useLocation } from 'react-router-dom';
import Navbar from "../Navbar";

const CustomerReceipt = ()=>{
  const location = useLocation();
  const {orders} = location.state;



  return(
    <div className="row">
      <div className="container">
        <div className="container">
          <Navbar />

          <h1 className="lead text-uppercase mt-5 float-md-center">
            <hr/>
              <img src="https://img.icons8.com/nolan/64/food-cart.png" alt="cart icon"/> Cart
              <hr/>
          </h1>


          <div className="row">
            <div className="col-lg-12">
              <hr />
              <h3 className="lead text-uppercase">Your Reciept</h3>
              {
                !orders
                ?
                <p className="badge bg-primary text-wrap text-center"></p>
                :
                orders.map((order)=>(
                  <div>
                    <div className="row">
                      <div className="col">
                        <div>Food Item</div>
                      </div>

                      <div className="col">
                        <div>{order.foodItem.itemName}</div>
                      </div>
                    </div>

                    <div className="row">
                      <div className="col">
                        <div>Price</div>
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
  )
}

export default CustomerReceipt;
