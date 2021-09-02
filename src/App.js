import React, { useState } from "react";
import MaterialTable from "material-table";
import GetAppIcon from "@material-ui/icons/GetApp";
import "./App.css";

function App() {
  const [tableData, setTableData] = useState([
    {
      name: "sanju",
      email: "prasad@gmail.com",
      phone: 9491509014,
      age: null,
      gender: "Male",
      city: "papanaidupet",
      fee: 83779,
    },
    {
      name: "toni",
      email: "toni@gmail.com",
      phone: 9497384014,
      age: 24,
      gender: "Male",
      city: "papanaidupet",
      fee: 88927,
    },
    {
      name: "sweety",
      email: "sweety@gmail.com",
      phone: 9750200277,
      age: 23,
      gender: "Female",
      city: "papanaidupet",
      fee: 97467,
    },
    {
      name: "dhani",
      email: "dhani@gmail.com",
      phone: 9497384014,
      age: 17,
      gender: "Male",
      city: "papanaidupet",
      fee: 88927,
    },
  ]);

  const columns = [
    { title: "Name", field: "name", sorting: false,cellStyle:{color:"blue"},headerStyle:{color:"white"}},
    { title: "Email", field: "email", filterPlaceholder: "filter by email" },
    { title: "Phone Number", field: "phone", grouping: false },
    {
      title: "Age",
      field: "age",
      emptyValue: () => <em>null</em>,
      render:(rowData)=><div style={{background:rowData.age>18 ? "green" : "red"}}>{rowData.age}</div>,
      defaultSort: "desc",
      searchable: false,
      export: false,
    },
    { title: "Gender", field: "gender", lookUp: { M: "Male", F: "Female" } },
    { title: "City", field: "city" },
    {
      title: "School fee",
      field: "fee",
      type: "currency",
      currencySetting: { currencyCode: "INR", minimumFractionDigits: 0 },
    },
  ];
  return (
    <div className="App">
      <MaterialTable
        columns={columns}
        editable={{
          onRowAdd: (newRow) =>
            new Promise((resolve, reject) => {
              setTableData([...tableData, newRow]);
              setTimeout(() => resolve(), 500);
            }),
          onRowUpdate: (newRow, oldRow) =>
            new Promise((resolve, reject) => {
              const updateTable = [...tableData];
              updateTable[oldRow.tableData.id] = newRow;
              setTableData(updateTable);
              setTimeout(() => {
                resolve();
              }, 500);
            }),
          onRowDelete: (selectedRow) =>
            new Promise((resolve, reject) => {
              const updateTable = [...tableData];
              updateTable.splice(selectedRow.tableData.id, 1);
              setTableData(updateTable);
              setTimeout(() => {
                resolve();
              }, 1000);
            }),
        }}
        data={tableData}
        title="Student Infomation"
        actions={[
          {
            icon: () => <GetAppIcon />,
            tooltip: "click me",
            onClick: (e, data) => console.log(data),
          }, // isFreeAction:true
        ]}
        onSelectionChange={(selectedRow) => console.log(selectedRow)}
        options={{
          grouping: true,
          rowStyle:(data,index)=>index%2==0?{background:"f5f5f5"}:null,
          headerStyle:{background:"green"},
          columnsButton:true,
          sorting: true,
          search: true,
          searchFieldAlignment: "left",
          searchAutoFocus: true,
          filtering: true,
          paging: true,
          pageSizeOptions: [2, 5, 10],
          paginationType: "stepped",
          paginationPosition: "bottom",
          showFirstLastPageButtons: false,
          exportButton: true,
          exportAllData: true,
          addRowPosition: "first",
          actionsColumnIndex: -1,
          selection: true,
          showSelectAllCheckbox: false,
          showTextRowsSelected: false,
          selectionProps: (rowData) => ({
            disabled: rowData.age !== null,
            color: "primary",
          }),
        }}
      />
    </div>
  );
}

export default App;
