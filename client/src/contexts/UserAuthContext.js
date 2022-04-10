import { createContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios"
export const UserAuthContext= createContext();


const UserAuthContextProvider = (props)=>{
  const[user, setUser] = useState(null);
  const[token, setToken] = useState(null);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const addError = (error) =>{
    setError(error);
  }
  const addCustomer = (user)=>{
      setUser(user);
      localStorage.setItem('authenticatedCustomer', JSON.stringify(user));
  }
  const addCashier = (user)=>{
      setUser(user);
      localStorage.setItem('authenticatedCashier', JSON.stringify(user));
  }
  const addChef = (user)=>{
      setUser(user);
      localStorage.setItem('authenticatedChef', JSON.stringify(user));
  }
  const addManger = (user)=>{
      setUser(user);
      localStorage.setItem('authenticatedManager', JSON.stringify(user));
  }
  const addStockManger = (user)=>{
      setUser(user);
      localStorage.setItem('authenticatedStockManager', JSON.stringify(user));
  }
  const addAdmin = (user)=>{
      setUser(user);
      localStorage.setItem('authenticatedAdmin', JSON.stringify(user));
  }

  const addToken = (token)=>{
    setToken(token);
    localStorage.setItem('jwt', token);
  }

  const managerLoginSubmit = (values)=>{
    const requestOption = {

      headers:{
        "Acess-Controll-Allow-Origin": "*",
        "Content-Type": "application/json;charset=UTF-8",
        "accept":"application/json"
      },
      body:{
        values
      }
    }
    console.log(`Request is: ${requestOption}`);
    axios.post("http://127.0.0.1:5003/api/manager/login", requestOption)
    .then((response)=>{
      if(response.data.manager === `Invalid login credentials`){
        addError(response.data.manager);
        console.log(`Error is: ${response.data.manager}`)
      }else {
        addManger(response.data.manager);
        addToken(response.data.token);
        navigate("/manager/home");
      }
    })
    .catch((e)=>{
      addError(e.message);
      console.log(`Error is: ${e.message}`)
    })
  }

  const adminLoginSubmit = async (values)=>{
    const requestOption = {

      headers:{
        "Acess-Controll-Allow-Origin": "*",
        "Content-Type": "application/json;charset=UTF-8",
        "accept":"application/json"
      },
      body:{
        values
      }
    }
    console.log(`Request is: ${requestOption}`);
    axios.post("http://127.0.0.1:5008/api/admin/login", requestOption)
    .then((response)=>{
      if(response.data.admin === `Invalid login credentials`){
        addError(response.data.admin);
        console.log(`Error is: ${response.data.admin}`)
      }else {
        addAdmin(response.data.admin);
        addToken(response.data.token);
        navigate("/admin/home");
      }
    })
    .catch((e)=>{
      addError(e.message);
      console.log(`Error is: ${e.message}`)
    })
  }

  const stockManagerLoginSubmit = async (values)=>{
    const requestOption = {

      headers:{
        "Acess-Controll-Allow-Origin": "*",
        "Content-Type": "application/json;charset=UTF-8",
        "accept":"application/json"
      },
      body:{
        values
      }
    }
    console.log(`Request is: ${requestOption}`);
    axios.post("http://127.0.0.1:5009/api/stock_manager/login", requestOption)
    .then((response)=>{
      if(response.data.stockManager === `Invalid login credentials`){
        addError(response.data.stockManager);
        console.log(`Error is: ${response.data.stockManager}`)
      }else {
        addStockManger(response.data.stockManager);
        addToken(response.data.token);
        navigate("/stock_manager/home");
      }
    })
    .catch((e)=>{
      addError(e.message);
      console.log(`Error is: ${e.message}`)
    })
  }

  const chefLoginSubmit = async (values)=>{
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
    console.log(`Values: ${values}`);
    console.log(`Request is: ${requestOption}`);
    axios.post("http://127.0.0.1:5002/api/chef/login", requestOption)
    .then((response)=>{
      if(response.data.chef === `Invalid login credentials`){
        addError(response.data.chef);
        console.log(`Error is: ${response.data.chef}`)
      }else {
        addChef(response.data.chef);
        addToken(response.data.token);
        navigate("/chef/home");
      }
    })
    .catch((e)=>{
      addError(e.message);
      console.log(`Error is: ${e.message}`)
    })
  }

  const cashierLoginSubmit = async (values)=>{
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
    console.log(`Values: ${values}`);
    console.log(`Request is: ${requestOption}`);
    axios.post("http://127.0.0.1:5001/api/cashier/login", requestOption)
    .then((response)=>{
      if(response.data.cashier === `Invalid login credentials`){
        addError(response.data.cashier);
        console.log(`Error is: ${response.data.cashier}`)
      }else {
        addCashier(response.data.cashier);
        addToken(response.data.token);
        navigate("/cashier/home");
      }
    })
    .catch((e)=>{
      addError(e.message);
      console.log(`Error is: ${e.message}`)
    })
  }

  const customerLoginSubmit = async (values)=>{
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
    console.log(`Values: ${values}`);
    console.log(`Request is: ${requestOption}`);
    axios.post("http://127.0.0.1:5000/api/customer/login", requestOption)
    .then((response)=>{
      if(response.data.customer === `Invalid login credentials`){
        addError(response.data.customer);
        console.log(`Error is: ${response.data.customer}`)
      }else {
        addCustomer(response.data.customer);
        addToken(response.data.token);
        navigate("/customer/home");
      }
    })
    .catch((e)=>{
      addError(e.message);
      console.log(`Error is: ${e.message}`)
    })
  }

  const managerRegisterSubmit = async (values)=>{
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
    const response = await axios.post("http://127.0.0.1:5003/api/manager/register", requestOption);
    console.log(`Response is: ${response}`);
    await addManger(response.data.manager);
    await addToken(response.data.token);
    navigate("/admin/home");
  }

  const adminRegisterSubmit = async (values)=>{
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
    const response = await axios.post("http://127.0.0.1:5008/api/admin/register", requestOption);
    console.log(`Response is: ${response}`);
    await addAdmin(response.data.admin);
    await addToken(response.data.token);
    navigate("/admin/home");
  }

  const stockManagerRegisterSubmit = async (values)=>{
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
    const response = await axios.post("http://127.0.0.1:5009/api/stock_manager/register", requestOption);
    console.log(`Response is: ${response}`);
    await addStockManger(response.data.stockManager);
    await addToken(response.data.token);
    navigate("/stock_manager/home");
  }

  const chefRegisterSubmit = async (values)=>{
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
    const response = await axios.post("http://127.0.0.1:5002/api/chef/register", requestOption);
    console.log(`Response is: ${response.data}`);
    await addChef(response.data.chef);
    await addToken(response.data.token);
    navigate("/admin/home");
  }

  const cashierRegisterSubmit = async (values)=>{
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
    const response = await axios.post("http://127.0.0.1:5001/api/cashier/register", requestOption);
    console.log(`Response is: ${response.data}`);
    await addCashier(response.data.cashier);
    await addToken(response.data.token);
    navigate("/admin/home");
  }

  const customerRegisterSubmit = async (values)=>{
    const requestOption = {
      headers:{
        "Acess-Controll-Allow-Origin": "*",
        "Content-Type": "application/json;charset=UTF-8",
        "accept":"application/json"
      },
      body:{
        values
      }
    }
    console.log(`Request is: ${requestOption}`);
    const response = await axios.post("http://127.0.0.1:5000/api/customer/register", requestOption);
    console.log(`Response is: ${response.data}`);
    await addCustomer(response.data.customer);
    await addToken(response.data.token);
    navigate("/customer/home");
  }

  return(
    <UserAuthContext.Provider value={{token, user, error, managerLoginSubmit, managerRegisterSubmit, chefLoginSubmit, chefRegisterSubmit, cashierLoginSubmit, cashierRegisterSubmit, customerLoginSubmit, customerRegisterSubmit, stockManagerLoginSubmit, stockManagerRegisterSubmit, adminLoginSubmit, adminRegisterSubmit}}>
      {props.children}
    </UserAuthContext.Provider>
  );
}

export default UserAuthContextProvider;
