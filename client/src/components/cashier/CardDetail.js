import {useState} from "react";
import {toast} from "react-toastify";

toast.configure();
const CardDetails = ({addToCart, item}) =>{
  const [submitMode, setSubmitMode] = useState({
    rowId: null
  })
  const [count, setCount] = useState(0);
  const [btnAttribute, setBtnAttribute] = useState("btn btn-info");
  const notify = ()=>{
    toast.success('Item added to cart', {position: toast.POSITION.TOP_CENTER});
  }

  return(
    <div className="col-md-4  mb-3">
      <div className="card shadow p-3 rounded ">
        <div className="card-header text-end">
          {item.foodItem.itemName}
        </div>
        <img src={item.foodItem.imgUrl} height="200" className="card-img-top" alt="..." />
        <div className="card-body">
          <p className="card-text text-start">Staff Price: {item.foodItem.staffCafeteriaPrice}</p>
          <p className="card-text text-start">Student Price: {item.foodItem.studentCafeteriaPrice}</p>
          <button
          id="add"
          className={`mb-4 me-4 position-absolute bottom-0 end-0 ${btnAttribute}  rounded-circle`}
          onClick={()=>{
            addToCart(item);
            notify();
            item.foodItem.imgUrl === submitMode.rowId
            ?
              setBtnAttribute("visually-hidden")
            :
              setBtnAttribute("btn btn-info")
          }}
          onMouseEnter={()=>setSubmitMode({rowId: item.foodItem.imgUrl})}
          onMouseLeave={()=>setSubmitMode({rowId: null})}
          >
          +
          </button>
        </div>
      </div>
    </div>
  )
}

export default CardDetails;
