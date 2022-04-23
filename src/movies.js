import React from 'react';
import { Card } from "react-bootstrap" ; 
// import App from './App.js' ;

class  Movies extends React.Component {
  


render(){


  console.log('Weather   movie path   ' ,  this.props.movieData) ;


  

  // this.title = inputObj.original_title;
  // this.overview = inputObj.overview;
  // this.total_votes = inputObj.vote_count;
  // this.image_url = beginningUrl + inputObj.poster_path;
  // this.popularity = inputObj.vote_average;
  // this.release_date = inputObj.release_date;



 




return(
<>
 { this.props.movieData.map((movie,idx) => (




    <Card key={idx } >
       <Card.Title>{movie.title}</Card.Title>
    <Card.Body >
    
    <ul>
    <li> Overview : {movie.overview}</li>
    <li> Release Date : {movie.release_date}</li>
    <li> Total Votes : {movie.total_votes}</li>
    <li> Popularity  : {movie.popularity}</li>
    
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