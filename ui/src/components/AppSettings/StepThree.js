import React from 'react';
import { MDBDataTable } from 'mdbreact';

export class StepThree extends React.Component {
  
  render(){
    const data = {
      rows: [
        {
          name: 'Select',
          control: <input type="text" placeholder="Select Query" style={{width:'100%'}} autoFocus/>,
        },
        {
          name: 'Where',
          control: <input type="text" placeholder="Where Clause" style={{width:'100%'}}/>,
        },
        {
          name: 'Join',
          control: <input type="text" placeholder="Join Tables" style={{width:'100%'}}/>,
        }
      ]
    };
  
    return (
      <MDBDataTable
        striped
        bordered
        hover
        searching={false}
        data={data}
        paging={false}
        style={{width:'80%'}}
      />
    );
  }
}
