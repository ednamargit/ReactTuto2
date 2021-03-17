import httpService from './httpService'; 
import { apiUrl } from '../config.json';

const apiEndpoint = apiUrl + '/movies';

function movieUrl(id) {
  return `${apiEndpoint}/${id}`;
}


export function getMovies() {
  return httpService.get(apiEndpoint);
}

export function getMovie(id) {
  return httpService.get(apiEndpoint + '/' + id); 
}

export function saveMovie(movie, id) {
  if(id && id !== "new"){
    return httpService.put(movieUrl(id), movie); 
  } 
  return httpService.post(apiEndpoint, movie); 
}

export function deleteMovie(id) {
  return httpService.delete(apiEndpoint + '/' + id); 
}
