import React from 'react';
import { StepOne } from './StepOne';
import { StepTwo } from './StepTwo';
import { StepThree } from './StepThree';
import { StepFour } from './StepFour';
import Multistep from './MultiStep';

const appSettings = (props) => {
    const steps = [
        {name: 'StepOne', component: <StepOne/>},
        {name: 'StepTwo', component: <StepTwo/>},
        {name: 'StepThree', component: <StepThree/>},
        {name: 'StepFour', component: <StepFour/>}
      ];
    return (    
        <Multistep showNavigation={true} steps={steps}/>
    );
}

export default appSettings;