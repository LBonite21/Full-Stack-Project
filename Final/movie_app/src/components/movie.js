import React, { Component } from 'react';

import Header from './header';
import MovieBox from './mini-components/movie-box-modal';

class Movie extends Component {
    constructor(props){
        super(props);

        this.state = {
            genres: [],
            query: "",
            movie_list: [],
        };

        this.updateQuery = this.updateQuery.bind(this);

        this.handleGenreSearch = this.handleGenreSearch.bind(this);
        this.handleQuerySearch = this.handleQuerySearch.bind(this);
    }

    updateQuery = evt => {
        this.setState({ query: evt.target.value });
        // console.log(this.state.query);
    }

    handleQuerySearch = evt => {
        // Use the genre id to search by genre
        let data = {
            "query": `${this.state.query}`,
        }

        fetch('http://localhost:3001/searchQuery', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        }).then(res => res.json())
        .then(result => this.setState({ movie_list: result }, () => {
            console.log(this.state.movie_list);
        }))
        .catch(e => console.log(e));
    }
    handleGenreSearch = evt => {
        // Use the genre id to search by genre
        let data = {
            "genreId": `${evt.target.id}`,
        }

        fetch('http://localhost:3001/searchGenre', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        }).then(res => res.json())
        .then(result => this.setState({ movie_list: result }, () => {
            console.log(this.state.movie_list);
        }))
        .catch(e => console.log(e));
    }
 
    render() {
        return (
            <>
                <Header />
                <div className='container'>
                    <label htmlFor='query'>Search by Actor or Movie Title </label>
                    <input type='text' name='query' onChange={ this.updateQuery }/>
                    
                    <button onClick={ this.handleQuerySearch }>Search</button>
                    
                    <label htmlFor='genre'>Genre</label>
                    <div name='genre' className='button-grid'>
                        <button id='28' onClick={ this.handleGenreSearch }>Action</button>
                        <button id='12' onClick={ this.handleGenreSearch }>Adventure</button>
                        <button id='16' onClick={ this.handleGenreSearch }>Animation</button>
                        <button id='35' onClick={ this.handleGenreSearch }>Comedy</button>
                        <button id='80' onClick={ this.handleGenreSearch }>Crime</button>
                        <button id='99' onClick={ this.handleGenreSearch }>Documentary</button>
                        <button id='18' onClick={ this.handleGenreSearch }>Drama</button>
                        <button id='10751' onClick={ this.handleGenreSearch }>Family</button>
                        <button id='14' onClick={ this.handleGenreSearch }>Fantasy</button>
                        <button id='36' onClick={ this.handleGenreSearch }>History</button>
                        <button id='27' onClick={ this.handleGenreSearch }>Horror</button>
                        <button id='10402' onClick={ this.handleGenreSearch }>Music</button>
                        <button id='9648' onClick={ this.handleGenreSearch }>Mystery</button>
                        <button id='10749' onClick={ this.handleGenreSearch }>Romance</button>
                        <button id='878' onClick={ this.handleGenreSearch }>Science Fiction</button>
                        <button id='10770' onClick={ this.handleGenreSearch }>TV Movie</button>
                        <button id='53' onClick={ this.handleGenreSearch }>Thriller</button>
                        <button id='10752' onClick={ this.handleGenreSearch }>War</button>
                        <button id='37' onClick={ this.handleGenreSearch }>Western</button>
                    </div>
                </div>
                <div className='container'>
                    {
                        this.state.movie_list.map((movie, i) => {
                            if ("known_for" in movie) {
                                return movie.known_for.map((m, x) => 
                                    <MovieBox key={ x }
                                        id={ m.id }
                                        title={ m.title }
                                        poster_path={ m.poster_path }
                                        overview={ m.overview }
                                        release_date={ m.release_date }/>)
                            } 
                            
                            return(<MovieBox key={ i } 
                                id={ movie.id }
                                title={ movie.title }
                                poster_path={ movie.poster_path }
                                overview={ movie.overview }
                                release_date={ movie.release_date }/>)
                        })
                    }
                </div>
            </>
        );
    }
}

export default Movie;