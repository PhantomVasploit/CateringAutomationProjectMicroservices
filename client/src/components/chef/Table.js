import {useState} from "react";
import TableRow from "./TableRow";

const Table = ({data, user})=>{
  const [searchTerm, setSearchTerm] = useState('');
   return(
    <div className="container mt-3">
      <div className="row">
        <div className="col">
        <div className="row">
          <div className="col">
            <input
            className="form-control shadow-none cardOpacity mb-4"
            placeholder="Search by food item name..."
            name="Search"
            type="text"
            onChange={(e)=>{
              setSearchTerm(e.target.value)
            }}
            />
          </div>
        </div>

          <table className="table  table-hover text-light sideContainer2">
            <thead>
              <tr>
                <th scope="col text-light">Code Number</th>
                <th scope="col text-light">Food Item</th>
                <th scope="col text-light">Add To Menu</th>
              </tr>
            </thead>
            <tbody>
              {
                data.items.filter((foodItem)=>{
                  if(searchTerm === ""){
                    return foodItem
                  }else if (foodItem.itemName.toLowerCase().includes(searchTerm.toLowerCase())) {
                    return foodItem
                  }
                }).map((foodItem)=>(
                  <TableRow key={foodItem._id} foodItem={foodItem} user={user} />
                ))
              }
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default Table;
