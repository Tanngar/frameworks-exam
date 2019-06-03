import React, { Component } from 'react';

export default class Job extends Component {
    // API_URL = process.env.REACT_APP_API;

    constructor(match, props) {
        super();

        this.state = {
            title: String,
            description: String,
            category: String,
            area: String
        }
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
            <div className="bg-light media-body p-3 mb-4">
                {/*<h4 className="media-heading">{this.props.title}</h4>*/}
                <p>Title: {this.props.title}</p>
                <p>Description: {this.props.description}</p>
                <p>Area: {this.props.area}</p>
                <p>Category: {this.props.category}</p>
            </div>
        );
    }
}