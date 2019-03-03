import React from 'react'

export class StepFour extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      value: ''
    };

    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(event) {
    this.setState({value: event.target.value});
  }

  render () {
    return (
      <div>
      <div className="row">
        <textarea className="u-full-width" 
          style={{minHeight:'200px', height:'auto', marginLeft:'10px', width:'70%'}} 
          value={this.props.previewFinalQuery} 
          onChange={this.handleChange} 
          cols={40} 
          rows={10}
          autoFocus />
      </div>
      </div>
    );
  }
}
