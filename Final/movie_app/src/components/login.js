import React, { Component } from 'react';

import Header from './header';

class Login extends Component {
    constructor(props){
        super(props);

        this.state = {
            accounts: [],
            username: '',
            password: '',
            redirect: false
        };

        this.updateUsername = this.updateUsername.bind(this);
        this.updatePassword = this.updatePassword.bind(this);

        this.handleSignIn = this.handleSignIn.bind(this);
    }

    componentDidMount = () => {
        fetch('http://localhost:3001/', {
            method: "GET"
        }).then(res => res.json())
        .then(result => this.setState({ accounts: result }, () => {
            // Adds all the reviews to a session variable
            let list = [];
            this.state.accounts.forEach(account => {
                list.push(account.reviews);
            });
            sessionStorage.setItem('reviews', JSON.stringify(list));
        }))
        .catch(e => console.log(e));
    }

    updateUsername = evt => {
        this.setState({ username: evt.target.value });
    }
    updatePassword = evt => {
        this.setState({ password: evt.target.value });
    }

    handleSignIn = () => {
        let data = {
            "username": `${this.state.username}`,
            "password": `${this.state.password}`
        }

        fetch('http://localhost:3001/', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        }).then(res => res.json())
        .then(result => {
            if (result.status) {
                this.setState({ redirect: true }, () => {
                    sessionStorage.setItem('user', JSON.stringify(result.account));
                    this.setState({ redirect: true });
                });
            } else {
                console.log('Incorrect Credentials.');
            }
        });
    }

    render() {
        let afterLoggedIn;
        let beforeLoggedIn = <div>
            <label htmlFor='username'>Username </label>
            <input type='text' name='username'
            onChange={this.updateUsername}/>
            <label htmlFor='password'>Password </label>
            <input type='password' name='password' 
            onChange={this.updatePassword}/>
            <input type='submit' value='Submit' onClick={this.handleSignIn}/>
        </div>

        if (this.state.redirect || sessionStorage.getItem('user')) {
            beforeLoggedIn = <p></p>;
            afterLoggedIn = <a href='/movies' >Visit Movie Page!</a>
        }

        return (
            <>
                <Header />
                <div className='container'>
                    { beforeLoggedIn }
                    { afterLoggedIn }
                </div>
                <p>agustind</p>
                <p>UoNt-Kvx2</p>
            </>
        );
    }
}

export default Login;