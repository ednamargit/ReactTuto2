// import React, { Component } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faHeart } from '@fortawesome/free-solid-svg-icons'
import { faHeart as farHeart } from '@fortawesome/free-regular-svg-icons'


//Input: liked: boolean
//Output: onClick

//This is a controlled component because it receives all the data it needs, and props, and it notifies any changes to the data, again by using props, so
//it does not have any state itself, and here we do not have any helper methods, any event handlers, we only have the render method.
//So, we can turn this component into a stateless functional component, and simplify this code.
//When you convert a class to a functional component, you should get rid of all the references to this, and then pass props as a parameter to this function

//Stateless Functional Component

const Like = (props) => {
    return (
      <h1>
        {!props.liked ? (
          <FontAwesomeIcon
            onClick={props.onClick}
            style={{ cursor: "pointer" }}
            icon={farHeart}
          />
        ) : (
          <FontAwesomeIcon
            onClick={props.onClick}
            style={{ cursor: "pointer" }}
            icon={faHeart}
          />
        )}
      </h1>
    );    
}
 

//Class Component

// class Like extends Component {
   
//     render() {
        // return (
        //     <h1>
        //     {!this.props.liked ? (
        //         <FontAwesomeIcon
        //         onClick={this.props.onClick}
        //         style={{ cursor: "pointer" }}
        //         icon={farHeart}
        //         />
        //     ) : (
        //         <FontAwesomeIcon
        //         onClick={this.props.onClick}
        //         style={{ cursor: "pointer" }}
        //         icon={faHeart}
        //         />
        //     )}
        //     </h1>
        // );    
//     }       
// }
 
export default Like;