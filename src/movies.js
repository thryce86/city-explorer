import React from 'react';
import { Card } from "react-bootstrap" ; 
// import App from './App.js' ;

class  Movies extends React.Component {
  


render(){


  console.log('Weather   movie path   ' ,  this.props.movieData) ;


  




 




return(
<>
 { this.props.movieData.map((movie,idx) => (




    <Card key={idx } >
    <Card.Body >
    
    <ul>
    <li>{movie.overview}</li>
    </ul>

    </Card.Body>
    <Card.Img src= {movie.image_url} />
    </Card>
   


 ))    
 }
</>

);

}



}

export default Movies;