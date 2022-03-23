import {useState, useEffect} from "react";
import { useLocation, Link } from 'react-router-dom';
import axios from "axios";
import Navbar from "./Navbar";

const Cart = ()=>{
  const location = useLocation();
  const {orders} = location.state;
  const [quantity,setQuantity] = useState(1);
  const authenticatedUser = JSON.parse(localStorage.getItem('authenticatedCashier'));
  const [items, setItems] = useState([]);
  

  const authAxios = axios.create({
    baseURL: "http://127.0.0.1:5006/api/order",
    headers: {
      authorization: `Bearer ${localStorage.getItem("jwt")}`
    }
  });

useEffect(()=>{
  const orderItems =  orders.map((order) => {
      order.quantity = quantity;
      order.cashier = authenticatedUser;
      return order;
  });

  setItems(orderItems);
},[])






const uploadOrder = ()=>{
  let singleData = {};
 const data =  items.map((item)=>{
    singleData = Object.assign({}, {
                                      itemOrdered: item._id,
                                      orderAmount: item.quantity,
                                      orderCost: item.quantity * parseInt(item.foodItem.studentCafeteriaPrice),
                                      cashier: item.cashier
                                    });
    return singleData
  });

  console.log(`Data is: ${JSON.stringify(data)}`);

  const setRequestOption = (item) => {

    const requestOption = {
      headers:{
        "Access-Controll-Allow-Origin": "*",
        "Content-Type": "application/json;charset=UTF-8",
        "accept": "application/json"
      },
      body: item
    }
    console.log(`Response Data is: ${JSON.stringify(requestOption)}`);
    return requestOption;
  }

  data.map(async(item)=>{
    const id = item.itemOrdered;
    const response = await authAxios.post(`/${id}/${item.cashier._id}`, setRequestOption(item));
    console.log(`Response is ${JSON.stringify(response)}`);
  })

}

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
            <div className="col">
              <Link to="/cashier/createorder" className="btn btn-outline-success">Back To Menu</Link>
            </div>
            <div className="col">
              <h1 className="badge bg-success text-uppercase">Pay via Mpesa</h1>
            </div>
          </div>

          <div className="row">
            <div className="col-lg-12">
              <hr />
              <h3 className="lead text-uppercase">Items Added To Your Food Cart({orders.length})</h3>
              {
                !orders
                ?
                <p className="badge bg-primary text-wrap text-center"></p>
                :
                <table className="table table-striped table-hover">
                  <thead>
                    <tr>
                      <th scope="col">Food Item</th>
                      <th scope="col">Price</th>
                      <th scope="col">Quantity</th>
                      <th scope="col">Total Cost</th>
                    </tr>
                  </thead>
                    <tbody>
                      {
                        items.map((order)=>(
                          <tr key={order.foodItem._id}>
                            <th scope="row">{order.foodItem.itemName}</th>
                            <td>{order.foodItem.studentCafeteriaPrice}</td>
                            <td>
                              <input name="quantity" type="text" value={quantity} onChange={(e)=>{
                                setQuantity(e.target.value)
                                console.log(`${e.target.value}`);
                              }}/>
                            </td>
                            <td>
                              <p className="ms-2">{quantity * parseInt(order.foodItem.studentCafeteriaPrice)}</p>
                            </td>
                          </tr>
                        ))
                      }
                    </tbody>
                </table>
              }
              <div className="d-flex justify-content-center mt-4">
                <Link
                to="/cashier/nextCustomer"
                className="btn btn-outline-success"
                onClick = {uploadOrder}
                > Check Out </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Cart;
