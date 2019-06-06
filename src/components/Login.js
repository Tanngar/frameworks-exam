import React, { Component } from 'react';
import Authentication from './Authentication';

export default class Login extends Component {

    constructor(props) {
        super(props);
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
            if(res.msg) {
                this.setState({error:res.msg});
            }
            if(this.Auth.loggedIn()){
                this.props.rerenderParent();
                this.props.history.replace('/');
            }
        })
            .catch(err =>{
                alert(err);
            })
    }

    componentWillMount(){
        if(this.Auth.loggedIn())
            this.props.history.replace('/');
    }

    onChange(e) {
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