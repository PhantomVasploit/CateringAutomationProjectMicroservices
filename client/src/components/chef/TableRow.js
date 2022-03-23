import {Link} from "react-router-dom";

const TableRow = ({foodItem, user})=>{

  return(
      <tr>

        <td>{foodItem.codeNumber} </td>

        <td>{foodItem.itemName}</td>

        <td>
          <Link
          id="add"
          className='rounded-circle btn btn-info'
          to="/chef/overlay"
          state={{foodItem:foodItem}}
          >
          +</Link>
        </td>
      </tr>
  )

}

export default TableRow;
