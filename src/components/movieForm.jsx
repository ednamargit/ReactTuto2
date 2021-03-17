import React from "react";
import Joi from 'joi-browser'; 
import Form from './common/form';
import { getMovie, saveMovie } from '../services/movieService';
import { getGenres } from '../services/genreService'


class MovieForm extends Form {
  constructor(props) {
    super(props);
    this.state = { 
      data: {
        title: "",
        genreId: "",
        numberInStock: "",
        dailyRentalRate:""
      },
      genres: [],
      errors: {}
     };
    
    this.schema = {
      _id: Joi.string(),
      title: Joi.string().required().label("Title"),
      genreId: Joi.string().required().label("Genre"),
      numberInStock: Joi.number().required().min(0).max(100).label("Number in Stock"),
      dailyRentalRate: Joi.number().required().min(0).max(10).label("Daily Rental Rate")
    };
  };

  async populateGenres() {
    // const { data } = await getGenres();
    // const genres = [...data];
    // this.setState({ genres }); 
  
    let genresPromise = await getGenres();
    let { data } = genresPromise;
    
    this.setState({ genres: data });
  }

  async populateMovie() {
    const movieId = this.props.match.params.id;
    if(movieId === "new") return; 
    // let movieTest = {
    //                 title: "ABC",
    //                 genreId: "604b9f815964e00c60068745",
    //                 numberInStock: "5",
    //                 dailyRentalRate:"5"
    //               }


    // this.setState({ data: movieTest}); 
    try{
      //Estas dos lineas de codigo hacen lo mismo que las siguientes, utilizando el metodo mapToViewModel
      // const {data: movie} = await getMovie(movieId);
      // this.setState({ data: this.mapToViewModel(movie) }); 
      let moviePromise = await getMovie(movieId); 
      let { data: movieData } = moviePromise; 
    
      let movie = {
                    title: movieData.title, 
                    genreId: movieData.genre._id,
                    numberInStock: movieData.numberInStock,
                    dailyRentalRate: movieData.dailyRentalRate
                  }
  
      this.setState({ data: movie}); 

    } catch(ex){
        if(ex.response && ex.response.status === 404)
          this.props.history.replace("/not-found"); 
    }
  }

  async componentDidMount() {
    await this.populateGenres();
    await this.populateMovie();
  };

  mapToViewModel(movie) {
    return {
      _id: movie._id,
      title: movie.title,
      genreId: movie.genre._id,
      numberInStock: movie.numberInStock,
      dailyRentalRate: movie.dailyRentalRate
    };
  };

  async doSubmit() {
    await saveMovie(this.state.data, this.props.match.params.id);
    this.props.history.push("/movies");
  };

  render() { 
    return ( 
      <div>
        <h1>Movie Form</h1>
        <form onSubmit={this.handleSubmit}>
          {this.renderInput("title", "Title")}
          {this.renderSelect("genreId", "Genre", this.state.genres)}
          {this.renderInput("numberInStock", "Number In Stock", "number")}
          {this.renderInput("dailyRentalRate", "Daily Rental Rate")}
          {this.renderButton("Save")} 
        </form>
      </div>
     );
  }
}
 
export default MovieForm;
