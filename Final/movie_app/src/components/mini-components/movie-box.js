import React, { Component } from 'react';

class MovieBox extends Component {
    constructor(props){
        super(props);

        this.state = {};
    }

    componentDidMount = () => {

    }

    render() {
        return (
            <>
                <div className='container'>
                    <a href='/' onClick={() => { sessionStorage.removeItem('user') }}>Log Out</a>
                </div>
            </>
        );
    }
}

export default MovieBox;