import React, { Component } from 'react';

import Header from './header';

class EditAccount extends Component {
    constructor(props){
        super(props);

        this.state = {};
    }

    componentDidMount = () => {

    }

    render() {
        return (
            <>
                <Header />
                <div className='container'>
                    <a href='/' onClick={() => { sessionStorage.removeItem('user') }}>Log Out</a>
                </div>
            </>
        );
    }
}

export default EditAccount;