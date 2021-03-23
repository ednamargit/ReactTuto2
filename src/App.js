
import React, { useEffect, useState } from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';
import { ToastContainer } from 'react-toastify'; 
import Movies from './components/movies';
import MovieForm from './components/movieForm'; 
import Customers from './components/customers';
import Rentals from './components/rentals';
import NotFound from './components/notFound';
import NavBar from './components/common/navBar';
import LoginForm from './components/loginForm';
import RegisterForm from './components/RegisterForm';
import Logout from './components/common/logout';
import ProtectedRoute from './components/common/protectedRoute';
import auth from './services/authService'; 
import 'react-toastify/dist/ReactToastify.css';
import './App.css';

//in jsx, if there is nothing between the opening and closing tag, you should use the self closing syntax <Movies />, not <Movies></Movies>
function App() {

  const [user, setUser] = useState({}); 

  useEffect(() => {
    const user = auth.getCurrentUser();
    setUser({ ...user }); 
    console.log(user);
    // console.log((Object.keys(user).length == 0)); 
  }, []); //One of the popular cases that using useState inside of useEffect will not cause an infinite loop is when you pass an empty array as a second argument to useEffect 
  //like useEffect(() => {....}, []) which means that the effect function should be called once: after the first mount/render only. Stackoverflow
  
  return (
    <React.Fragment>
      <ToastContainer />
      <NavBar user={user} />
      <main className="container">
        <Switch>
          <Route path="/login" component={LoginForm} />
          <Route path="/logout" component={Logout} />
          <Route path="/register" component={RegisterForm} />
          <ProtectedRoute 
            path="/movies/:id" 
            component={MovieForm} />
          <Route
            path="/movies"
            render={(props) => <Movies {...props} user={user} />}
          />
          <Route path="/customers" component={Customers} />
          <Route path="/rentals" component={Rentals} />
          <Route path="/not-found" component={NotFound} />
          <Redirect from="/" exact to="/movies" />
          <Redirect to="/not-found" />
        </Switch>
      </main>
    </React.Fragment>
  );
}

export default App;
