import { useState } from "react";

const OrderTable = ({ orders }) => {
  const [sortedField, setSortedField] = useState({ ascending: false });
  const sortedArray = [...orders];
  if (sortedField !== null) {
    sortedArray.sort((a, b) => {
      if (a[sortedField.key] < b[sortedField.key]) {
        return sortedField.ascending ? -1 : 1;
      }
      if (a[sortedField.key] > b[sortedField.key]) {
        return sortedField.ascending ? 1 : -1;
      }
      return 0;
    });
  }
  const sortColumn = (col) => {
    setSortedField((prev) => ({
      ...prev,
      ...{ key: col, ascending: !prev.ascending },
    }));
  };
  return (
    <table border={1}>
      <thead>
        <tr>
          <th>Order Id</th>
          <th>Cust Id</th>
          <th
            className="sort-col"
            onClick={() => sortColumn("deliveryPincode")}
          >
            Pin Code
            <p
              className={`pin ${
                sortedField.key === "deliveryPincode" &&
                sortedField.ascending &&
                "active"
              }`}
            ></p>
          </th>
          <th className="sort-col" onClick={() => sortColumn("orderDate")}>
            Order Date
            <p
              className={`date ${
                sortedField.key === "orderDate" &&
                sortedField.ascending &&
                "active"
              }`}
            ></p>
          </th>
          <th>Items</th>
        </tr>
      </thead>
      <tbody>
        {sortedArray.map((odr) => {
          return (
            <tr key={odr.orderId}>
              <td>{odr.orderId}</td>
              <td>{odr.customerId}</td>
              <td>{odr.deliveryPincode}</td>
              <td>{odr.orderDate}</td>
              <td>
                <ul>
                  {Object.keys(odr.items).map((key, i) => (
                    <li key={i}>{`${key} - ${odr.items[key]}`}</li>
                  ))}
                </ul>
              </td>
            </tr>
          );
        })}
      </tbody>
    </table>
  );
};
export default OrderTable;
