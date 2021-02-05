import React, { Component } from "react";
import { render } from "react-dom";
// import ReCAPTCHA from "react-google-recaptcha";

import Header from "./header";

const usernameRegex = /^.{2,15}$/;
const emailRegex = /^.+@.{2,}\.[A-Za-z0-9]{2,}$/;
const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[\!\@\#\$\%\^\&\*\(\)\[\]\{\}\;\:\'\"\\<\>\,\.\/\?]).{8,}$/;
const validateForm = (errors) => {
  let valid = true;
  Object.values(errors).forEach((val) => val.length > 0 && (valid = false));
  return valid;
};

class SignUp extends Component {
    constructor(props) {
        super(props);

        this.state = {
            accounts: [],
            email: '',
            userName: '',
            password: '',
            redirect: false,
            errors: {
                username: '',
                email: '',
                password: '',
            }
        };

        this.updateUsername = this.updateUsername.bind(this);
        this.updatePassword = this.updatePassword.bind(this);
        this.updateEmail = this.updateEmail.bind(this);

        this.handleSignUp = this.handleSignUp.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);

        // this.handleCaptchaResponseChange = this.handleCaptchaResponseChange.bind(this);
    }

    componentDidMount = () => {
        fetch('https://www.google.com/recaptcha/api/siteverify', {
            method: "GET"
        }).then(res => res.json())
            //not working at moment
            .then(result => this.setState({ accounts: result }, () => {
                let list = [];
                this.state.accounts.forEach(account => {
                    list.push(account.reviews);
                });
            }))
            .catch(e => console.log(e));
    }

    updateUsername = evt => {
        this.setState({ username: evt.target.value });
    }
    updatePassword = evt => {
        this.setState({ password: evt.target.value });
    }

    updateEmail = evt => {
        this.setState({ email: evt.target.value });
    }

    handleSignUp = () => {
        let data = {
            "username": `${this.state.username}`,
            "email": `${this.state.email}`,
            "password": `${this.state.password}`
        }

        fetch('http://localhost:3001/signup', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        }).then(res => res.json())
            .then(result => {
                // if (result.status) {
                //     this.setState({ redirect: true }, () => {
                //         sessionStorage.setItem('user', JSON.stringify(result.account));
                //         this.setState({ redirect: true });
                //     });
                // } else {
                //     console.log('Incorrect Credentials.');
                // }
            });
    }

    handleChange = (event) => {
        event.preventDefault();
        const { name, value } = event.target;
        let errors = this.state.errors;

        switch (name) {
            case 'username':
                errors.username =
                    usernameRegex.test(value)
                        ? 'Username is invalid. 2-15 Characters'
                        : '';
                break;
            case 'email':
                errors.email =
                    emailRegex.test(value)
                        ? ''
                        : 'Email is invalid (ex. email@email.com)';
                break;
            case 'password':
                errors.password =
                    passwordRegex.test(value)
                        ? 'Password is invalid. Length of 8, one capital, one special character, and one number'
                        : '';
                break;
            default:
                break;
        }

        this.setState({ errors, [name]: value }, () => {
            console.log(errors)
        })
  };

  handleSubmit = (event) => {
    event.preventDefault();
    if (validateForm(this.state.errors)) {
      console.info("Valid Form");
    } else {
      console.error("Invalid Form");
    }
  };

  // handleCaptchaResponseChange(response) {
  //     this.setState({
  //         recaptchaResponse: response,
  //     }, () => {
  //         console.log(this.state.recaptchaResponse);
  //     });
  // }

  //put method here to fetch captcha

  //new site key = 6LcIMUkaAAAAAC3smELgHtECXvNaifXeLPuGlfIy
  //new secret key = 6LcIMUkaAAAAAGMW5HbduvaVkf4Y5_MO81stAdOb

  render() {
    const { errors } = this.state;

    return (
      <>
        <Header />
        <div className="signup-container">
          <div className="signup-form">
            <h1 className="title-before">FANDINGO</h1>
            <br />
            <h2 className="center-me">Sign Up!</h2>
            <br />
            <img src="./img/dingo.png" className="login-dingo-before" />
            {/* <p class="error_label">{errmsg}</p> */}
            <label htmlFor="email">Email </label>
            <br />
            <input
              type="text"
              name="email"
              placeholder="Email"
              id="email"
              className="signup-field"
              onChange={this.handleChange}
            />
            {errors.username.length > 0 && (
              <span className="error">{errors.username}</span>
            )}
            <br />
            <br />
            <label htmlFor="username">Username </label>
            <br />
            <input
              type="text"
              name="username"
              placeholder="Username"
              id="username"
              className="signup-field"
              onChange={this.handleChange}
            />
            {errors.email.length > 0 && (
              <span className="error">{errors.email}</span>
            )}
            <br />
            <br />
            <label htmlFor="password">Password </label>
            <br />
            <input
              type="password"
              name="password"
              placeholder="Password"
              id="password"
              className="signup-field"
              onChange={this.handleChange}
            />
            {errors.password.length > 0 && (
              <span className="error">{errors.password}</span>
            )}
            <div id="result"></div>
            {/* <ReCAPTCHA
                            ref={(el) => { this.recaptcha = el; }}
                            sitekey="6LdLMj8aAAAAAGW2SUWdVFKCC94OBcc6A4KMM3DZ"
                            onChange={this.handleCaptchaResponseChange}
                        /> */}
            <br />
            <br />
            <a className="any-btn" onClick={this.handleSignUp}>
              Sign Up!
            </a>
          </div>
          <div className="personality-container">
            <h2>
              This website is for all shapes and sizes! Male and females as well
              as anything in between are welcome to view our website!
            </h2>
            <h2>Handmade by the Grunts at Neumont</h2>
          </div>
        </div>
      </>
    );
  }
}

export default SignUp;
