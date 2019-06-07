import React, { Component } from 'react';
import Filter from "./Filter";
const axios = require('axios');

export default class FiltersList extends Component {
    API_URL = process.env.REACT_APP_API;

    constructor(props) {
        super(props);

        this.state = {
            filters: [],
            jobs: []
        };

        this.getCategories = this.getCategories.bind(this);
        this.getFilter = this.getFilter.bind(this);
        this.removeFilter = this.removeFilter.bind(this);

    }

    componentDidMount() {
        axios.post(this.API_URL + "/get-filters")
            .then( res => {
                this.setState({
                    jobs: res.data
                });
            })
            .catch(function(error){
                console.log(error)
            })
    }

    getCategories() {
        let categories = this.state.jobs.map(a => a.category);
        return [...new Set(categories)];
    }

    getAreas() {
        let areas = this.state.jobs.map(a => a.area);
        return [...new Set(areas)];
    }

    getFilter(filter){
        let newFilters = this.state.filters;
        newFilters.push(filter);
        this.setState({filters: newFilters});
        this.props.getFilters(this.state.filters);
    }

    removeFilter(filter){
        let newFilters = this.state.filters;
        let index = newFilters.indexOf(filter);
        newFilters.splice(index, 1);
        this.setState({filters: newFilters});
        this.props.getFilters(this.state.filters);
    }

    render() {
        return (
            <div>
                <h3>Filters:</h3>
                <div className="table table-striped" style={{marginTop: 20}}>
                    <h4>Category:</h4>
                    { this.getCategories().map((category) => (
                        <Filter removeFilter={this.removeFilter} getFilter={this.getFilter } key={this.getCategories().indexOf(category)} value={category}/>
                    ))}
                </div>
                <div className="table table-striped" style={{marginTop: 20}}>
                    <h4>Area:</h4>
                    { this.getAreas().map((area) => (
                        <Filter removeFilter={this.removeFilter} getFilter={this.getFilter } key={this.getAreas().indexOf(area)} value={area}/>
                    ))}
                </div>
            </div>
        );
    }
}