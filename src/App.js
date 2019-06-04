import React, { Component } from "react";
import { BrowserRouter as Router, Route, Link, Switch } from "react-router-dom";
import './App.css';
import "bootstrap/dist/css/bootstrap.min.css";
import JobsList from "./components/JobsList";
import AddJob from "./components/AddJob";
import Login from "./components/Login";

const axios = require('axios');

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      data: []
    };
  }

  componentDidMount() {
    axios.get("http://localhost:8080/")
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
    axios.get("http://localhost:8080/")
        .then( res => {
          this.setState({
            data: res.data
          });
        })
        .catch(function(error){

        })
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
                  <li className="navbar-item">
                    <Link to="/questions/add-question" className="nav-link">Ask a Question</Link>
                  </li>
                </ul>
              </div>
            </nav>
            <br/>
            <Switch>
              <Route exact path={'/'}
                     render={(props) =>
                         <JobsList {...props} jobs={this.state.data}/>}
              />
              <Route exact path={'/add-job'}
                     render={(props) =>
                         <AddJob {...props}/>}
              />
              <Route exact path={'/login'}
                     render={(props) =>
                         <Login {...props}/>}
              />
            </Switch>
          </div>
        </Router>
    );
  }
}

export default App;
