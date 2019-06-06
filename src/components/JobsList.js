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

        this.getFilters = this.getFilters.bind(this);
    }

    componentDidMount() {
        axios.post("http://localhost:8080/",{
            filters: this.state.filters
        })
            .then( res => {
                this.setState({
                    jobs: res.data
                }, function(){
                    console.log(res);
                });
            })
            .catch(function(error){
                console.log(error)
            })
    };

    getFilters(filters){
        this.setState({filters: filters}, function(){
            axios.post("http://localhost:8080/get-filtered-jobs", { filters: this.state.filters})
                .then(res => {
                    this.setState({jobs: res.data })
                })
        });

        // axios.post("http://localhost:8080/")
        //     .then( res => {
        //         let filters = this.state.filters;
        //         console.log(filters);
        //         let filteredJobs = res.data.filter(function(job) {
        //             console.log(job.area);
        //             console.log(filters.includes(job.area));
        //             if(filters.includes(job.area) || filters.includes(job.category)){
        //                 console.log(job.area);
        //                 console.log(job.category);
        //                 return true;
        //             }
        //         });
        //
        //         console.log(filteredJobs);
        //
        //         this.setState({ jobs: filteredJobs }, function(){ console.log(this.state.jobs )})
        //     })
    }

    render() {
        return (
            <div>
                <FiltersList getFilters={this.getFilters} jobs={this.state.jobs}/>
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