import {Link} from "react-router-dom";

const TableRow = ({ingredient})=>{

  return(
    <tr>
      <td>{ingredient.itemName}</td>
      <td>
        <Link
        id="add"
        className='rounded-circle btn btn-info'
        to="/stock_manager/overlay"
        state={{ingredient:ingredient}}
        >
        +</Link>
      </td>
    </tr>
  )

}

export default TableRow;
