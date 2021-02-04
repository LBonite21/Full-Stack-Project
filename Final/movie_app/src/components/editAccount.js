import React, { Component } from 'react';

import Header from './header';

class EditAccount extends Component {
    constructor(props){
        super(props);

        this.state = {
            username: "",
            fname: "",
            lname: "",
            email: "",
            street: "",
            city: "",
            state: "",
            zip_code: "",
            phone: "",
            password: "",
            confirm_password: "",
            reviews: [],
        };
    }

    componentDidMount = () => {
        let account = JSON.parse(sessionStorage.getItem('user'));

        this.setState({ username: account.username });
        this.setState({ fname: account.fname });
        this.setState({ lname: account.lname });
        this.setState({ email: account.email });
        this.setState({ street: account.street });
        this.setState({ city: account.city });
        this.setState({ state: account.state });
        this.setState({ zip_code: account.zip_code });
        this.setState({ phone: account.phone });
        this.setState({ reviews: account.reviews });
    }

    updateUsername = evt => {
        this.setState({ username: evt.target.value });
    }
    updateFname = evt => {
        this.setState({ fname: evt.target.value });
    }
    updateLname = evt => {
        this.setState({ lname: evt.target.value });
    }
    updateEmail = evt => {
        this.setState({ email: evt.target.value });
    }
    updateStreet = evt => {
        this.setState({ street: evt.target.value });
    }
    updateCity = evt => {
        this.setState({ city: evt.target.value });
    }
    updateState = evt => {
        this.setState({ state: evt.target.value });
    }
    updateZipCode = evt => {
        this.setState({ zip_code: evt.target.value });
    }
    updatePhone = evt => {
        this.setState({ phone: evt.target.value });
    }
    updateReviews = evt => {
        this.setState({ reviews: evt.target.value });
    }
    updatePassword = evt => {
        this.setState({ password: evt.target.value });
    }
    updateConfirmPassword = evt => {
        this.setState({ confirm_password: evt.target.value });
    }

    render() {
        return (
            <>
                <Header />
                <div className='container'>
                    <label htmlFor="username">Username </label>
                    <input type="text" name="username" onChange={this.updateUsername} />
                    <br />
                    <label htmlFor="username">Username </label>
                    <input type="text" name="username" onChange={this.updateUsername} />
                    <br />
                    <label htmlFor="username">Username </label>
                    <input type="text" name="username" onChange={this.updateUsername} />
                    <br />
                    <label htmlFor="username">Username </label>
                    <input type="text" name="username" onChange={this.updateUsername} />
                    <br />
                    <label htmlFor="username">Username </label>
                    <input type="text" name="username" onChange={this.updateUsername} />
                    <br />
                    <label htmlFor="username">Username </label>
                    <input type="text" name="username" onChange={this.updateUsername} />
                    <br />
                    <label htmlFor="username">Username </label>
                    <input type="text" name="username" onChange={this.updateUsername} />
                    <br />
                    <label htmlFor="username">Username </label>
                    <input type="text" name="username" onChange={this.updateUsername} />
                    <br />
                    <label htmlFor="username">Username </label>
                    <input type="text" name="username" onChange={this.updateUsername} />
                    <br />
                    <label htmlFor="username">Username </label>
                    <input type="text" name="username" onChange={this.updateUsername} />
                    <br />
                    <label htmlFor="username">Username </label>
                    <input type="text" name="username" onChange={this.updateUsername} />
                    <br />
                    <label htmlFor="username">Username </label>
                    <input type="text" name="username" onChange={this.updateUsername} />
                    <br />
                </div>
            </>
        );
    }
}

export default EditAccount;