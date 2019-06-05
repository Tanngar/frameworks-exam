import React, { Component } from 'react';
import Authentication from './Authentication';
const axios = require('axios');
const jwtDecode = require('jwt-decode');


export default class Login extends Component {

    constructor(match, props) {
        super();
        this.state = {
            username: String,
            password: String,
            error: null
        }
        this.Auth = new Authentication();

        this.onChange = this.onChange.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
    }

    onSubmit(e){
        e.preventDefault();
        this.Auth.login(this.state.username, this.state.password).then(res =>{
            console.log(res.msg);
            if(res.msg) {
                this.state.error = res.msg;
            }
            if(this.Auth.loggedIn()){
                this.props.history.replace('/');
            }
        })
            .catch(err =>{
                alert(err);
            })
        // axios.post('http://localhost:8080/users/login', {
        //     username: this.state.username,
        //     password: this.state.password
        // }).then(res => {
        //     console.log(res.token);
        //     this.setToken(res.token);
        //     return Promise.resolve(res);
        // })

        // this.props.history.push("/");
    }

    componentWillMount(){
        if(this.Auth.loggedIn())
            this.props.history.replace('/');
    }

    onChange(e) {
        console.log(e.target.name + " " + e.target.value);
        this.setState({
            [e.target.name]: e.target.value
        });
    }

    displayError(){
        if(this.state.error != null) {
            return(
                <div className="alert alert-danger">{ this.state.error }</div>
            )
        }
    }

    render() {
        return (
            <div>
                <h3>Login</h3>
                { this.displayError()}
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