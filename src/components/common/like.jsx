import React, { Component } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faHeart } from '@fortawesome/free-solid-svg-icons'
import { faHeart as farHeart } from '@fortawesome/free-regular-svg-icons'


//Input: liked: boolean
//Output: onClick

class Like extends Component {
   
    render() { 
        if(!this.props.liked) {
            return (
                <h1>
                    <FontAwesomeIcon icon={farHeart} />
                    {/* <FontAwesomeIcon icon={faHeart} /> */}
                </h1>
            )    
        } else {
            return (
                <h1>
                    <FontAwesomeIcon icon={faHeart} />
                    {/* <FontAwesomeIcon icon={faHeart} /> */}
                </h1>
            )   
        }
      
        // <FontAwesome className="far fa-heart"/>);
    }
}
 
export default Like;