import React from 'react'

export class StepOne extends React.Component {
  constructor () {
    super()
    this.state = { 
      userName: '', 
      password: '',
      host: '',
      port: ''
    }
    this.handleUserNameChanged = this.handleUserNameChanged.bind(this);
    this.handlePasswordChanged = this.handlePasswordChanged.bind(this);  
    this.handleHostChanged = this.handleHostChanged.bind(this);
    this.handlePortChanged = this.handlePortChanged.bind(this);  }

  handleUserNameChanged (event) {
    this.setState({userName: event.target.value})
  }

  handlePasswordChanged (event) {
    this.setState({password: event.target.value})
  }

  handleHostChanged (event) {
    this.setState({host: event.target.value})
  }

  handlePortChanged (event) {
    this.setState({port: event.target.value})
  }

  render () {
    return (
      <div className='center'>
        <div className='row' style={{margin: '10px 0 0 0'}}>
          <div className='six columns'>
            <label>User Name</label>
            <input
              className='u-full-width'
              placeholder='User Name'
              type='text'
              onChange={this.handleUserNameChanged}
              value={this.state.userName}
              autoFocus
            />
          </div>
        </div>
        <div className='row' style={{margin: '10px 0 0 0'}}>
          <div className='six columns'>
            <label>Password</label>
            <input
              className='u-full-width required'
              placeholder='Password'
              type='password'
              onChange={this.handlePasswordChanged}
              value={this.state.password}
            />
          </div>
        </div>
        <div className='row' style={{margin: '10px 0 0 0'}}>
          <div className='six columns'>
            <label>Host</label>
            <input
              className='u-full-width'
              placeholder='Host'
              type='text'
              onChange={this.handleHostChanged}
              value={this.state.host}
            />
          </div>
        </div>
        <div className='row' style={{margin: '10px 0 0 0'}}>
          <div className='six columns'>
            <label>Port</label>
            <input
              className='u-full-width'
              placeholder='Port'
              type='text'
              onChange={this.handlePortChanged}
              value={this.state.port}
            />
          </div>
        </div>
        <button type="button" style={{float: 'left'}}>Submit</button>
      </div>
    )
  }
}
