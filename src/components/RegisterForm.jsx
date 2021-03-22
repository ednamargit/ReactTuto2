import React from "react";
import Joi, { errors } from "joi-browser";
import Form from './common/form'; 
import * as userService from '../services/userService'; //To import all the functions 
import auth from '../services/authService'; 

class RegisterForm extends Form {
 
  constructor(props) {
    super(props);
    this.state = {
      data: { username: "", password: "", name: "" },
      errors: {},
    };

    this.schema = {
      username: Joi.string().email().required().label("Username"),
      password: Joi.string().min(5).required().label("Password"),
      name: Joi.string().required().label("Name")
    };

    this.handleChange = this.handleChange.bind(this);
    this.validate = this.validate.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }
  
  async doSubmit() {
    try{
      const response = await userService.register(this.state.data);     
      auth.loginWithJwt(response.headers['x-auth-token']);
      //this.props.history.push("/");//Does not do the full reload 
      window.location = '/'; //Full reload of the application. Our app component will be mounted again (changes of the menu) 
      console.log(response); 
    } catch(ex){
      if(ex.response && ex.response.status === 400) {
        const errors = {...this.state.errors};
        errors.username = ex.response.data; 
        this.setState({ errors }); 
      }
    }
  }

  render() {
    return (
      <div className="container">
        <h1>Register</h1>
        <form onSubmit={this.handleSubmit}>
          {this.renderInput('username', 'Username')}
          {this.renderInput('password', 'Password', 'password')}
          {this.renderInput('name', 'Name')}
          {this.renderButton("Register")}
        </form>
      </div>
    );
  }
}

export default RegisterForm;
