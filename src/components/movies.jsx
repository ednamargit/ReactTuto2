import React, { Component } from 'react';
import { getMovies } from '../services/fakeMovieService'; 
import Like from './common/like';

// // var handleDelete;
// var handleLike;


class Movies extends Component {

    constructor(props) {
      super(props);
      this.state = { 
        movies: getMovies()
      };
      // var handleDelete;
      // this.handleDelete = this.handleDelete.bind(this);
      // this.handleLike = this.handleLike(this);
    }

    // handleDelete = (movie) => {
    //   const movies = this.state.movies.filter(m => m._id !== movie._id);
    //   //override the properties of the state object
    //   //if the key and value are the same, we can remove the repetition 
    //   // this.state({ movies: movies });
    //   this.setState({ movies });
    // }


    handleDelete(movie) {
      const movies = this.state.movies.filter(m => m._id !== movie._id);
      this.setState({ movies });
    }

    // handleLike = () => {
    //   console.log('Like clicked');
    // }

    handleLike(movie) {
      console.log('Like clicked', movie);
      const movies = [...this.state.movies]; 
      const index = movies.indexOf(movie);
      movies[index] = { ...movies[index] };
      movies[index].liked = !movies[index].liked;
      this.setState({ movies });
    }
  
    render() { 
        const { length: count } = this.state.movies; 

        if(count === 0) return <p>There are no movies in the database</p>

        return (
          <React.Fragment>
            <p>Showing {count} movies in the database.</p>
            <table className="table">
              <thead>
                <tr>
                  <th>Title</th>
                  <th>Genre</th>
                  <th>Stock</th>
                  <th>Rate</th>
                  <th></th>
                  <th></th>
                </tr>
              </thead>
              <tbody>
                {this.state.movies.map(movie => 
                  <tr key={movie._id}>
                  <td>{movie.title}</td>
                  <td>{movie.genre.name}</td>
                  <td>{movie.numberInStock}</td>
                  <td>{movie.dailyRentalRate}</td>
                  <td>
                    <Like liked={movie.liked} onClick={() => this.handleLike(movie)} />
                  </td>
                  <td><button onClick={() => this.handleDelete(movie)} className="btn btn-danger btn-sm">Delete</button></td>
                  </tr>
                )}
              </tbody>
            </table>
          </React.Fragment>
        );
    }
}
 
export default Movies;