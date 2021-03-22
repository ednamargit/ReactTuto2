
import axios from 'axios'; 
import { toast } from 'react-toastify'; 

//The method use takes two parameters, which are functions that can be called. The first function will be called if the response is successful, 
//and the second one if the response includes an error
// axios.interceptors.response.use(success, error) When we don't care about the successful response, we should pass null
axios.interceptors.response.use(null, (error) => {
  const expectedError =
    error.response &&
    error.response.status >= 400 &&
    error.response.status > 500;

  if (!expectedError) {
    console.log("Logging the error" + error);
    // toast.error("An unexpected error occurred!"); //We can use toast as an object 
    toast("An unexpected error occurred!"); //We can use toast as a function (There is a change in the dessign)
  }
  return Promise.reject(error);
});

function setJwt(jwt) {
  //include headers with common (all requests - get, post...)
  axios.defaults.headers.common['x-auth-token'] = jwt;
}

export default {
  get: axios.get,
  post: axios.post,
  put: axios.put, 
  delete: axios.delete,
  setJwt
};