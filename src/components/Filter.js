import React, { Component } from 'react';
const axios = require('axios');

export default class Filter extends Component {
    // API_URL = process.env.REACT_APP_API;

    constructor(match, props) {
        super();

        this.state = {
            selectedCategories: []
        };

        this.handleClick = this.handleClick.bind(this);

        window.onbeforeunload = function() {
            localStorage.removeItem('filters');
        };
    }

    // componentDidMount() {
    //     if(localStorage.getItem('filters') != null){
    //         this.setState({ selectedCategories: JSON.parse(localStorage.getItem('filters'))});
    //     }
    // }

    // componentDidUpdate() {
    //     localStorage.setItem('filters', JSON.stringify(this.state.selectedCategories));
    // };

    handleClick(e) {
        if(e.target.classList.contains("selected")){
            // let index = this.state.selectedCategories.indexOf(e.target.value);
            // this.state.selectedCategories.splice(index, 1);

            this.props.removeFilter(e.target.value);

            e.target.classList.remove("selected");
            e.target.classList.add("btn-outline-dark");
            e.target.classList.remove("btn-dark");
        } else {
            let newFilters = this.state.selectedCategories
            newFilters.push(e.target.innerHTML);
            this.setState({selectedCategories: newFilters}, function(){
                console.log(this.state.selectedCategories);
                    this.props.getFilters(this.state.selectedCategories);
            });
            // this.setState({ selectedCategories: [...this.state.selectedCategories, e.target.innerHTML ]}, function(){
            //     this.props.getFilters(this.state.selectedCategories);
            //     console.log(this.state.selectedCategories)
            // });
            e.target.classList.add("selected");
            e.target.classList.remove("btn-outline-dark");
            e.target.classList.add("btn-dark");
        }
    }

    render() {
        return (
            <button onClick={(e) => this.handleClick(e)} className="mr-2 btn btn-outline-dark">{ this.props.value }</button>
        );
    }
}