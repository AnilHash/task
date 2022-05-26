import { useContext, useState } from "react";

import { processCSV, OrderContext } from "../utilities/helper";

export default function CsvReader() {
  const { setOrderList } = useContext(OrderContext);

  const [csvFile, setCsvFile] = useState();
  const handleSubmit = (e) => {
    e.preventDefault();
    if (csvFile) {
      const reader = new FileReader();
      reader.onload = (e) => {
        const text = e.target.result;
        setOrderList(processCSV(text));
      };
      reader.onerror = (e) => {
      }
      reader.readAsText(csvFile);
    } else {
      alert(
        `Please check file-type before upload. Only "csv" file-type accepted`
      );
    }
  };
  return (
    <div className="upload-container">
      <form onSubmit={(e) => handleSubmit(e)}>
        <input
          type="file"
          accept=".csv"
          id="csvFile"
          onChange={(e) => {
            setCsvFile(e.target.files[0]);
          }}
        ></input>
        <br />
        <input type="submit" value="Upload" />
      </form>
    </div>
  );
}
