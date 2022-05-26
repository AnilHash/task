import { createContext } from "react";

export const OrderContext = createContext();

export const processCSV = (text) => {
  const keys = text.slice(0, text.indexOf("\r")).split(",");
  const rows = text.slice(text.indexOf("\n") + 1).split("\n");
  rows.pop();
  const result = rows.map((row) => {
    const values = row.split(",");
    const mainObject = keys.reduce((obj, key, i) => {
      if (key === "items") {
        const itemArray = values[i].split(";");
        itemArray.pop();
        obj[key] = itemArrange(itemArray);
      } else {
        obj[key] = values[i];
      }

      return obj;
    }, {});
    return mainObject;
  });
  return result;
};

const itemArrange = (arr) => {
  const itemObj = {};
  arr.forEach((ele) => {
    const [key, value] = ele.split(":");
    Object.assign(itemObj, { [key]: value });
  });
  return itemObj;
};
