import React from 'react';
import { StepOne } from './StepOne';
import { StepTwo } from './StepTwo';
import { StepThree } from './StepThree';
import { StepFour } from './StepFour';
import Multistep from './MultiStep';
import axios from 'axios';

class AppSettings extends React.Component {
        state = { 
            userName: '', 
            password: '',
            host: '',
            port: '',
            options: [],
            selectedOption: '',
            db: ''
        };

    componentDidMount(){
        axios.get('http://www.mocky.io/v2/5c77df5830000053009d6551')
        .then((response) => {
          this.setState({options:response.data.sources});
        })
        .catch((error) => {
          console.log(error);
        })
    }

      handleUserNameChanged = (event) => {
        this.setState({userName: event.target.value})
      }
    
      handleDbNameChanged = (event) => {
        this.setState({dbName: event.target.value})
      }
    
      handlePasswordChanged = (event) => {
        this.setState({password: event.target.value})
      }
    
      handleHostChanged = (event) => {
        this.setState({host: event.target.value})
      }
    
      handlePortChanged = (event) => {
        this.setState({port: event.target.value})
      }
    
      handleChange = (event) => {
        this.setState({selectedOption: event.target.value});
        console.log(this.state.selectedOption);
      }

      render(){
        const steps = [
            {name: 'StepOne', component: <StepOne myData={this.state} 
                                handleUserNameChanged={this.handleUserNameChanged}
                                handleDbNameChanged={this.handleDbNameChanged}
                                handlePasswordChanged = {this.handlePasswordChanged}
                                handleHostChanged = {this.handleHostChanged}
                                handlePortChanged = {this.handlePortChanged}
                                handleChange = {this.handleChange}/>},
            {name: 'StepTwo', component: <StepTwo/>},
            {name: 'StepThree', component: <StepThree/>},
            {name: 'StepFour', component: <StepFour/>}
          ];
        return (    
            <Multistep showNavigation={true} steps={steps}/>
        );
      }
}

export default AppSettings;