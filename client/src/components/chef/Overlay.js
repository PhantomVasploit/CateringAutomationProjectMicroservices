import {useState, useLayoutEffect} from "react";
import {useLocation, useNavigate} from "react-router-dom";
import {Formik, Form} from "formik";
import axios from "axios";
import * as Yup from "yup";
import useAuthAxios from "../../customHooks/useAuthAxios";
import ChefNavbar from "./ChefNavbar"
import InputField from "../InputField";

const Overlay = ()=>{
  const location = useLocation();
  const {foodItem} = location.state;
  let [stock, setStock] = useState([]);
  const authenticatedUser = JSON.parse(localStorage.getItem('authenticatedChef'));
  const navigate = useNavigate();

  useLayoutEffect(()=>{
      foodItem.ingredients.map((item)=>{
          axios.get(`http://127.0.0.1:5010/api/stock/${item}`)
          .then((response)=>{
            if(response.data){
              setStock((stock) => [...stock, response.data]);
            }
         })
         .catch((e)=>{
           console.log(`Error is: ${e.message}`);
         })
      })
  }, []);

console.log(`${JSON.stringify(stock)}`);

  const authAxios = axios.create({
    baseURL: "http://127.0.0.1:5002/api/chef",
    headers: {
    authorization: `Bearer ${localStorage.getItem("jwt")}`
  }
  });

  const menuSubmit = async (values)=>{
    const requestOption = {
      headers:{
        "Acess-Controll-Allow-Origin": "*",
        "Content-Type": "application/json;charset=UTF-8",
        "accept":"application/json"
      },
      body: {
        values
      }
    }
    console.log(`Request is: ${requestOption}`);
    const response = await authAxios.post(`http://127.0.0.1:5005/api/e_menu/${foodItem._id}/${authenticatedUser._id}`,  requestOption);
    console.log(`Response is: ${response.data}`);
    navigate("/chef/createMenu");
  }

  const validate = Yup.object({
    amountPrepared: Yup.number()
    .required("Please specify amount prepared")
  })

  return(
    <div className="container">
      <ChefNavbar />
        {
          <div className="row mt-4">
            <div className="col-md-12 sideContainer2">

              <div className="row">
                <div className="col text-light lead mt-4 text-uppercase">Item Detail</div>
              </div>

              <div className="row">
              <div className="col  text-light">Code Number</div>
                <div className="col">
                  {
                    <div className=" text-light" >{foodItem.codeNumber}</div>
                  }
                </div>
              </div>

              <div className="row">
              <div className="col text-light">FoodItem Name</div>
                <div className="col">
                  {
                    <div className="text-light" >{foodItem.itemName}</div>
                  }
                </div>
              </div>

              <hr className="text-light" />

              <div className="row">
                <div className="col text-light lead text-uppercase">Stock Available</div>
              </div>
              <div className="row">
                <div className="col text-light">Ingredient</div>
                <div className="col text-light"> Quantity Procured </div>
                <div className="col text-light"> Price </div>
              </div>

              {
                stock.map((item)=>(
                  <div className="row" key={item.ingredient.itemName}>
                    <div className="col text-light">{item.ingredient.itemName}</div>
                    <div className="col text-light">{item.ingredient.stock[0].quantityPurchased}</div>
                    <div className="col text-light">{item.ingredient.stock[0].price}</div>
                  </div>
                ))
              }

              <hr className="text-light" />

              <div className="row">
                <div className="col text-light lead text-uppercase">Specify amount to be used</div>
              </div>

              <div className="row">
                {
                  stock.map((item)=>(
                    <div key={item.ingredient.itemName}>

                      <div className="col mb-4">
                        <Formik
                          initialValues = {{
                            amountPrepared: ""
                          }}
                          validationSchema = {validate}
                          onSubmit = {menuSubmit}
                        >
                          <Form>
                            <div className="col">
                              <fieldset>
                                <InputField placeholder={`${item.ingredient.itemName}: Enter Amount Used`} name="amountPrepared" type="text" />
                              </fieldset>
                            </div>
                            <div className="d-flex justify-content-center mt-4">
                              <input type="submit" className="btn btn-info" value="submit" />
                            </div>
                          </Form>
                        </Formik>
                      </div>
                    </div>

                  ))
                }
              </div>

            </div>
          </div>
        }

    </div>
  )
}

export default Overlay;
