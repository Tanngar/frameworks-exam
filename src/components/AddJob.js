import React, { Component } from 'react';
import Authentication from "./Authentication";
const axios = require('axios');

export default class AddJob extends Component {

    constructor(match, props) {
        super(props);
        this.state = {
            title: String,
            description: String,
            category: String,
            area: String
        }

        this.Auth = new Authentication();

        this.onChange = this.onChange.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
    }

    componentWillMount(){
        if(!this.Auth.loggedIn())
            this.props.history.replace('/login');
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

    onChange(e) {
        console.log(e.target.name + " " + e.target.value);
        this.setState({
            [e.target.name]: e.target.value
        });
    }

    onSubmit(e){
        e.preventDefault();
        axios.post('http://localhost:8080/add-job', {
            title: this.state.title,
            description: this.state.description,
            category: this.state.category,
            area: this.state.area
        })
        this.props.history.push("/");
    }

    render() {
        return (
            <div>
                <h3>Post new job offer</h3>
                <form onSubmit={this.onSubmit}>
                    <div className="form-group">
                        <label><h6 className={"m-0"}>Title: </h6></label>
                        <input type="text"
                               name="title"
                               className="form-control  mb-2"
                               placeholder="Title of the position..."
                               onChange={this.onChange}
                               required
                        />
                        <label><h6 className={"m-0"}>Description: </h6></label>
                        <input type="text"
                               name="description"
                               className="form-control  mb-2"
                               placeholder="Description of the job..."
                               onChange={this.onChange}
                               required
                        />
                        <label><h6 className={"m-0"}>Category: </h6></label>
                        <input type="text"
                               name="category"
                               className="form-control  mb-2"
                               placeholder="Category..."
                               onChange={this.onChange}
                               required
                        />
                        <label><h6 className={"m-0"}>Area: </h6></label>
                        <input type="text"
                               name="area"
                               className="form-control  mb-2"
                               placeholder="Location..."
                               onChange={this.onChange}
                               required
                        />
                        <input type='submit' className="btn btn-dark" value='Confirm'/>
                    </div>
                </form>
            </div>
        );
    }
}