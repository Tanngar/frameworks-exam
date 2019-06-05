import React, { Component } from "react";
import { BrowserRouter as Router, Route, Link, Switch } from "react-router-dom";
import './App.css';
import "bootstrap/dist/css/bootstrap.min.css";
import JobsList from "./components/JobsList";
import AddJob from "./components/AddJob";
import Login from "./components/Login";
import Authentication from './components/Authentication';

const axios = require('axios');

class App extends Component {
    constructor(props) {
        super(props);

        this.state = {
            data: [],
            filters: []
        };

        this.Auth = new Authentication();
        this.handleLogout = this.handleLogout.bind(this);
  }

  componentDidMount() {
    axios.post("http://localhost:8080/")
        .then( res => {
          this.setState({
            data: res.data
          });
          console.log(res.data);
        })
        .catch(function(error){
          console.log(error)
        })
  };

  componentDidUpdate(prevProps, prevState, snapshot) {
    axios.post("http://localhost:8080/")
        .then( res => {
          this.setState({
            data: res.data
          });
        })
        .catch(function(error){
            console.log(error)
        })
  }


  handleLogout(){
      window.location.reload();
      this.Auth.logout();
  }

  renderLogoutButton(){
      if(this.Auth.loggedIn()){
          return(
              <li className="navbar-item">
                  <div onClick={ () => this.handleLogout()} className="nav-link">Log Out</div>
              </li>
          )
      }
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
                           <Login {...props}/>}
                />
                <Route exact path={'/'}
                     render={(props) =>
                         <JobsList {...props} jobs={this.state.data}/>}
                />
            </Switch>
          </div>
        </Router>
    );
  }
}

export default App;
