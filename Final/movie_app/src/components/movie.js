import React, { Component } from 'react';

import Header from './header';

class Movie extends Component {
    constructor(props){
        super(props);

        this.state = {
            genres: [],
            genre_value: "35",
            actor_name: "",
            movie_title: "",
            movie_list: [],
        };

        this.updateGenre = this.updateGenre.bind(this);
        this.updateName = this.updateName.bind(this);
        this.updateGenre = this.updateGenre.bind(this);

        this.handleSearch = this.handleSearch.bind(this);
    }

    updateTitle = evt => {
        this.setState({ movie_title: evt.target.value });
        console.log(this.state.movie_title);
    }
    updateName = evt => {
        this.setState({ actor_name: evt.target.value });
        console.log(this.state.actor_name);
    }
    updateGenre = evt => {
        this.setState({ genre_value: evt.target.value });
        console.log(this.state.genre_value);
    }

    handleSearch = () => {
        // if () {

        // }
    }
 
    render() {
        return (
            <>
                <Header />
                <div className='container'>
                    <form className='form'>
                        <label htmlFor='title'>Movie Title</label>
                        <input type='text' name='title' onChange={ this.updateTitle }/>
                        <label htmlFor='name'>Actor Name</label>
                        <input type='text' name='name' onChange={ this.updateTitle }/>
                        <label htmlFor='genre'>Genre</label>
                        <select onChange={ this.updateGenre } defaultValue={ this.state.genre_value }>
                            <option value='28'>Action</option>
                            <option value='12'>Adventure</option>
                            <option value='16'>Animation</option>
                            <option value='35'>Comedy</option>
                            <option value='80'>Crime</option>
                            <option value='99'>Documentary</option>
                            <option value='18'>Drama</option>
                            <option value='10751'>Family</option>
                            <option value='14'>Fantasy</option>
                            <option value='36'>History</option>
                            <option value='27'>Horror</option>
                            <option value='10402'>Music</option>
                            <option value='9648'>Mystery</option>
                            <option value='10749'>Romance</option>
                            <option value='878'>Science Fiction</option>
                            <option value='10770'>TV Movie</option>
                            <option value='53'>Thriller</option>
                            <option value='10752'>War</option>
                            <option value='37'>Western</option>
                        </select>

                        <input type='submit' value='Search' onClick={ this.handleSearch }/>
                    </form>
                </div>
            </>
        );
    }
}

export default Movie;