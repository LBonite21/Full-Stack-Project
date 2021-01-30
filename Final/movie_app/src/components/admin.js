import React, { Component } from 'react';

import Header from './header';

class Admin extends Component {
    constructor(props){
        super(props);

        this.state = {};
    }

    componentDidMount = () => {

    }

    render() {
        if (JSON.parse(sessionStorage.getItem('user')).isAdmin) {
            return (
                <>
                    <Header />
                    <div className='container'>
                        <a href='/' onClick={() => { sessionStorage.removeItem('user') }}>Log Out</a>
                    </div>
                </>
            );
        } else {
            return (
                <>
                    <h1>Wait a minute..... you're not an <strong>admin?</strong></h1>
                    <a href='/account'>Get back to your NON-ADMIN account!</a>
                </>
            );
        }

    }
}

export default Admin;