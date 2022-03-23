const CustomerTableRow = ({order})=>{
  return(
    <tr>
      <td>{order.e_menu}</td>
      <td>{order.orderAmount}</td>
      <td>{order.orderCost}</td>
    </tr>
  )
}

export default CustomerTableRow;
