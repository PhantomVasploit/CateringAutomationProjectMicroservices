import {useLocation, useNavigate} from "react-router-dom";
import {Formik, Form} from "formik";
import axios from "axios";
import * as Yup from "yup";
import useAuthAxios from "../../customHooks/useAuthAxios";
import ChefNavbar from "./ChefNavbar"
import Loading from "../Loading";
import Error from "../Error";
import InputField from "../InputField";

const Overlay = ()=>{
  const location = useLocation();
  const {foodItem} = location.state;
  const {data, isPending, error} = useAuthAxios(`http://127.0.0.1:5010/api/stock/${foodItem._id}`);
  const authenticatedUser = JSON.parse(localStorage.getItem('authenticatedChef'));
  const navigate = useNavigate();

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
        {isPending && <Loading />}
        {
          data &&
          <div className="row mt-4">
            <div className="col-md-12 sideContainer2">

              <div className="row">
                <div className="col text-light lead mt-4">Item Detail</div>
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
                <div className="col text-light lead">Stock Detail</div>
              </div>

              <div className="row">
              <div className="col  text-light">Code Number</div>
                <div className="col">
                  {
                    <div className=" text-light" ></div>
                  }
                </div>
              </div>

              <div className="row">
              <div className="col  text-light">Amount Procured</div>
                <div className="col">
                  {
                    <div className=" text-light" ></div>
                  }
                </div>
              </div>

              <hr className="text-light" />

              <div className="row">
                <div className="col text-light lead">Specify amount prepared</div>
              </div>

              <div className="row mb-4">
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
                        <InputField placeholder="Enter Amount Prepared" name="amountPrepared" type="text" />
                      </fieldset>
                    </div>
                    <div className="d-flex justify-content-center mt-4">
                      <input type="submit" className="btn btn-outline-info" value="submit" />
                    </div>
                  </Form>
                </Formik>
              </div>

            </div>
          </div>
        }

        {error && <Error />}
    </div>
  )
}

export default Overlay;
