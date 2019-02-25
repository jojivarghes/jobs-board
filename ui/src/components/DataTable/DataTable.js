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

const DataTable1 = () => {
  const data = {
    columns: [
      {
        label: '#',
        field: 'name',
        sort: 'asc',
        width: 150
      },
      {
        label: 'Info',
        field: 'position',
        sort: 'asc',
        width: 270
      },
      {
        label: 'Project',
        field: 'office',
        sort: 'asc',
        width: 200
      },
      {
        label: 'Package',
        field: 'age',
        sort: 'asc',
        width: 100
      },
      {
        label: 'Environment',
        field: 'date',
        sort: 'asc',
        width: 150
      },
      {
        label: 'Status',
        field: 'salary',
        sort: 'asc',
        width: 100
      }
    ],
    rows: [
      {
        name: 'Tiger Nixon',
        position: 'System Architect',
        office: 'Edinburgh',
        age: '61',
        date: '2011/04/25',
        salary: '$320'
      },
      {
        name: 'Garrett Winters',
        position: 'Accountant',
        office: 'Tokyo',
        age: '63',
        date: '2011/07/25',
        salary: '$170'
      },
      {
        name: 'Ashton Cox',
        position: 'Junior Technical Author',
        office: 'San Francisco',
        age: '66',
        date: '2009/01/12',
        salary: '$86'
      },
      {
        name: 'Cedric Kelly',
        position: 'Senior Javascript Developer',
        office: 'Edinburgh',
        age: '22',
        date: '2012/03/29',
        salary: '$433'
      },
      {
        name: 'Airi Satou',
        position: 'Accountant',
        office: 'Tokyo',
        age: '33',
        date: '2008/11/28',
        salary: '$162'
      },
      {
        name: 'Brielle Williamson',
        position: 'Integration Specialist',
        office: 'New York',
        age: '61',
        date: '2012/12/02',
        salary: '$372'
      },
      {
        name: 'Thor Walton',
        position: 'Developer',
        office: 'New York',
        age: '61',
        date: '2013/08/11',
        salary: '$98'
      },
      {
        name: 'Finn Camacho',
        position: 'Support Engineer',
        office: 'San Francisco',
        age: '47',
        date: '2009/07/07',
        salary: '$87'
      },
      {
        name: 'Serge Baldwin',
        position: 'Data Coordinator',
        office: 'Singapore',
        age: '64',
        date: '2012/04/09',
        salary: '$138'
      },
      {
        name: 'Zenaida Frank',
        position: 'Software Engineer',
        office: 'New York',
        age: '63',
        date: '2010/01/04',
        salary: '$125'
      },
      {
        name: 'Zorita Serrano',
        position: 'Software Engineer',
        office: 'San Francisco',
        age: '56',
        date: '2012/06/01',
        salary: '$115'
      },
      {
        name: 'Jennifer Acosta',
        position: 'Junior Javascript Developer',
        office: 'Edinburgh',
        age: '43',
        date: '2013/02/01',
        salary: '$75'
      },
      {
        name: 'Cara Stevens',
        position: 'Sales Assistant',
        office: 'New York',
        age: '46',
        date: '2011/12/06',
        salary: '$145'
      },
      {
        name: 'Hermione Butler',
        position: 'Regional Director',
        office: 'London',
        age: '47',
        date: '2011/03/21',
        salary: '$356'
      },
      {
        name: 'Lael Greer',
        position: 'Systems Administrator',
        office: 'London',
        age: '21',
        date: '2009/02/27',
        salary: '$103'
      },
      {
        name: 'Jonas Alexander',
        position: 'Developer',
        office: 'San Francisco',
        age: '30',
        date: '2010/07/14',
        salary: '$86'
      },
      {
        name: 'Shad Decker',
        position: 'Regional Director',
        office: 'Edinburgh',
        age: '51',
        date: '2008/11/13',
        salary: '$183'
      },
      {
        name: 'Michael Bruce',
        position: 'Javascript Developer',
        office: 'Singapore',
        age: '29',
        date: '2011/06/27',
        salary: '$183'
      },
      {
        name: 'Donna Snider',
        position: 'Customer Support',
        office: 'New York',
        age: '27',
        date: '2011/01/25',
        salary: '$112'
      }
    ]
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