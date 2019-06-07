import React, { Component } from 'react';

export default class Filter extends Component {
    constructor(props) {
        super(props);

        this.handleClick = this.handleClick.bind(this);
    }

    handleClick(e) {
        if(e.target.classList.contains("selected")){
            this.props.removeFilter(e.target.innerHTML);

            e.target.classList.remove("selected");
            e.target.classList.add("btn-outline-dark");
            e.target.classList.remove("btn-dark");
        } else {
            this.props.getFilter(e.target.innerHTML);

            e.target.classList.add("selected");
            e.target.classList.remove("btn-outline-dark");
            e.target.classList.add("btn-dark");
        }
    }

    render() {
        return (
            <button onClick={(e) => this.handleClick(e)} className="mr-2 mb-2 btn btn-outline-dark">{ this.props.value }</button>
        );
    }
}