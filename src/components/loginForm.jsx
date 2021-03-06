import React from "react";
import { Redirect } from 'react-router-dom';
import Joi from "joi-browser";
import Form from './common/form'; 
import auth from '../services/authService'; 

class LoginForm extends Form {
 
  constructor(props) {
    super(props);
    this.state = {
      data: { username: "", password: "" },
      errors: {},
    };

    this.schema = {
      username: Joi.string().required().label("Username"),
      password: Joi.string().required().label("Password"),
    };

    this.handleChange = this.handleChange.bind(this);
    this.validate = this.validate.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }
  
  async doSubmit() {
    //Call the server
    try {
      const { data } = this.state;
      await auth.login(data.username, data.password); //JSON Web Tokens
      //this.props.history.push("/");//Does not do the full reload 

      const { state } = this.props.location;
      window.location = state ? state.from.pathname : '/'; //Full reload of the application. Our app component will be mounted again (changes of the menu) 
    } catch (error) {
      if(error.response && error.response.status === 400) {
        const errors = {...this.state.errors};
        errors.username = error.response.data; 
        this.setState({ errors }); 
      }
    }
  }; 

  render() {
    //window.location -> We use it when the user is trying to login, so we reload the app, our app is remounted
    //and is in the right state in terms of knowing the current user 
    if(auth.getCurrentUser()) return <Redirect to="/"/>
    return (
      <div className="container">
        <h1>Login</h1>
        <form onSubmit={this.handleSubmit}>
          {this.renderInput('username', 'Username')}
          {this.renderInput('password', 'Password', 'password')}
          {this.renderButton("Login")}
        </form>
      </div>
    );
  }
}

export default LoginForm;
