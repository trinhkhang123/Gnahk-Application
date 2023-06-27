import axios from 'axios'
import "./HistoryTransaction.css" 
import { useState, useEffect } from "react";

export default function HistoryTransaction() {
  const [data, setData] = useState([{}]);

  useEffect(() => {
    getData();
  }, []);

  const getData = async () => {
    const response = await axios.get('/getHistory', {
      params: {}
    });
    setData(response.data.reverse());
  };

  return (
    <div className="scrollable-table">
      <table>
        <thead>
          <tr>
            <th className="address-column">Address Wallet</th>
            <th className="type-transaction-column">Type Transaction</th>
            <th className="time-column">Time</th>
            <th className="status-column">Status</th>
          </tr>
        </thead>
        <tbody>
          {data.map((item, index) => (
            <tr key={index}>
              <td>{item.address}</td>
              <td>{item.typeTransaction}</td>
              <td>{item.time}</td>
              <td>{item.status}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}