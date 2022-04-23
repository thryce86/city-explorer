// import logo from './logo.svg';
import React from 'react';
import './App.css';
import axios from 'axios';
import { Card } from "react-bootstrap" ; 
// import Weather from weather.js;
import Weather from './weather.js';
import Movies from './movies.js';



class  App extends React.Component {


  constructor(props) {
    super(props);
    this.state = {
      InputData: [],
      city: '',
      cityData: {},
      displayLocation:false,
      error: false,
      errorMessage: 'You have an error.',
      mapData : '',
      serverError :false ,
      weatherData : [], 
      windData : [],
      movieData : [],
      moviesReturned:true
    }
  }


  handleRequest = (event) => {
    if(this.state.error===true){

   
    }
   

    this.setState({
      city : event.target.value
    })
   

    // console.log(event.target.value);
  }


  handleRetrieveData = async (e) => { 
    e.preventDefault();
    // if(error){
    //   error=null;
    // }

    this.setState({
      error : false ,
      serverError :false,
      displayLocation : false

    })


    try{
    
    // let baseUrl = 'http://localhost:3001' ;    REACT_APP_BASE_URL=https://here-to-deploy-backend.herokuapp.com
    let baseUrl =`${process.env.REACT_APP_BASE_URL}` ;
    // console.log(REACT_APP_BASE_URL)

    let url = `https://us1.locationiq.com/v1/search.php?key=${process.env.REACT_APP_LOCATIONIQ_API_KEY}&q=${this.state.city}&format=json`;
    let cityData = await axios.get(url);
    // https://maps.locationiq.com/v3/staticmap?key=pk.56187e10aa577e0c06008dc4a3e2eda8&center=46.1377048,-122.9344623
    
   
    
    let mapUrl =`https://maps.locationiq.com/v3/staticmap?key=${process.env.REACT_APP_LOCATIONIQ_API_KEY}&center=${cityData.data[0].lat},${cityData.data[0].lon}&zoom=15`
    console.log(mapUrl);

    



     
      // console.log('citData      =' + `http://localhost:3001/weather?&lat=${cityData.data[0].lat}&lon=${cityData.data[0].lon}`) ;



   


    this.setState({
      cityData: cityData.data[1] , 
      mapData : mapUrl 
     
    })





// Lab 08
let weatherUrl = baseUrl+`/weather?searchQuery=${this.state.city}&lat=${cityData.data[0].lat}&lon=${cityData.data[0].lon}`;
console.log('WeatherUrl',weatherUrl);
let weatherDataTemp = await axios.get(weatherUrl);

//http://localhost:3001/movies?city=Paris
// let movieUrl= baseUrl +`/movies?city=${this.state.city}` ; 

//
let movieUrl= baseUrl +`/movies?city=${this.state.city}` ; 


let movieData = await axios.get(movieUrl);
// console.log('movieUrl   '+ movieUrl);
// console.log(movieData.data.length === 0);
console.log('got movie data     ' , movieData.data);


if(movieData.data.length === 0  ){
  this.setState({
    moviesReturned:false
  })

}else{
  this.setState({
    moviesReturned:true
  } )
}

// console.log('Got pic?????    ' + this.state.moviesReturned) ;

this.setState({
  weatherData : weatherDataTemp,
 displayLocation : true ,
 movieData : movieData.data
});

  

    }catch (error){

      console.log(error) ;

      this.setState({
        error : true,
        serverError:true }) ;

    }

    

  }





  render(){





  return (

        <>
    





    
    
      <header >
        {/* <img src={logo} className="App-logo" alt="logo" /> */}
      

                    <form  onSubmit={this.handleRetrieveData}>
                    <label>Pick a city please
                    <input type='text' name='city'  
                    onInput={this.handleRequest}
                   ></input>
                    </label>
                    
                   <button type="submit" >Explore!</button>

                    </form>
      </header>





  {this.state.displayLocation
  ?
<>

  <Card>
    <Card.Img variant='bottom' src = {this.state.mapData}/>
      <Card.Body>
      <ul>
          <li>Display Name : {this.state.cityData.display_name}</li> 
            <li>Longitude : {this.state.cityData.lon}</li>  
            <li>Lattitude       : {this.state.cityData.lat}</li>
      </ul>
      </Card.Body>
  </Card>

<Weather weatherData= {this.state.weatherData} />



{/* {console.log('in html ' + this.state.movieData)} */}

 {this.state.moviesReturned  ?

<Movies movieData ={this.state.movieData} />
:
<></>

} 




  </>
 
  :
  <>

{this.state.error
  ? 
  <>
  <Card>
  <Card.Body>
    <p>Error!!!!!!!!!!!! </p>
          <>
                {this.state.serverError ?
                      <p> Server Error.  Please double check your queery </p>
                      :  <></>
                }
          </>


  </Card.Body>
  <Card.Img src= "https://memegenerator.net/img/instances/21295255/im-sorry.jpg" />
  </Card>
  </>
  :
  <p></p> 
  
  
  
  }



  </>
  
  

  
  } 
  
  

    </>
  );

}
}

export default App;
