import {Formik, Form} from "formik";
import {useLocation, useNavigate} from "react-router-dom";
import axios from "axios";
import * as Yup from "yup";
import InputField from "../InputField";
import Loading from "../Loading";
import Error from "../Error";
import useAuthAxios from "../../customHooks/useAuthAxios";


const ChefUpdate = ()=>{
  const location = useLocation();
  const navigate = useNavigate();
  const {id} = location.state;
  const {data, isPending, error} = useAuthAxios(`http://127.0.0.1:5001/api/cashier/account/${id}`);

    const authAxios = axios.create({
      baseURL: "http://127.0.0.1:5002/api/chef",
      headers: {
      authorization: `Bearer ${localStorage.getItem("jwt")}`
    }
    });

  const cashierUpdateSubmit = async (values)=>{
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
    const response = await authAxios.put(`http://127.0.0.1:5001/api/cashier/account/${id}`, requestOption);
    console.log(`Response is: ${response.data}`);
    navigate("/manager/cashier");
  }

  const validate = Yup.object({
    username: Yup.string()
    .max(20, "Username should not exceed 20 characters")
    .required("Username field is required"),
    email: Yup.string()
    .email("Invalid Email")
    .required("Email field is required"),
    employeeNumber:Yup.string()
    .required("Employee Number is required"),
    nationalId: Yup.string()
    .required("National Id Number field is required"),
    password: Yup.string()
    .min(8, "Password should have at least 8 characters")
    .require("Password is required")

  })
  return(
    <div>

      {isPending && <Loading />}

      {
        data &&
          <Formik
          initialValues={{
            username: data.cashier.username,
            email: data.cashier.email,
            employeeNumber: data.cashier.employeeNumber,
            nationalId: data.cashier.nationalId,
            password: ""
          }}
          validationSchema = {validate}
          onSubmit = {cashierUpdateSubmit}>
            {
              formik=>(
                <div className="container">
                  <div className="row">
                  <div className="col-lg-6 col-md-6 col-sm-6 col-xs-6 offset-3 float-md-center">
                    <Form className="needs-validation">
                      <fieldset className="form-group">
                        <h1 className="d-flex justify-content-center"><img src={require("../logo.png")} alt="" width="60" height="60" className="d-inline-block align-text-top me-3"  /> Egerton Bites </h1>
                        <legend className="border-bottom mb-4 text-center mt-4">Cashier Profile Update</legend>
                        <InputField label="Username" name="username" type="text"  />
                        <InputField label="Email" name="email" type="email"  />
                        <InputField label="Password" name="password" type="password"  />
                        <InputField label="Employee Number" name="employeeNumber" type="text"  />
                        <InputField label="National ID Number" name="nationalId" type="text" />
                      </fieldset>
                      <div className="d-flex justify-content-center mt-4">
                        <input className="btn btn-outline-success" type="submit" value="Update"/>
                      </div>
                    </Form>
                  </div>
                  </div>
                </div>
              )
            }
          </Formik>
      }

      {error && <Error />}

    </div>
  );
}
export default ChefUpdate;
