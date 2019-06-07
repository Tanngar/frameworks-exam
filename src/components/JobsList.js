import React, { Component } from 'react';
import Job from "./Job";
import FiltersList from "./FiltersList";
const axios = require('axios');

export default class JobList extends Component {
    API_URL = process.env.REACT_APP_API;

    constructor(props) {
        super(props);

        this.state = {
            jobs: [],
            filters: []
        };

        this.getFilteredJobs = this.getFilteredJobs.bind(this);
    }

    componentDidMount() {
        axios.post(this.API_URL + "/get-jobs",{
            filters: this.state.filters
        })
            .then( res => {
                this.setState({
                    jobs: res.data
                });
            })
            .catch(function(error){
                console.log(error)
            })
    };

    getFilteredJobs(filters){
        this.setState({filters: filters}, function(){
            axios.post(this.API_URL + "/get-jobs", { filters: this.state.filters})
                .then(res => {
                    this.setState({jobs: res.data })
                })
        });
    }

    render() {
        return (
            <div>
                <FiltersList getFilters={this.getFilteredJobs} jobs={this.state.jobs}/>
                <h3>Jobs List</h3>
                <div className="table table-striped" style={{marginTop: 20}}>
                    {this.state.jobs.map((jobs) => (
                        <Job key={jobs._id} title={jobs.title} description={jobs.description} category={jobs.category} area={jobs.area}/>
                    ))}
                </div>
            </div>
        );
    }
}