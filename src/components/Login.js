import React, { Component } from 'react';
const axios = require('axios');
const jwtDecode = require('jwt-decode');


export default class Login extends Component {

    constructor(match, props) {
        super(props);
        this.state = {
            username: String,
            password: String,
        }

        this.onChange = this.onChange.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
    }

    onSubmit(e){
        e.preventDefault();
        axios.post('http://localhost:8080/users/login', {
            method: 'post',
            data: {
                username: this.state.username,
                password: this.state.password
            },
            headers: {
                Authorization: 'Bearer ' + this.getToken()
            }
        }).then(res => {
            this.setToken(res.token);
            console.log("Token: " + res.token);
            return Promise.resolve(res);
        })
        // this.props.history.push("/");
    }

    setToken(token) {
        localStorage.setItem('token', token)
    }

    getToken() {
        return localStorage.getItem('token')
    }

    logout() {
        localStorage.removeItem('token');
    }

    loggedIn() {
        // TODO: Check if token is expired using 'jwt-decode'
        // TODO: npm install jwt-decode
        if (jwtDecode(this.getToken()).exp < Date.now() / 1000) {
            this.logout();
        }

        return (this.getToken() !== undefined);
    }

    onChange(e) {
        console.log(e.target.name + " " + e.target.value);
        this.setState({
            [e.target.name]: e.target.value
        });
    }

    render() {
        return (
            <div>
                <h3>Post new job offer</h3>
                <form onSubmit={this.onSubmit}>
                    <div className="form-group">
                        <label><h6 className={"m-0"}>Username: </h6></label>
                        <input type="text"
                               name="username"
                               className="form-control  mb-2"
                               placeholder="Login..."
                               onChange={this.onChange}
                               required
                        />
                        <label><h6 className={"m-0"}>Password: </h6></label>
                        <input type="password"
                               name="password"
                               className="form-control  mb-2"
                               placeholder="Password..."
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