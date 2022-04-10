import {useState, useEffect} from "react";
import { useLocation, Link } from 'react-router-dom';
import axios from "axios";
import Navbar from "./Navbar";

const Cart = ()=>{
  const location = useLocation();
  const {orders} = location.state;
  let [quantity,setQuantity] = useState(1);
  let [submitMode, setSubmitMode] = useState(null);
  let [id, setId] = useState(null);
  const authenticatedUser = JSON.parse(localStorage.getItem('authenticatedCustomer'));
  const [items, setItems] = useState([]);

  const authAxios = axios.create({
    baseURL: "http://127.0.0.1:5006/api/order/customer",
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
    const response = await authAxios.post(`/${item.authenticatedUser._id}/${id}`, setRequestOption(item));
    console.log(`Response is ${JSON.stringify(response)}`);
  })

}

  return(
    <div className="row">
      <div className="container ">
        <div className="container">
          <Navbar />
          <div className="sideContainer2 text-light">

            <h1 className="lead text-uppercase mt-5 float-md-center">
              <hr/>
                <img className="ms-3" alt="" src="https://img.icons8.com/external-flaticons-flat-flat-icons/64/000000/external-cart-web-flaticons-flat-flat-icons.png"/> Cart
              <hr/>
            </h1>

            <div className="row">
              <div className="col">
                <Link to="/customer/menu" className="btn btn-outline-success ms-3">Back To Menu</Link>
              </div>
              <div className="col">
                <h1 className="badge bg-success text-uppercase">Pay via Mpesa</h1>
              </div>
            </div>

            <div className="row">
              <div className="col-lg-12">
                <hr />
                <h3 className="lead text-uppercase ms-3">Items Added To Your Food Cart({orders.length})</h3>
                {
                  !orders
                  ?
                  <p className="badge bg-primary text-wrap text-center"></p>
                  :
                  <table className="table table-striped table-hover text-light">
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
                            <tr
                            key={order.foodItem._id}
                            onMouseEnter = {()=>{
                              setSubmitMode(submitMode=order._id)
                              setId(order.foodItem._id)
                            }}
                            onMouseLeave = {()=>{
                              setSubmitMode(submitMode=null)
                              setId(null)
                            }}
                            >
                              <th className="text-light" scope="row">{order.foodItem.itemName}</th>
                              <td className="text-light">{order.foodItem.studentCafeteriaPrice}</td>
                              <td className="text-light">
                                <input
                                type="text"
                                value={id === order.foodItem._id ? quantity : 1}
                                onChange={(e)=>{ id===order.foodItem._id ? setQuantity(e.target.value) : setQuantity(1)}} />
                              </td>
                              <td className="text-light">
                                <p className="ms-2">{ id === order.foodItem._id ? quantity * parseInt(order.foodItem.studentCafeteriaPrice): order.foodItem.studentCafeteriaPrice}</p>
                              </td>
                            </tr>
                          ))
                        }
                      </tbody>
                  </table>
                }
                <div className="d-flex justify-content-center mt-4 mb-4">
                  <Link
                  to="/customer/reciept"
                  state={{orders: orders}}
                  className="btn btn-info"
                  onClick = {uploadOrder}
                  > Check Out </Link>
                </div>
              </div>
            </div>

          </div>
        </div>
      </div>
    </div>
  )
}

export default Cart;
