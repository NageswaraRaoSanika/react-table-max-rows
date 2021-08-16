import React from "react";
import namor from "namor";
import Table from "../table/table.component";

const randomRows = (count) => {
  return new Array(count).fill(undefined).map((m) => ({
    name: namor.generate({ words: 1, numbers: 0 }),
    age: Math.floor(Math.random() * 30),
    visits: Math.floor(Math.random() * 100),
    progress: Math.floor(Math.random() * 100),
    status: Math.random() > 0.33 ? "complicated" : "single",
  }));
};

const App = () => {
  const rows = randomRows(10000);

  const columns = [
    {
      Header: "Name",
      accessor: "name",
    },
    {
      Header: "Age",
      accessor: "age",
    },
    {
      Header: "Visits",
      accessor: "visits",
    },
    {
      Header: "Progress",
      accessor: "progress",
    },
    {
      Header: "Status",
      accessor: "status",
    },
  ];

  return (
    <div>
      <div className="title is-4 ml-6 mt-6 mb-0">React Table Virtualized - 10K Rows</div>
      <Table columns={columns} rows={rows} />
    </div>
  );
};

export default App;
