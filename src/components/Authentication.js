import jwtDecode from 'jwt-decode';

class Authentication {
    API_URL = process.env.REACT_APP_API;

    constructor() {

        this.fetch = this.fetch.bind(this);
        this.login = this.login.bind(this);
        this.getProfile = this.getProfile.bind(this)
    }

    login(username, password) {
        return this.fetch(this.API_URL + '/users/login', {
            method: 'POST',
            body: JSON.stringify({
                username,
                password
            })
        }).then(res => {
            if(res.token) {
                this.setToken(res.token)
            }
            return Promise.resolve(res);
        })
    }

    loggedIn() {
        const token = this.getToken();
        return !!token && !this.isTokenExpired(token);
    }

    isTokenExpired(token) {
        try {
            const decoded = jwtDecode(token);
            if (decoded.exp < Date.now() / 1000) {
                return true;
            }
            else
                return false;
        }
        catch (err) {
            return false;
        }
    }

    setToken(idToken) {
        localStorage.setItem('token', idToken)
    }

    getToken() {
        return localStorage.getItem('token')
    }

    logout() {
        localStorage.removeItem('token');
    }

    getProfile() {
        return jwtDecode(this.getToken());
    }

    fetch(url, options) {
        const headers = {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        }

        if (this.loggedIn()) {
            headers['Authorization'] = 'Bearer ' + this.getToken()
        }

        return fetch(url, {
            headers,
            ...options
        })
            .then(this._checkStatus)
            .then(response => response.json())
    }
}
export default Authentication;
