import {useState, Fragment} from "react";
import {useNavigate} from "react-router-dom";
import axios from "axios";

const TableRow = ({foodItem, user})=>{

const [amountPrepared, setAmountPrepared] = useState('');
const [inSubmitMode, setSubmitMode] = useState({
  status: false,
  update: false,
  rowKey: null
})
const [addAttributes, setaddAttribute] = useState("btn btn-outline-info");
const [url, setUrl] = useState("");
const add = document.getElementById('add');
const navigate = useNavigate();

const authAxios = axios.create({
  baseURL: "http://127.0.0.1:5010/api/stock",
  headers: {
     authorization: `Bearer ${localStorage.getItem("jwt")}`
   }

});

const addMode = (id)=>{

  setSubmitMode({
    status: true,
    rowKey: id
  })
  setUrl(`/${id}/${user._id}`)
  setaddAttribute("visually-hidden")
  add.setAttribute("class", `${addAttributes}`);
}


const createStock = async()=>{
  try {
    if(amountPrepared === '' || !amountPrepared){
      navigate("/error");
    }else {
      const requestOption = {
        headers:{
          "Acess-Controll-Allow-Origin": "*",
          "Content-Type": "application/json;charset=UTF-8",
          "accept":"application/json"
        },
        body:{
          amountPrepared
        }
      }
      console.log(`Request is: ${requestOption}`);
      const response = await authAxios.post(url, requestOption);
      console.log(`Response: ${response}`);
      await setUrl("");
      await setSubmitMode({
        status: false
      });

      console.log(`Url is: ${url} inSubmitMode is ${JSON.stringify(inSubmitMode)}`);
    }
  } catch (e) {
      console.log(`Error submiting amount prepared: ${e.message}`);
  }
}


  return(
      <tr>

        <td>{foodItem.codeNumber} </td>

        <td>{foodItem.itemName}</td>

        <td>
          <button
          id="add"
          className={`${addAttributes}`}
          onClick={()=>{
            addMode(foodItem._id);
          }}>
          Add Stock</button>
        </td>
        {
            inSubmitMode.status && inSubmitMode.rowKey === foodItem._id ? (
              <Fragment>
                <td>
                  <input
                  className="form-control shadow-none"
                  id="amountPrepared"
                  placeholder="Amount Prepared"
                  name="amountPrepared"
                  autoComplete="off"
                  onChange={ e => setAmountPrepared(e.target.value) }
                  type="text" />
                </td>

                <td>
                  <button
                  id="submit1"
                  className="btn btn-outline-success"
                  onClick={()=>{
                    createStock();
                  }}>
                  Submit</button>
                </td>

              </Fragment>
            ) : (
              <td></td>
            )
        }
        {
            inSubmitMode.update && inSubmitMode.rowKey === foodItem._id ? (
              <Fragment>
                <td>
                  <input
                  className="form-control shadow-none"
                  id="amountPrepared"
                  placeholder="Amount Prepared"
                  name="amountPrepared"
                  autoComplete="off"
                  onChange={ e => setAmountPrepared(e.target.value) }
                  type="text" />
                </td>

              </Fragment>
            ) : (
              <td></td>
            )
        }

      </tr>
  )

}

export default TableRow;
