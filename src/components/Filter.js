import React, { Component } from 'react';
const axios = require('axios');

export default class Filter extends Component {
    // API_URL = process.env.REACT_APP_API;

    constructor(match, props) {
        super();

        this.state = {
            selectedCategories: []
        }

        this.handleClick = this.handleClick.bind(this);
    }



    handleClick(e) {
        console.log(e.target);
        let filters = [];
        if(e.target.classList.contains("selected")){
            let index = this.state.selectedCategories.indexOf(e.target.value);
            this.state.selectedCategories.splice(index, 1);

            e.target.classList.remove("selected");
            e.target.classList.add("btn-outline-dark");
            e.target.classList.remove("btn-dark");
        } else {
            this.setState({ selectedCategories: [...this.state.selectedCategories, e.target.innerHTML ]}, function(){
                console.log(this.state.selectedCategories);
                this.props.getFilters(this.state.selectedCategories);
                // axios.post("http://localhost:8080/", {
                //     selectedCategories: this.state.selectedCategories
                // }).then(function (response) {
                //     console.log(response);
                // })
                //     .catch(function (error) {
                //         console.log(error);
                //     });
            });
            e.target.classList.add("selected");
            e.target.classList.remove("btn-outline-dark");
            e.target.classList.add("btn-dark");
        }

        // axios.post("http://localhost:8080/", {
        //     selectedCategories: this.state.selectedCategories
        // }).then(function (response) {
        //     console.log(response);
        // })
        //     .catch(function (error) {
        //         console.log(error);
        // });
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
            <button onClick={(e) => this.handleClick(e)} className="mr-2 btn btn-outline-dark"> { this.props.value } </button>
        );
    }
}