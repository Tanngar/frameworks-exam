import React, { Component } from 'react';
import {Link} from "react-router-dom";
import Job from "./Job";

export default class JobList extends Component {
    // API_URL = process.env.REACT_APP_API;

    constructor(match, props) {
        super();
    }

    // componentDidMount() {
    //     fetch(`${this.API_URL}/questions/`+ this.props.match.params.id)
    //         .then(res => res.json())
    //         .then((data) => {
    //             this.setState({
    //                 title: data[0].title,
    //                 description: data[0].description,
    //             })
    //         })
    // }


    render() {
        return (
            <div>
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