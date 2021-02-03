import React from 'react';
const Header = props => {
    let moviePage;
    let accountPage;
    let adminPage;
    let signUpPage;

    if (sessionStorage.getItem('user')) {
        moviePage = <a href='/movies'>Movies</a>
        accountPage = <a href='/account'>Account Settings</a>
        signUpPage = <a href='/signup'>Sign Up</a>

        // Checks if the user is an admin
        let isAdmin = JSON.parse(sessionStorage.getItem('user')).isAdmin;
        if (isAdmin) {
            adminPage = <a href='/admin'>Admin Settings</a>
        }
    }

    return(
        <>
            <div id='header'>
                <a href='/'>Go Home</a>
                { moviePage }
                { accountPage }
                { adminPage }
                { signUpPage }
                <a href='/' onClick={() => { sessionStorage.removeItem('user') }}>Log Out</a>
            </div>
        </>
    )
}

export default Header;