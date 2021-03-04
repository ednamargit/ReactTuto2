import React, { Component } from "react";
import { getMovies } from "../services/fakeMovieService";
import { getGenres } from "../services/fakeGenreService";
import Pagination from "./common/pagination";
import ListGroup from "./common/listGroup";
import { paginate } from '../utils/paginate';
import MoviesTable from "./moviesTable";
import _ from "lodash"; 


class Movies extends Component {
  constructor(props) {
    super(props);
    this.state = {
      movies: [],
      genres: [],
      currentPage: 1,
      pageSize: 4,
      sortColumn: { path: 'title', order: 'asc'}
    };

    this.handlePageChange = this.handlePageChange.bind(this);
    this.handleGenreSelect = this.handleGenreSelect.bind(this);
    this.handleSort = this.handleSort.bind(this);
    this.handleDelete = this.handleDelete.bind(this);
    this.handleLike = this.handleLike.bind(this);
  }

  componentDidMount() {

    const genres = [{ _id: "", name: 'All Genres' }, ...getGenres()]

    this.setState({ movies: getMovies(), genres: genres }); 
  }

  //Arrow functions do not work properly. We have to use conventional functions

  // handleDelete = (movie) => {
  //   const movies = this.state.movies.filter(m => m._id !== movie._id);
  //   //override the properties of the state object
  //   //if the key and value are the same, we can remove the repetition
  //   // this.state({ movies: movies });
  //   this.setState({ movies });
  // }

  handleDelete(movie) {
    const movies = this.state.movies.filter((m) => m._id !== movie._id);
    this.setState({ movies });
  };

  // handleLike = () => {
  //   console.log('Like clicked');
  // }

  handleLike(movie) {
    console.log("Like clicked", movie);
    const movies = [...this.state.movies];
    const index = movies.indexOf(movie);
    movies[index] = { ...movies[index] };
    movies[index].liked = !movies[index].liked;
    this.setState({ movies });
  };

  handlePageChange(page) {
    console.log(page);
    this.setState({ currentPage: page });  
  };

  // handleGenreSelect = (genre) => {
  //   console.log(genre);
  // }

  handleGenreSelect(genre) {
    console.log(genre);
    this.setState({ selectedGenre: genre, currentPage: 1 });
  };

  handleSort(sortColumn) {
    this.setState({ sortColumn });
  };

  render() {
    const { length: count } = this.state.movies;
    const { pageSize, currentPage, sortColumn, selectedGenre, movies: allMovies } = this.state; 

    if (count === 0) return <p>There are no movies in the database</p>;

    const filtered = selectedGenre && selectedGenre._id
      ? allMovies.filter(m => m.genre._id === selectedGenre._id)
      : allMovies; 

    const sorted = _.orderBy(filtered, [sortColumn.path], [sortColumn.order]);   

    const movies = paginate(sorted, currentPage, pageSize);

    return (
      <div className="row">
        <div className="col-3">
          <ListGroup
            items={this.state.genres}
            // textProperty = "name"
            // valueProperty = "_id"
            selectedItem={this.state.selectedGenre}
            onItemSelect={this.handleGenreSelect}
          />
        </div>
        <div className="col">
          <p>Showing {filtered.length} movies in the database.</p>
          <MoviesTable
            movies={movies}
            sortColumn= {sortColumn}
            onDelete={this.handleDelete}
            onLike={this.handleLike}
            onSort={this.handleSort}
          />
          <Pagination
            itemsCount={filtered.length}
            pageSize={pageSize}
            currentPage={currentPage}
            onPageChange={this.handlePageChange}
          />
        </div>
      </div>
    );
  }
}

export default Movies;
