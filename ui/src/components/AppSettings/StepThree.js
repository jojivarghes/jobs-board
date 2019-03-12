import React from 'react';
import { MDBDataTable } from 'mdbreact';

export class StepThree extends React.Component {
  
  render(){
    const data = {
      rows: [
        {
          name: 'Select',
          control: <input type="text" placeholder="Select Query" style={{width:'100%'}} value={this.props.data} autoFocus disabled/>,
        },
        {
          name: 'Where',
          control: <input type="text" placeholder="Where Clause" style={{width:'100%'}} value={this.props.whereTxt} onChange={this.props.handleWhereChange}/>,
        },
        {
          name: 'Join',
          control: <input type="text" placeholder="Join Tables" style={{width:'100%'}} value={this.props.joinTxt} onChange={this.props.handleJoinChange}/>,
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
