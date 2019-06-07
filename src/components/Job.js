import React, { Component } from 'react';

export default class Job extends Component {
    constructor(props) {
        super(props);

        this.state = {
            title: String,
            description: String,
            category: String,
            area: String
        }
    }

    render() {
        return (
            <div className="bg-light media-body p-3 mb-4">
                <p><b>Title:</b> {this.props.title}</p>
                <p><b>Description:</b> {this.props.description}</p>
                <p><b>Area:</b> {this.props.area}</p>
                <p><b>Category:</b> {this.props.category}</p>
            </div>
        );
    }
}