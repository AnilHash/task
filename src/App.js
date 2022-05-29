import React, {useState } from "react";
import CsvReader from "./components/CsvReader";
import MainComponent from "./components/MainComponent";
import { OrderContext } from "./utilities/helper";

const App = () => {
  const [orderList, setOrderList] = useState([]);
  return (
    <div className="App">
      <h2>Order Table</h2>
      <OrderContext.Provider
        value={{ orderList, setOrderList}}
      >
        <CsvReader />
        <MainComponent />
      </OrderContext.Provider>
    </div>
  );
};

export default App;
