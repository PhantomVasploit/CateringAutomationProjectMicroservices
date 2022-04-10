import {useState, useLayoutEffect} from "react";
import {Chart as ChartJS, registerables} from "chart.js";
import {Line} from "react-chartjs-2";

ChartJS.register(...registerables);

const StockChart = ({data})=>{
  let [label, setLabel] = useState([]);
  let [price, setPrice] = useState([]);
  let [quantity, setQuantity] = useState([]);
  let [total, setTotal] = useState([])
  const date = new Date().toLocaleDateString();

  useLayoutEffect(()=>{
    data.merged.map((item)=>{
      setLabel((label)=>[...label, item.itemName]);
      console.log(`${JSON.stringify(item)}`);
      setPrice((price)=>[...price, item.price]);
      setQuantity((quantity)=>[...quantity, item.quantityPurchased]);
      setTotal((total)=>[...total, 25000 ]);
    })
  }, [])

  const info = {
    labels: label,
    datasets: [
      {
        label: `Expenditure on stock for the day: ${date}`,
        data: total,
        fill: true,
        tension: 0.1,
        borderColor: 'rgb(75, 192, 192)',
        backgroundColor: 'rgba(75, 192, 192, 0.2)'
      }
    ]
  }

    const legend = {
    display: true,
    position: "bottom",
    labels: {
      fontColor: "#323130",
      fontSize: 14
    }
  };


  return(
    <div className="container">
      <Line className="text-light" data={info} legend={legend}  />
    </div>
  )
}

export default StockChart;
