import React, { Component } from 'react';

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
        .then(result => this.setState({ accounts: result }))
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
                    console.log('It worked!')
                });
            } else {
                console.log('Incorrect Credentials.');
            }
        });
    }

    render() {
        console.log(this.state.accounts)
        console.log(this.state.username)
        console.log(this.state.password)

        return (
            <div className='container'>
                <label htmlFor='username'>Username </label>
                <input type='text' name='username'
                onChange={this.updateUsername}/>
                <label htmlFor='password'>Password </label>
                <input type='text' name='username' 
                onChange={this.updatePassword}/>
                <input type='submit' value='Submit' onClick={this.handleSignIn}/>
            </div>
        );
    }
}

export default Login;