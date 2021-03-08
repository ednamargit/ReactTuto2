import React, { Component } from "react";
import Joi from "joi-browser";
import Form from './common/form'; 

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
  
  doSubmit() {
    //Call the server
    console.log("Submitted");
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
