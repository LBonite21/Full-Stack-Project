import React, { Component } from 'react';

class MovieBox extends Component {
    constructor(props){
        super(props);

        this.state = {};
    }

    render() {
        console.log(this.props.title);
        return (
            <>
                <div className='movie-box'>
                    <h1>{ this.props.title }</h1>
                    <img src={`https://image.tmdb.org/t/p/w500${ this.props.poster_path }`}/>
                    <p className='movie-info'>Released { this.props.release_date }</p>
                    <p className='movie-info'>{ this.props.overview }</p>
                </div>
            </>
        );
    }
}

export default MovieBox;