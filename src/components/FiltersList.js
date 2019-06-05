import React, { Component } from 'react';
import Job from "./Job";
import Filter from "./Filter";

export default class FiltersList extends Component {
    // API_URL = process.env.REACT_APP_API;

    constructor(match, props) {
        super();

        this.state = {
            selectedFilters: []
        };

        this.getCategories = this.getCategories.bind(this);
    }

    // componentDidMount() {
    //     this.props.jobs
    // }

    getCategories() {
        let categories = this.props.jobs.map(a => a.category);
        return [...new Set(categories)];
    }

    getAreas() {
        let areas = this.props.jobs.map(a => a.area);
        return [...new Set(areas)];
    }

    getSelectedFilters(selectedFilters){
        this.setState({ selectedFilters: [...this.state.selectedFilters, selectedFilters ]});
        console.log(this.state.selectedCategories);
    }
    render() {
        return (
            <div>
                <h3>Filters:</h3>
                <div className="table table-striped" style={{marginTop: 20}}>
                    <h4>Category:</h4>
                    { this.getCategories().map((category) => (
                        <Filter getFilters={this.getSelectedFilters } key={this.getCategories().indexOf(category)} value={category}/>
                    ))}
                </div>
                <div className="table table-striped" style={{marginTop: 20}}>
                    <h4>Area:</h4>
                    { this.getAreas().map((area) => (
                        <Filter getFilters={this.getSelectedFilters } key={this.getAreas().indexOf(area)} value={area}/>
                    ))}
                </div>
            </div>
        );
    }
}