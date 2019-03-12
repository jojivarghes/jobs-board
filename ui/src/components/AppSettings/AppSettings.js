import React from 'react';
import { StepOne } from './StepOne';
import { StepTwo } from './StepTwo';
import { StepThree } from './StepThree';
import { StepFour } from './StepFour';
import Multistep from './MultiStep';
import axios from '../../axios-jobs';


class AppSettings extends React.Component {
        state = { 
            username: '', 
            password: '',
            host: '',
            port: '',
            options: [],
            type: '',
            db: '',
            table: [],
            pageTwo: []
        };

    componentDidMount(){
        axios.get('/api/sources')
        .then((response) => {
          this.setState({options:response.data.sources});
        })
        .catch((error) => {
          console.log(error);
        })
      }
      
      handleTable = (val) => {
        if (val)
          this.setState({table: val});
      }

      handleUserNameChanged = (event) => {
        this.setState({username: event.target.value})
      }
    
      handleDbNameChanged = (event) => {
        this.setState({dbname: event.target.value})
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

      handlePageTwoData = (key, value) => {
        var pageTwoCopy = [...this.state.pageTwo];
        if(!pageTwoCopy[0]) {
          pageTwoCopy[0] = {};
        }
        pageTwoCopy[0][key] = value;
        this.setState({pageTwo: pageTwoCopy});
      }
    
      handleChange = (event) => {
        this.setState({type: event.target.value});
        setTimeout(()=>{
          for(var i=0;i<this.state.options.length;i++){
            if(this.state.type === this.state.options[i].name){
              this.setState({port: this.state.options[i].port});
              break;
            }
            else {
              this.setState({port: ''})
            }
          }
        },500)
      }

      handleWhereChange = (event) => {
        this.setState({whereTxt: event.target.value});
      }

      handleJoinChange = (event) => {
        this.setState({joinTxt: event.target.value});
      }

      setSelectQuery = () =>{
        var pgTwo = this.state.pageTwo[0];
        if(pgTwo && pgTwo['job_id'] && pgTwo['start_time'] && pgTwo['end_time'] && pgTwo['status'] && pgTwo['comments']) {
          debugger;
          var tableName = this.state.pageTwo[0]['job_id'].split(".")[0];
        return "select " + this.state.pageTwo[0]['job_id'] + " as job_id, " 
        + this.state.pageTwo[0]['start_time'] + " as start_time, "
        + this.state.pageTwo[0]['end_time'] + " as end_time, "
        + this.state.pageTwo[0]['status'] + " as status, "
        + this.state.pageTwo[0]['comments'] + " as comments from "
        + tableName;
        } else if(pgTwo && pgTwo['job_id'] && pgTwo['start_time'] && pgTwo['end_time'] && pgTwo['status']) {
          var tableName = this.state.pageTwo[0]['job_id'].split(".")[0];
        return "select " + this.state.pageTwo[0]['job_id'] + " as job_id, " 
        + this.state.pageTwo[0]['start_time'] + " as start_time, "
        + this.state.pageTwo[0]['end_time'] + " as end_time, "
        + this.state.pageTwo[0]['status'] + " as status from "
        + tableName;
        }
        return "";
        
      }

      formFinalQuery = () => {
        if(this.state.whereTxt && this.state.joinTxt) {
          return this.setSelectQuery() + " " + this.state.whereTxt + " " + this.state.joinTxt;
        } else if(!this.state.whereTxt && !this.state.joinTxt) {
          return this.setSelectQuery();
        } else if(this.state.whereTxt && !this.state.joinTxt) {
          return this.setSelectQuery() + " " + this.state.whereTxt;
        } else if(!this.state.whereTxt && this.state.joinTxt) {
          return this.setSelectQuery() + " " + this.state.joinTxt;
        }
      }
      createPostMap = () => {
         return [   
            [
              "table_1.job_id",
              this.state.pageTwo[0]['job_id']
            ],
            [
              "table_1.start_time",
              this.state.pageTwo[0]['start_time']
            ],
            [
              "table_1.end_time",
              this.state.pageTwo[0]['end_time']
            ],
            [
              "table_1.status",
              this.state.pageTwo[0]['status']
            ],
            [
              "table_2.comments",
              this.state.pageTwo[0]['comments'] ? this.state.pageTwo[0]['comments']: ""
            ]
          ]
      }

      render(){
        const steps = [
            {name: 'Source Configuration', component: <StepOne myData={this.state} 
                                handleUserNameChanged={this.handleUserNameChanged}
                                handleDbNameChanged={this.handleDbNameChanged}
                                handlePasswordChanged = {this.handlePasswordChanged}
                                handleHostChanged = {this.handleHostChanged}
                                handlePortChanged = {this.handlePortChanged}
                                handleChange = {this.handleChange}/>},
            {name: 'Property Mapping', component: <StepTwo handlePageTwoData={this.handlePageTwoData} table={this.state.table}/>},
            {name: 'Form SQL Query', component: <StepThree data={this.setSelectQuery()} whereTxt={this.state.whereTxt} joinTxt={this.state.joinTxt} handleWhereChange={this.handleWhereChange} handleJoinChange={this.handleJoinChange} />},
            {name: 'Preview and Confirm', component: <StepFour previewFinalQuery={this.formFinalQuery()}/>}
          ];
        return (    
          <div id="content-wrapper" className="d-flex flex-column tenPadding"><div id="content">
              <div className="row">
                  {/* Content Column */}
                  <div className="col-lg-12 mb-12">
                    {/* Graphical Representation */}
                    <div className="card shadow mb-4" style={{minHeight: "600px"}}>
                      <div className="card-header py-3">
                        <h6 className="m-0 font-weight-bold text-primary">Job Configurations</h6>
                      </div>
                      <div className="card-body">
                      <Multistep showNavigation={true} steps={steps} myData={this.state} setTable={this.handleTable} previewFinalQuery={this.formFinalQuery()} joinTxt={this.state.joinTxt} maps={this.createPostMap()} whereTxt={this.state.whereTxt} />
                      </div>
                    </div>
                  </div>
                </div>
                </div>
                </div>
            
        );
      }
}

export default AppSettings;