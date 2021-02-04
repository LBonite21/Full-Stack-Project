import React, { Component } from 'react';
import AdminContainer from './mini-components/admin-container';

import Header from './header';

class Admin extends Component {
    constructor(props){
        super(props);

        this.state = {
            accounts: []
        };

        this.updateAccounts = this.updateAccounts.bind(this);
    }

    componentDidMount = () => {
        fetch("http://localhost:3001/", {
            method: "GET",
        })
        .then((res) => res.json())
        .then((result) =>
            this.setState({ accounts: result })
        ).catch((e) => console.log(e));
    }

    updateAccounts = result => {
        if (result) {
            fetch("http://localhost:3001/", {
                method: "GET",
            })
            .then((res) => res.json())
            .then((result) =>
                this.setState({ accounts: result })
            ).catch((e) => console.log(e));
        }
    }

    render() {
        if (JSON.parse(sessionStorage.getItem('user')).isAdmin) {
            return (
                <>
                    <Header />
                    <div className='container'>
                        {
                            this.state.accounts.map((account, i) => {
                                return <AdminContainer key={ i }
                                account={ account }
                                updateAccounts={ this.updateAccounts }/>
                            })
                        }
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