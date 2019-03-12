import React from 'react';
import DragNDrop from './DragNDrop';

export class StepTwo extends React.Component {
  constructor () {
    super()
    this.state = {
      
    }
  }

  render () {
    return (
      <div id="wrapper">
        <div className="col-lg-12 row">
        <div className="card mb-12 py-3 border-bottom-warning">
          <em style={{paddingLeft:"10px", paddingBottom: "20px"}}>Note: Click on Table name to populate Column name, Then drag and drop to appropriate Keys, Then Click next</em>
          <DragNDrop handlePageTwoData={this.props.handlePageTwoData} id={this.props.id} table={this.props.table}/>
        </div>
        </div>
      </div>
    )
  }
}
