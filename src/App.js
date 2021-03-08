
import React from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';
import Movies from './components/movies';
import MovieForm from './components/movieForm'; 
import Customers from './components/customers';
import Rentals from './components/rentals';
import NotFound from './components/notFound';
import NavBar from './components/common/navBar';
import LoginForm from './components/loginForm';
import RegisterForm from './components/RegisterForm';
import './App.css';

//in jsx, if there is nothing between the opening and closing tag, you should use the self closing syntax <Movies />, not <Movies></Movies>
function App() {
  return (
   <React.Fragment>
    <NavBar />
    <main className="container">
        <Switch>
          <Route path="/login" component={LoginForm}/>
          <Route path="/register" component={RegisterForm}/>
          <Route path="/movies/:id" component={MovieForm}/>
          <Route path="/movies" component={Movies}/>
          <Route path="/customers" component={Customers}/>
          <Route path="/rentals" component={Rentals}/>
          <Route path="/not-found" component={NotFound} />
          <Redirect from="/" exact to="/movies" />
          <Redirect to="/not-found" />
        </Switch>  
    </main>
   </React.Fragment>
  );
}

export default App;
