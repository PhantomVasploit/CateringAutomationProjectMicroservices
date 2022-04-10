import {Formik, Form} from "formik";
import {useContext} from "react";
import * as Yup from "yup";
import InputField from "../InputField";
import {UserAuthContext} from "../../contexts/UserAuthContext";

const CustomerLogin = ()=>{
  const {customerLoginSubmit, error} = useContext(UserAuthContext);
  const validate = Yup.object({
    password: Yup.string()
    .min(8, "Password should at least be 8 characters long")
    .required("Password field is required"),
    registrationNumber:Yup.string()
    .required("Registration Number is required"),
  })
  return(
    <div>
      {
        !error
        ?
            <Formik
            initialValues = {{
              password: "",
              registrationNumber: ""
            }}
            validationSchema = {validate}
            onSubmit = {customerLoginSubmit}
            >
              {
                formik=>(
                  <div className="container">
                    <div className="row">
                    <div className="col-lg-6 col-md-6 col-sm-6 col-xs-6 offset-3 float-md-center mt-5">
                      <Form>
                        <fieldset className="form-group">
                          <h1 className="d-flex justify-content-center"><img src={require("../logo.png")} alt="" width="60" height="60" className="d-inline-block align-text-top me-3"  /> Egerton Bites </h1>
                          <legend className="border-bottom mb-4 text-center mt-4">Customer's Sign In</legend>
                          <InputField label="Registration Number" name="registrationNumber" type="text" />
                          <InputField label="Password" name="password" type="password" />
                        </fieldset>
                        <div className="d-flex justify-content-center mt-4">
                          <input className="btn btn-outline-success" type="submit" value="Login"/>
                        </div>
                      </Form>
                    </div>
                    </div>
                  </div>
                )
              }
            </Formik>
          :
            <div>
              <Formik
              initialValues = {{
                password: "",
                registrationNumber: ""
              }}
              validationSchema = {validate}
              onSubmit = {customerLoginSubmit}
              >
                {
                  formik=>(
                    <div className="container">
                      <div className="row">
                      <div className="col-lg-6 col-md-6 col-sm-6 col-xs-6 offset-3 float-md-center mt-5">
                        <Form>
                          <fieldset className="form-group">
                            <h1 className="d-flex justify-content-center"><img src={require("../logo.png")} alt="" width="60" height="60" className="d-inline-block align-text-top me-3"  /> Egerton Bites </h1>
                            <legend className="border-bottom mb-4 text-center mt-4">Customer's Sign In</legend>
                            <div className="lead text-uppercase text-danger mb-2">
                              {
                                error
                              }
                            </div>
                            <InputField label="Registration Number" name="registrationNumber" type="text" />
                            <InputField label="Password" name="password" type="password" />
                          </fieldset>
                          <div className="d-flex justify-content-center mt-4">
                            <input className="btn btn-outline-success" type="submit" value="Login"/>
                          </div>
                        </Form>
                      </div>
                      </div>
                    </div>
                  )
                }
              </Formik>
            </div>

      }
    </div>

  );
}
export default CustomerLogin;
