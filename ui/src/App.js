import React, { Component } from 'react';
import classes from './App.module.css';
import './themeBootstrap.css';
import JobStatus from './components/JobStatus/JobStatus';
import Chart from './components/Chart/Chart';
import DataTable1 from './components/DataTable/DataTable';
import {RangeDatePicker} from '@y0c/react-datepicker';
import "@y0c/react-datepicker/assets/styles/calendar.scss";
import 'react-s-alert/dist/s-alert-default.css';
import 'react-s-alert/dist/s-alert-css-effects/slide.css';
import axios from './axios-jobs';
var Loader = require('react-loader');
class App extends Component {

constructor () {
  super();
  this.state = {
    menuCollapsed: true,
    startDate: '',
    endDate: '',
    jobStatusObj: {},
    jobsTable: [],
    jobsChart: []
  };
}
componentDidMount(){
  document.title = "Jobs Dashboard"
}
toggleMenu() {
  var css = (this.state.menuCollapsed) ? "toggled" : "";
  // !this.state.menuCollapsed;
  this.setState({"menuCollapsed": css});
}
jobStatusObj1 = null;
componentDidMount(){
  axios.get('/api/dashboard/job_history/date_range')
    .then((response) => {
      if(response.data.first){
        let date = new Date(response.data.first);
        let mnth = ("0" + (date.getMonth() + 1)).slice(-2);
        let day = ("0" + date.getDate()).slice(-2);
        let startDate = [date.getFullYear(), mnth, day].join("-");
        console.log(startDate);
        this.setState({"startDate": startDate});
        console.log(this.state.startDate);
      }
      if(response.data.last){
        let date = new Date(response.data.last);
        let mnth = ("0" + (date.getMonth() + 1)).slice(-2);
        let day = ("0" + date.getDate()).slice(-2);
        let endDate = [date.getFullYear(), mnth, day].join("-");
        console.log(endDate);
        this.setState({"endDate": endDate});
        console.log(this.state.endDate);
      }
    })
    .catch((error) => {
      console.log(error);
    });

    axios.get('/api/dashboard/job_scores?start=2017-01-01&end=2019-03-10')
    .then((response) => {
      if(response.data){
        this.setState({jobStatusObj: response.data})
      }
    })
    .catch((error) => {
      console.log(error);
    });

    axios.get('/api/dashboard/job_history/?start=2017-01-01&end=2019-03-10')
    .then((response) => {
      if(response.data){
        this.setState({jobsTable: response.data})
      }
    })
    .catch((error) => {
      console.log(error);
    });

    axios.get('/api/dashboard/job_chart?start=2017-01-01&end=2019-03-10')
    .then((response) => {
      if(response.data){
        this.setState({jobsChart: response.data})
      }
    })
    .catch((error) => {
      console.log(error);
    });
}
  render() {
    const arr = [classes.Panel, classes.PanelPrimary];
    const arr1 = arr.join(' ');
    const arrGreen = [classes.Panel, classes.PanelGreen];
    const arrGreen1 = arrGreen.join(' ');
    const arrRed = [classes.Panel, classes.PanelRed];
    const arrRed1 = arrRed.join(' ');
    const syncHandler = () => {
      axios.get('/api/sources/sync/')
        .then(() => {
            window.location.reload();
        })
        .catch((error) => {
          console.log(error);
        });
    }
    const onChangeHandler = (start, end) => {
      if(start){
        let date = new Date(start);
        let mnth = ("0" + (date.getMonth() + 1)).slice(-2);
        let day = ("0" + date.getDate()).slice(-2);
        var startDate = [date.getFullYear(), mnth, day].join("-");
        console.log(startDate);
        //console.log(this.state.startDate);
      }
      if(end){
        let date = new Date(end);
        let mnth = ("0" + (date.getMonth() + 1)).slice(-2);
        let day = ("0" + date.getDate()).slice(-2);
        var endDate = [date.getFullYear(), mnth, day].join("-");
        console.log(endDate);
        //console.log("111111",this.state.endDate);
      }
      if (start && end) {
        this.setState({"startDate": startDate, "endDate": endDate});
        /*setTimeout(()=>{console.log("1111122", this.state.startDate);
        console.log("2222333", this.state.endDate);},500)*/
        
        axios.get('/api/dashboard/job_scores?start='+startDate+'&end='+endDate)
        .then((response) => {
          if(response.data){
            this.setState({jobStatusObj: response.data})
          }
        })
        .catch((error) => {
          console.log(error);
        });
    
        axios.get('/api/dashboard/job_history/?start='+startDate+'&end='+endDate)
        .then((response) => {
          if(response.data){
            this.setState({jobsTable: response.data})
          }
        })
        .catch((error) => {
          console.log(error);
        });
        
        axios.get('/api/dashboard/job_chart?start='+startDate+'&end='+endDate)
        .then((response) => {
          if(response.data){
            this.setState({jobsChart: response.data})
          }
        })
        .catch((error) => {
          console.log(error);
        });
      }
    }
    
    if(this.state.jobStatusObj !== null){
      var jobStatusObj1 = Object.keys(this.state.jobStatusObj).map((key, index) => {
        return <JobStatus key={key} totalJobs={ this.state.jobStatusObj[key]} jobStatus={key} myClass={(key ==='success' || key === 'sucessful' || key === 'complete' || key === 'done' || key === 'completed') ? arrGreen1 : (key === 'error' || key === 'failed' || key === 'failure') ? arrRed1 : arr1} myChildClass={classes.PanelHeading} />;
      });
    }
    
    return (
<div className={classes.App}>
        {/* Page Wrapper */}
        <div>
          {/* Sidebar */}
         {/* <Loader loaded={this.state.loaded}>
            <h1>thiravi</h1>
    </Loader>*/}
          {/* End of Sidebar */}
          {/* Content Wrapper */}
          <div id="content-wrapper" className="d-flex flex-column">
            {/* Main Content */}
            <div id="content" style={{marginTop: '15px'}}>
              {/* Begin Page Content */}
              <div className="container-fluid">
                {/* Page Heading */}
                <div className="d-sm-flex align-items-center justify-content-between mb-4">
                  <h1 className="h3 mb-0 text-gray-800">Dashboard</h1>
                  <RangeDatePicker 
                    startDay={this.state.startDate} 
                    endDay={this.state.endDate} 
                    startPlaceholder="Start Date" 
                    endPlaceholder="End Date" 
                    dateFormat="YYYY-MM-DD" 
                    onChange={(start, end) => onChangeHandler(start,end)} />
                  <button onClick={syncHandler} style={{color: 'white'}} className="d-none d-sm-inline-block btn btn-sm btn-primary shadow-sm"><i className="fas fa-download fa-sm text-white-50" /> Sync</button>
                </div>
                {/* Content Row */}
                <div className="row">
                {jobStatusObj1}
                  {/*<JobStatus totalJobs="18" jobStatus="Executed" myClass={arr1} myChildClass={classes.PanelHeading} />
                  <JobStatus totalJobs="0" jobStatus="Running" myClass={arr1} myChildClass={classes.PanelHeading} />
                  <JobStatus totalJobs="0" jobStatus="Cancelled" myClass={arrGreen1} myChildClass={classes.PanelHeading} />
                  <JobStatus totalJobs="8" jobStatus="Failed" myClass={arrRed1} myChildClass={classes.PanelHeading} />
                  <JobStatus totalJobs="1" jobStatus="Halted" myClass={arrRed1} myChildClass={classes.PanelHeading} />
                  <JobStatus totalJobs="9" jobStatus="Succeeded" myClass={arrGreen1} myChildClass={classes.PanelHeading} />
            */} </div>
                <div className="row">
                  {/* Content Column */}
                  <div className="col-lg-12 mb-4">
                    {/* Graphical Representation */}
                    <div className="card shadow mb-4">
                      <div className="card-header py-3">
                        <h6 className="m-0 font-weight-bold text-primary">Analytics</h6>
                      </div>
                      <div className="card-body">
                        <Chart jobsChartData={this.state.jobsChart} />
                      </div>
                    </div>
                    <div className="card shadow mb-4">
                      <div className="card-header py-3">
                        <h6 className="m-0 font-weight-bold text-primary">All Packages</h6>
                      </div>
                      <div className="card-body">
                        {/* 3v Data Table */}
                        <DataTable1 jobsTableRows={this.state.jobsTable}/>
                      </div>
                    </div>
                  </div>
                </div>
              
              </div>
              {/* /.container-fluid */}
            </div>
            {/* End of Main Content */}
            {/* Footer */}
            <footer className="sticky-footer bg-white">
              <div className="container my-auto">
                <div className="copyright text-center my-auto">
                  <span>Copyright © Accionlabs 2019</span>
                </div>
              </div>
            </footer>
            {/* End of Footer */}
          </div>
          {/* End of Content Wrapper */}
        </div>
        {/* End of Page Wrapper */}
        {/* Scroll to Top Button*/}
        <a className="scroll-to-top rounded" href="#page-top">
          <i className="fas fa-angle-up" />
        </a>
        {/* Logout Modal*/}
        <div className="modal fade" id="logoutModal" tabIndex={-1} role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
          <div className="modal-dialog" role="document">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title" id="exampleModalLabel">Ready to Leave?</h5>
                <button className="close" type="button" data-dismiss="modal" aria-label="Close">
                  <span aria-hidden="true">×</span>
                </button>
              </div>
              <div className="modal-body">Select "Logout" below if you are ready to end your current session.</div>
              <div className="modal-footer">
                <button className="btn btn-secondary" type="button" data-dismiss="modal">Cancel</button>
                <a className="btn btn-primary" href="login.html">Logout</a>
              </div>
            </div>
          </div>
        </div>
        {/* Bootstrap core JavaScript*/}
        {/* Core plugin JavaScript*/}
        {/* Custom scripts for all pages*/}
        {/* Page level plugins */}
        {/* Page level custom scripts */}
        
      </div>
      
    );
  }
}

export default App;
