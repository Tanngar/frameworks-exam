import React, { Component } from "react";
import { BrowserRouter as Router, Route, Link, Switch } from "react-router-dom";
import './App.css';
import "bootstrap/dist/css/bootstrap.min.css";
import JobsList from "./components/JobsList";
import AddJob from "./components/AddJob";
import Login from "./components/Login";
import Authentication from './components/Authentication';
import NotFound from './components/NotFound';

class App extends Component {
    constructor(props) {
        super(props);

        this.state = {
            data: [],
            filters: []
        };

        this.Auth = new Authentication();
        this.handleLogout = this.handleLogout.bind(this);
        this.rerenderCallback = this.rerenderCallback.bind(this);
    }

  handleLogout(){
      window.location.reload();
      this.Auth.logout();
  }

  renderLogoutButton(){
      if(this.Auth.loggedIn()){
          return(
              <li className="navbar-item">
                  <div style={{cursor: "pointer"}} onClick={ () => this.handleLogout()} className="nav-link">Log Out</div>
              </li>
          )
      }
  }

  rerenderCallback(){
      this.setState(this.state)
  }

  renderAddJobButton(){
      if(this.Auth.loggedIn()){
          return(
              <li className="navbar-item">
                  <Link to="/add-job" className="nav-link">Add job</Link>
              </li>
          )
      }
  }

    renderLoginButton(){
        if(!this.Auth.loggedIn()){
            return(
                <li className="navbar-item">
                    <Link to="/login" className="nav-link">Login</Link>
                </li>
            )
        }
    }

  render() {
    return (
        <Router>
          <div className="container">
            <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
              <div className="collpase navbar-collapse">
                <ul className="navbar-nav mr-auto">
                    <li className="navbar-item">
                        <Link to="/" className="nav-link">Jobs</Link>
                    </li>
                    {this.renderAddJobButton()}
                    {this.renderLogoutButton()}
                    {this.renderLoginButton()}
                </ul>
              </div>
            </nav>
            <br/>
            <Switch>
                <Route exact path={'/add-job'}
                       render={(props) =>
                           <AddJob {...props}/>}
                />
                <Route exact path={'/login'}
                       render={(props) =>
                           <Login {...props} rerenderParent={this.rerenderCallback}/>}
                />
                <Route exact path={'/'}
                     render={(props) =>
                         <JobsList {...props}/>}
                />
                <Route
                       render={(props) =>
                           <NotFound {...props}/>}
                />
            </Switch>
          </div>
        </Router>
    );
  }
}

export default App;
