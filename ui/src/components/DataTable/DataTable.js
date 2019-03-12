import React from 'react';
//import ReactTable from "react-table";
//import "react-table/react-table.css";
import { MDBDataTable } from 'mdbreact';


//const apiLocation = 'https://my.api/service';
/*const data = [{firstName: "dfdfdf",
    lastName: "dsdsdF",
    age: Math.floor(Math.random() * 30),
    visits: Math.floor(Math.random() * 100),
    progress: Math.floor(Math.random() * 100),
    status:"comp"}];
const DataTable1 = () => (
    <ReactTable
          data={data}
          columns={[
            {
              Header: "Name",
              columns: [
                {
                  Header: "First Name",
                  accessor: "firstName"
                },
                {
                  Header: "Last Name",
                  id: "lastName",
                  accessor: d => d.lastName
                }
              ]
            },
            {
              Header: "Info",
              columns: [
                {
                  Header: "Age",
                  accessor: "age"
                },
                {
                  Header: "Status",
                  accessor: "status"
                }
              ]
            },
            {
              Header: "Stats",
              columns: [
                {
                  Header: "Visits",
                  accessor: "visits"
                }
              ]
            }
          ]}
          getTdProps={(state, rowInfo, column, instance) => {
            return {
              onMouseEnter: e =>
                console.log("Cell - onMouseEnter", {
                  state,
                  rowInfo,
                  column,
                  instance,
                  event: e
                })
            };
          }}
          defaultPageSize={10}
          className="-striped -highlight"
        />
);*/

const DataTable1 = (props) => {
  const data = {
    columns: [
      {
        label: 'Job Id',
        field: 'job_id',
        sort: 'asc',
        width: 150
      },
      {
        label: 'Status',
        field: 'status',
        sort: 'asc',
        width: 270
      },
      {
        label: 'Start Date',
        field: 'start_time',
        sort: 'asc',
        width: 200
      },
      {
        label: 'End Date',
        field: 'end_time',
        sort: 'asc',
        width: 100
      },
      {
        label: 'Comments',
        field: 'comments',
        sort: 'asc',
        width: 150
      }
    ],
    rows: props.jobsTableRows
  };

  return (
    <MDBDataTable
      striped
      bordered
      hover
      data={data}
    />
  );
}


export default DataTable1;