import React, { Component } from 'react';
import classes from './App.module.css';
import './themeBootstrap.css';
import JobStatus from './components/JobStatus/JobStatus';
import Chart from './components/Chart/Chart';
import DataTable1 from './components/DataTable/DataTable';
import {FaArrowAltCircleLeft, FaChevronLeft, FaChevronRight,FaArrowDown,FaCog,FaTachometerAlt,FaWrench,FaFolder,FaUser} from 'react-icons/fa'


class App extends Component {
  constructor(props){
    super(props);
}
toggleMenu() {
  debugger;
  var css = (this.state.menuCollapsed) ? "toggled" : "";
  // !this.state.menuCollapsed;
  this.setState({"menuCollapsed": css});
}
  render() {
    this.state = {
      menuCollapsed: true
    };
    
    const arr = [classes.Panel, classes.PanelPrimary];
    const arr1 = arr.join(' ');
    const arrGreen = [classes.Panel, classes.PanelGreen];
    const arrGreen1 = arrGreen.join(' ');
    const arrRed = [classes.Panel, classes.PanelRed];
    const arrRed1 = arrRed.join(' ');
    return (
<span id="page-top">
        {/* Page Wrapper */}
        <div id="wrapper">
          {/* Sidebar */}
          <h1>{this.state.menuCollapsed}</h1>
          <ul className={"navbar-nav bg-gradient-primary sidebar sidebar-dark accordion " + this.state.menuCollapsed} id="accordionSidebar">
            {/* Sidebar - Brand */}
            <a className="sidebar-brand d-flex align-items-center justify-content-center" href="index.html">
              <div className="sidebar-brand-icon rotate-n-15">
                <i className="fas fa-laugh-wink" />
              </div>
              <div className="sidebar-brand-text mx-3">Job Status <sup>Dashboard</sup></div>
            </a>
            {/* Divider */}
            <hr className="sidebar-divider my-0" />
            {/* Nav Item - Dashboard */}
            <li className="nav-item active">
              <a className="nav-link" href="index.html">
                {/* <i className="fas fa-fw fa-tachometer-alt" /> */}
                <FaTachometerAlt></FaTachometerAlt>
                <span>    Dashboard</span></a>
            </li>
            {/* Divider */}
            <hr className="sidebar-divider" />
            {/* Heading */}
            <div className="sidebar-heading">
              Interface
            </div>
            {/* Nav Item - Pages Collapse Menu */}
            <li className="nav-item">
              <a className="nav-link" href="#" data-target="#collapseTwo" aria-expanded="true" aria-controls="collapseTwo">
                <FaCog></FaCog>
                <span>    Application Settings</span>
              </a>
            </li>
            {/* Nav Item - Utilities Collapse Menu */}
            <li className="nav-item">
              <a className="nav-link" href="#" data-target="#collapseUtilities" aria-expanded="true" aria-controls="collapseUtilities">
                <FaWrench></FaWrench>
                <span> Website Settings</span>
              </a>
            </li>
            {/* Divider */}
            <hr className="sidebar-divider" />
            {/* Heading */}
            <div className="sidebar-heading">
              Support
            </div>
            {/* Nav Item - Pages Collapse Menu */}
            <li className="nav-item">
              <a className="nav-link" href="#" data-target="#collapsePages" aria-expanded="true" aria-controls="collapsePages">
                {/* <i className="fas fa-fw fa-folder" /> */}
                <FaUser></FaUser>
                <span>    Contact Us</span>
              </a>
            </li>
            {/* Divider */}
            <hr className="sidebar-divider d-none d-md-block" />
            {/* Sidebar Toggler (Sidebar) */}
            <div className="text-center d-none d-md-inline white-color">
            {/* {/* <i class="far fa-arrow-alt-circle-left"></i> */}
            <FaArrowAltCircleLeft onClick={this.toggleMenu.bind(this)}></FaArrowAltCircleLeft>
            {/* <button className="rounded-circle border-0" id="sidebarToggle" /> */}
            </div>
          </ul>
          {/* End of Sidebar */}
          {/* Content Wrapper */}
          <div id="content-wrapper" className="d-flex flex-column">
            {/* Main Content */}
            <div id="content">
              {/* Topbar */}
              <nav className="navbar navbar-expand navbar-light bg-white topbar mb-4 static-top shadow">
                {/* Sidebar Toggle (Topbar) */}
                <button id="sidebarToggleTop" className="btn btn-link d-md-none rounded-circle mr-3">
                  <i className="fa fa-bars" />
                </button>
                {/* Topbar Search */}
                <form className="d-none d-sm-inline-block form-inline mr-auto ml-md-3 my-2 my-md-0 mw-100 navbar-search">
                  <div className="input-group">
                    <input type="text" className="form-control bg-light border-0 small" placeholder="Search for Job Status..." aria-label="Search" aria-describedby="basic-addon2" />
                    <div className="input-group-append">
                      <button className="btn btn-primary" type="button">
                        <i className="fas fa-search fa-sm" />
                      </button>
                    </div>
                  </div>
                </form>
                {/* Topbar Navbar */}
                <ul className="navbar-nav ml-auto">
                  {/* Nav Item - Search Dropdown (Visible Only XS) */}
                  <li className="nav-item dropdown no-arrow d-sm-none">
                    <a className="nav-link dropdown-toggle" href="#" id="searchDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                      <i className="fas fa-search fa-fw" />
                    </a>
                    {/* Dropdown - Messages */}
                    <div className="dropdown-menu dropdown-menu-right p-3 shadow animated--grow-in" aria-labelledby="searchDropdown">
                      <form className="form-inline mr-auto w-100 navbar-search">
                        <div className="input-group">
                          <input type="text" className="form-control bg-light border-0 small" placeholder="Search for..." aria-label="Search" aria-describedby="basic-addon2" />
                          <div className="input-group-append">
                            <button className="btn btn-primary" type="button">
                              <i className="fas fa-search fa-sm" />
                            </button>
                          </div>
                        </div>
                      </form>
                    </div>
                  </li>
                  <div className="topbar-divider d-none d-sm-block" />
                  {/* Nav Item - User Information */}
                  <li className="nav-item dropdown no-arrow">
                    <a className="nav-link dropdown-toggle" href="#" id="userDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                      <span className="mr-2 d-none d-lg-inline text-gray-600 small">Thiraviaraj B</span>
                      <img className="img-profile rounded-circle" src="https://source.unsplash.com/ZHvM3XIOHoE/60x60" />
                    </a>
                  </li>
                </ul>
              </nav>
              {/* End of Topbar */}
              {/* Begin Page Content */}
              <div className="container-fluid">
                {/* Page Heading */}
                <div className="d-sm-flex align-items-center justify-content-between mb-4">
                  <h1 className="h3 mb-0 text-gray-800">Dashboard</h1>
                  <a href="#" className="d-none d-sm-inline-block btn btn-sm btn-primary shadow-sm"><i className="fas fa-download fa-sm text-white-50" /> Generate Report</a>
                </div>
                {/* Content Row */}
                <div className="row">
                  <JobStatus totalJobs="18" jobStatus="Executed" myClass={arr1} myChildClass={classes.PanelHeading} />
                  <JobStatus totalJobs="0" jobStatus="Running" myClass={arr1} myChildClass={classes.PanelHeading} />
                  <JobStatus totalJobs="0" jobStatus="Cancelled" myClass={arrGreen1} myChildClass={classes.PanelHeading} />
                  <JobStatus totalJobs="8" jobStatus="Failed" myClass={arrRed1} myChildClass={classes.PanelHeading} />
                  <JobStatus totalJobs="1" jobStatus="Halted" myClass={arrRed1} myChildClass={classes.PanelHeading} />
                  <JobStatus totalJobs="9" jobStatus="Succeeded" myClass={arrGreen1} myChildClass={classes.PanelHeading} />
                </div>
                <div className="row">
                  {/* Earnings (Monthly) Card Example */}
                  <div className="col-xl-3 col-md-6 mb-4">
                    <div className="card border-left-primary shadow h-100 py-2">
                      <div className="card-body">
                        <div className="row no-gutters align-items-center">
                          <div className="col mr-2">
                            <div className="text-xs font-weight-bold text-primary text-uppercase mb-1">Total Jobs</div>
                            <div className="h5 mb-0 font-weight-bold text-gray-800">5455</div>
                          </div>
                          <div className="col-auto">
                            <i className="fas fa-calendar fa-2x text-gray-300" />
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  {/* Earnings (Monthly) Card Example */}
                  <div className="col-xl-3 col-md-6 mb-4">
                    <div className="card border-left-success shadow h-100 py-2">
                      <div className="card-body">
                        <div className="row no-gutters align-items-center">
                          <div className="col mr-2">
                            <div className="text-xs font-weight-bold text-success text-uppercase mb-1">Overall Avg passes</div>
                            <div className="h5 mb-0 font-weight-bold text-gray-800">25%</div>
                          </div>
                          <div className="col-auto">
                            <i className="fas fa-dollar-sign fa-2x text-gray-300" />
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  {/* Earnings (Monthly) Card Example */}
                  <div className="col-xl-3 col-md-6 mb-4">
                    <div className="card border-left-info shadow h-100 py-2">
                      <div className="card-body">
                        <div className="row no-gutters align-items-center">
                          <div className="col mr-2">
                            <div className="text-xs font-weight-bold text-info text-uppercase mb-1">Tasks</div>
                            <div className="row no-gutters align-items-center">
                              <div className="col-auto">
                                <div className="h5 mb-0 mr-3 font-weight-bold text-gray-800">50%</div>
                              </div>
                              <div className="col">
                                <div className="progress progress-sm mr-2">
                                  <div className="progress-bar bg-info" role="progressbar" style={{width: '50%'}} aria-valuenow={50} aria-valuemin={0} aria-valuemax={100} />
                                </div>
                              </div>
                            </div>
                          </div>
                          <div className="col-auto">
                            <i className="fas fa-clipboard-list fa-2x text-gray-300" />
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  {/* Pending Requests Card Example */}
                  <div className="col-xl-3 col-md-6 mb-4">
                    <div className="card border-left-warning shadow h-100 py-2">
                      <div className="card-body">
                        <div className="row no-gutters align-items-center">
                          <div className="col mr-2">
                            <div className="text-xs font-weight-bold text-warning text-uppercase mb-1">Pending Requests</div>
                            <div className="h5 mb-0 font-weight-bold text-gray-800">18</div>
                          </div>
                          <div className="col-auto">
                            <i className="fas fa-comments fa-2x text-gray-300" />
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="row">
                  {/* Content Column */}
                  <div className="col-lg-12 mb-4">
                    {/* Graphical Representation */}
                    <div className="card shadow mb-4">
                      <div className="card-header py-3">
                        <h6 className="m-0 font-weight-bold text-primary">Analytics</h6>
                      </div>
                      <div className="card-body">
                        <Chart />
                      </div>
                    </div>
                    <div className="card shadow mb-4">
                      <div className="card-header py-3">
                        <h6 className="m-0 font-weight-bold text-primary">All Packages</h6>
                      </div>
                      <div className="card-body">
                        {/* 3v Data Table */}
                        <DataTable1 />
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
        <div className={classes.App}>
      </div>
      </span>
      
    );
  }
}

export default App;
