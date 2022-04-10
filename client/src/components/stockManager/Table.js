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

          <table className="table  text-light sideContainer2">
            <thead>
              <tr>
                <th scope="col text-uppercase">ItemName</th>
                <th scope="col"></th>
              </tr>
            </thead>
            <tbody>
              {
                data.items.filter((ingredient)=>{
                  if(searchTerm === ""){
                    return ingredient
                  }else if (ingredient.itemName.toLowerCase().includes(searchTerm.toLowerCase())) {
                    return ingredient
                  }
                }).map((ingredient)=>(
                  <TableRow key={ingredient._id}  ingredient={ingredient} />
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
