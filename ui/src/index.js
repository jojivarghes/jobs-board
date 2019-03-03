import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import 'bootstrap/dist/css/bootstrap.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import { Route, Link, BrowserRouter as Router, Switch } from 'react-router-dom';
import {FaArrowAltCircleLeft, FaChevronLeft, FaChevronRight,FaArrowDown,FaCog,FaTachometerAlt,FaWrench,FaFolder,FaUser} from 'react-icons/fa';
import AppSettings from './components/AppSettings/AppSettings';

const routing = (
    <Router>
      <div id="wrapper">
          <ul className="navbar-nav bg-gradient-primary sidebar sidebar-dark accordion " id="accordionSidebar">
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
              <Link to="/" className="nav-link"><FaTachometerAlt></FaTachometerAlt>Dashboard</Link>
            </li>
            {/* Divider */}
            <hr className="sidebar-divider" />
            {/* Heading */}
            <div className="sidebar-heading">
              Interface
            </div>
            {/* Nav Item - Pages Collapse Menu */}
            <li className="nav-item">
              <Link to="/appsetts" className="nav-link"><FaCog></FaCog>Application Settings</Link>
            </li>
            {/* Nav Item - Utilities Collapse Menu */}
            <li className="nav-item">
              <Link to="/websetts" className="nav-link"><FaWrench></FaWrench>Website Settings</Link>
            </li>
            {/* Divider */}
            <hr className="sidebar-divider" />
            {/* Heading */}
            <div className="sidebar-heading">
              Support
            </div>
            {/* Nav Item - Pages Collapse Menu */}
            <li className="nav-item">
              <Link to="/contactus" className="nav-link"><FaUser></FaUser>Contact Us</Link>
            </li>
            {/* Divider */}
            <hr className="sidebar-divider d-none d-md-block" />
            {/* Sidebar Toggler (Sidebar) */}
            <div className="text-center d-none d-md-inline white-color">
            {/* {/* <i class="far fa-arrow-alt-circle-left"></i> */}
            <FaArrowAltCircleLeft></FaArrowAltCircleLeft>
            {/* <button className="rounded-circle border-0" id="sidebarToggle" /> */}
            </div>
          </ul>
          <Switch>
            <Route exact path="/" component={App} />
            <Route path="/appsetts" component={AppSettings} />
          </Switch>
      </div>
    </Router>
  )

ReactDOM.render(routing, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();
