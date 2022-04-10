import './App.css';
import UserAuthContextProvider from "./contexts/UserAuthContext";
import {BrowserRouter as Router, Route, Routes} from "react-router-dom";

import bgImg from "./video/background.mp4";
import LandingPage from "./components/LandingPage";
import Error from "./components/Error";
import Error404 from "./components/Error404";

import AdminLogin from "./components/administrator/AdminLogin";
import AdminRegister from "./components/administrator/AdminRegister";
import AdminHome from "./components/administrator/AdminHome";
import UserAccounts from "./components/administrator/UserAccounts";

import StockManagerLogin from "./components/stockManager/StockManagerLogin";
import StockManagerRegister from "./components/stockManager/StockManagerRegister";
import StockManagerHome from "./components/stockManager/StockManagerHome";
import CreateStock from "./components/stockManager/CreateStock";
import StockOverLay from "./components/stockManager/OverLay";

import ManagerRegister from "./components/manager/ManagerRegister"
import ManagerLogin from "./components/manager/ManagerLogin";
import ManagerHome from "./components/manager/ManagerHome";
import ManagerUserAccountsPage from "./components/manager/ManagerUserAccountsPage";
import Sales from "./components/manager/Sales";
import Stock from "./components/manager/Stock";
import CustomerAccounts from "./components/manager/CustomerAccount";
import CashierAccounts from "./components/manager/CashierAccounts";
import ChefAccounts from "./components/manager/ChefAccounts";
import ManagerAccounts from "./components/manager/ManagerAccounts";
import CustomerUpdate from "./components/manager/CustomerUpdate";
import CashierUpdate from "./components/manager/CashierUpdate";
import ChefUpdate from "./components/manager/ChefUpdate";
import ManagerUpdate from "./components/manager/ManagerUpdate";


import Orders from "./components/chef/Orders";
import ChefLogin from "./components/chef/ChefLogin";
import ChefRegister from "./components/chef/ChefRegister";
import ChefHome from "./components/chef/ChefHome";
import CreateMenu from "./components/chef/CreateMenu";
import FoodItems from "./components/foodItems/FoodItems";
import Overlay from "./components/chef/Overlay";


import CashierLogin from "./components/cashier/CashierLogin";
import CashierRegister from "./components/cashier/CashierRegister";
import CashierHome from "./components/cashier/CashierHome";
import CreateOrder from "./components/cashier/CreateOrder";
import NextCustomer from "./components/cashier/NextCustomer";
import Cart from "./components/cashier/Cart";


import CustomerLogin from "./components/customer/CustomerLogin";
import CustomerRegister from "./components/customer/CustomerRegister";
import CustomerHome from "./components/customer/CustomerHome";
import CustomerMenu from "./components/customer/CustomerMenu";
import CustomerCart from "./components/customer/CustomerCart";
import CustomerOrders from "./components/customer/CustomerOrders";
import Reciept from "./components/customer/Reciept";


function App() {
  return (
    <div className="App">
      <video className="backgroundVideo" autoPlay loop muted>
        <source src={bgImg} type="video/mp4" />
      </video>
      <Router>
      <UserAuthContextProvider>
        <Routes>

          <Route exact path="/" element={ <LandingPage /> } />
          <Route path="/error" element={<Error/>} />

          <Route path="/admin/register" element={<AdminRegister />} />
          <Route path="/admin/login" element={<AdminLogin />} />
          <Route path="/admin/home" element={<AdminHome />} />
          <Route path="/admin/accounts" element={<UserAccounts />} />

          <Route path="/stock_manager/login" element={<StockManagerLogin />} />
          <Route path="/stock_manager/register" element={<StockManagerRegister />} />
          <Route path="/stock_manager/stock" element={<CreateStock />} />
          <Route path="/stock_manager/home" element={<StockManagerHome />} />
          <Route path="/stock_manager/overlay" element={<StockOverLay/>} />

          <Route path="/manager/register" element={ <ManagerRegister /> } />
          <Route path="/manager/login" element={ <ManagerLogin /> } />
          <Route path="/manager/home" element={ <ManagerHome /> } />
          <Route path="/manager/accounts" element={ <ManagerUserAccountsPage /> } />
          <Route path="/manager/customer" element={ <CustomerAccounts /> } />
          <Route path="/manager/cashier" element={ <CashierAccounts /> } />
          <Route path="/manager/manager" element={ <ManagerAccounts /> } />
          <Route path="/manager/chef" element={ <ChefAccounts /> } />
          <Route path="/manager/customer/update" element={<CustomerUpdate/>} />
          <Route path="/manager/cashier/update" element={<CashierUpdate/>} />
          <Route path="/manager/chef/update" element={<ChefUpdate/>} />
          <Route path="/manager/manager/update" element={<ManagerUpdate/>} />
          <Route path="/manager/sales" element={ <Sales /> } />
          <Route path="/manager/stock" element={ <Stock /> } />


          <Route path="/chef/login" element={<ChefLogin />} />
          <Route path="/chef/register" element={<ChefRegister/>} />
          <Route path="/chef/home" element={<ChefHome />} />
          <Route path="/chef/createMenu" element={<CreateMenu />} />
          <Route path="/emenu" element={<FoodItems />} />
          <Route path="/chef/orders" element={<Orders/>} />
          <Route path="/chef/overlay" element={<Overlay/>} />


          <Route path="/cashier/login" element={<CashierLogin />} />
          <Route path="/cashier/register" element={<CashierRegister />} />
          <Route path="/cashier/home" element={<CashierHome />} />
          <Route path="/cashier/createorder" element={<CreateOrder />} />
          <Route path="/cashier/cart" element={<Cart />} />
          <Route path="/cashier/nextCustomer" element={<NextCustomer/>} />


          <Route path="/customer/login" element={<CustomerLogin/>} />
          <Route path="/customer/register" element={<CustomerRegister/>} />
          <Route path="/customer/home" element={<CustomerHome/>} />
          <Route path="/customer/menu" element={<CustomerMenu/>} />
          <Route path="/customer/cart" element={<CustomerCart/>} />
          <Route path="/customer/orders" element={<CustomerOrders/>} />
          <Route path="/customer/reciept" element={<Reciept/>} />

          <Route path="*" element={<Error404 />} />

          </Routes>
        </UserAuthContextProvider>
      </Router>
    </div>
  );
}

export default App;
