import React, { Component } from 'react';
import Authentication from "./Authentication";
const axios = require('axios');

export default class AddJob extends Component {

    constructor(props) {
        super(props);
        this.state = {
            title: String,
            description: String,
            category: String,
            area: String,
            message: null
        }

        this.Auth = new Authentication();

        this.onChange = this.onChange.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
    }

    componentWillMount(){
        if(!this.Auth.loggedIn())
            this.props.history.replace('/login');
    }

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
            .then(res => {
                console.log(res.data.message.length);
                if(res.data.message.length > 0) {
                    this.setState({message: res.data.message }, () => console.log(this.state.message));
                }
            });
        var inputFields = document.getElementsByTagName("input");
        for(let i=0;i < inputFields.length; i++){
            if(inputFields[i].type == "text") {
                inputFields[i].value = "";
            }
        }
        console.log(inputFields);
    }

    displayError(){
        console.log(this.state.message);
        if(this.state.message != null) {
            return(
                <div className="alert alert-success">{ this.state.message }</div>
            )
        }
    }

    render() {
        return (
            <div>
                <h3>Post new job offer</h3>
                { this.displayError()}
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