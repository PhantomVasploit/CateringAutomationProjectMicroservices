import {useState} from "react";
import {useLocation, useNavigate} from "react-router-dom";
import {Formik, Form} from "formik";
import axios from "axios";
import * as Yup from "yup";
import useAuthAxios from "../../customHooks/useAuthAxios";
import Navbar from "./Navbar"
import InputField from "../InputField";

const Overlay = ()=>{
  const location = useLocation();
  const {ingredient} = location.state;
  const authenticatedUser = JSON.parse(localStorage.getItem('authenticatedStockManager'));
  const navigate = useNavigate();



  const authAxios = axios.create({
    baseURL: "http://127.0.0.1:5010/api/stock",
    headers: {
    authorization: `Bearer ${localStorage.getItem("jwt")}`
  }
  });

  const stockSubmit = async (values)=>{
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
    const response = await authAxios.post(`/${ingredient._id}/${authenticatedUser._id}`,  requestOption);
    console.log(`Response is: ${response.data}`);
    navigate("/stock_manager/stock");
  }

  const validate = Yup.object({
    quantityPurchased: Yup.number()
    .required("Please specify quantity purchased"),
    price: Yup.number()
    .required("Please specify price")
  })

  return(
    <div className="container">
      <Navbar />
        {
          <div className="row mt-4">
            <div className="col-md-12 sideContainer2">

              <div className="row">
                <div className="col text-light lead mt-4">Item Detail</div>
              </div>

              <div className="row">
              <div className="col  text-light">ItemName</div>
                <div className="col">
                  {
                    <div className=" text-light" >{ingredient.itemName}</div>
                  }
                </div>
              </div>


              <hr className="text-light" />

              <div className="row">
                <div className="col text-light lead">Specify Quantity Procured And Price</div>
              </div>

              <div className="row">
              <div className="col mb-4">
                <Formik
                  initialValues = {{
                    quantityPurchased: "",
                    price: ""
                  }}
                  validationSchema = {validate}
                  onSubmit = {stockSubmit}
                >
                  <Form>
                    <div className="col">
                      <fieldset>
                        <InputField placeholder={`Enter Quantity Purchased`} name="quantityPurchased" type="text" />
                        <InputField placeholder={`Enter Price In Kenya Shillinhgs`} name="price" type="text" />
                      </fieldset>
                    </div>
                    <div className="d-flex justify-content-center mt-4">
                      <input type="submit" className="btn btn-info" value="submit" />
                    </div>
                  </Form>
                </Formik>
              </div>
              </div>

            </div>
          </div>
        }

    </div>
  )
}

export default Overlay;
