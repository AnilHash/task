import React, { useContext, useState } from "react";
import { OrderContext } from "../utilities/helper";
import Filters from "./FilterComponent";
import OrderTable from "./OrderTable";

const MainComponent = () => {
  const initialFilterValue = {
    pin: "",
    date: "",
  };
  const [filter, setFilter] = useState(initialFilterValue);
  const [searchItem, setSearchItem] = useState("");
  const { orderList } = useContext(OrderContext);
  const list = orderList;
  const visibleList = () => {
    let formattedDate = "";
    if (filter.date) {
      const dateArr = filter.date.split("-");
      formattedDate = `${dateArr[2]}/${dateArr[1]}/${dateArr[0]}`;
    }
    return list.filter((odr) => {
      if (searchItem) {
        return (
          odr.deliveryPincode.includes(filter.pin) &&
          odr.orderDate.includes(formattedDate) &&
          searchItem
            .split(" ")
            .every((sItem) =>
              Object.keys(odr.items).some((item) =>
                item.toLowerCase().includes(sItem.toLowerCase())
              )
            )
        );
      } else {
        return (
          odr.deliveryPincode.includes(filter.pin) &&
          odr.orderDate.includes(formattedDate)
        );
      }
    });
  };
  const handleFilterChange = (obj) => {
    setFilter({ ...filter, ...obj });
  };
  const handleSearch = (value) => {
    visibleList(value);
    setSearchItem(value);
  };
  return (
    <div className="table-filter-wrap">
      {orderList.length === 0 ? (
        <h3>Please Upload A File....</h3>
      ) : (
        <div>
          <Filters
            filterObj={{
              initialFilterValue,
              filter,
              handleFilterChange,
              handleSearch,
            }}
          />
          <OrderTable orders={visibleList()} />
        </div>
      )}
    </div>
  );
};

export default MainComponent;
