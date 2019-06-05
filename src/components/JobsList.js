import React, { Component } from 'react';
import {Link} from "react-router-dom";
import Job from "./Job";
import FiltersList from "./FiltersList";
const axios = require('axios');

export default class JobList extends Component {
    // API_URL = process.env.REACT_APP_API;

    constructor(match, props) {
        super();

        this.state = {
            jobs: [],
            filters: []
        };
    }

    componentDidMount() {
        axios.post("http://localhost:8080/",{
            filters: this.state.filters
        })
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

    getFilters(filters){
        this.setState({filters: filters})
    }

    render() {
        return (
            <div>
                <FiltersList getFilters={this.getFilters} jobs={this.props.jobs}/>
                <h3>Jobs List</h3>
                <div className="table table-striped" style={{marginTop: 20}}>
                    {this.props.jobs.map((jobs) => (
                        <Job key={jobs._id} title={jobs.title} description={jobs.description} category={jobs.category} area={jobs.area}/>
                    ))}
                </div>
            </div>
        );
    }
}