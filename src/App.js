// import logo from './logo.svg';
import React from 'react';
import './App.css';
import axios from 'axios';
import { Card } from "react-bootstrap" ; 
// import Weather from weather.js;
import Weather from './weather.js';

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
      weatherData : []
    }
  }


  handleRequest = (event) => {
    this.setState({
      city : event.target.value
    })
    // console.log(event.target.value);
  }


  handleRetrieveData = async (e) => { 
    e.preventDefault();

    try{
    

    let url = `https://us1.locationiq.com/v1/search.php?key=${process.env.REACT_APP_LOCATIONIQ_API_KEY}&q=${this.state.city}&format=json`;
    let cityData = await axios.get(url);
    // https://maps.locationiq.com/v3/staticmap?key=pk.56187e10aa577e0c06008dc4a3e2eda8&center=46.1377048,-122.9344623
    
    // console.log(cityData.data[0].lon) ;
    
    let mapUrl =`https://maps.locationiq.com/v3/staticmap?key=${process.env.REACT_APP_LOCATIONIQ_API_KEY}&center=${cityData.data[0].lat},${cityData.data[0].lon}&zoom=15`
    console.log(mapUrl);

    //lab 07 Frontend
    //get data from backend 
    // http://localhost:3001/weather?searchQuery=Paris
   let weatherUrl = `http://localhost:3001/weather?searchQuery=${this.state.city}`

   console.log(weatherUrl);
   let weatherDataTemp = await axios.get(weatherUrl);
   console.log(weatherDataTemp);


    this.setState({
      cityData: cityData.data[1] , 
      displayLocation : true ,
      mapData : mapUrl ,
      weatherData : weatherDataTemp
    })

    console.log('in app.js 67 ' + this.state.weatherData[0].description) ;

    }catch (error){
      this.setState({error : true }) ;

    }

    

  }





  render(){

    
// let swListItems = this.state.InputData.map((char, idx) => {
//   return <li key={idx}>{char.name}</li>
// })




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
  </>
 
  :
  <>

{this.state.error
  ? 
  <>
  <Card>
  <Card.Body>
    <p>Error!!!!!!!!!!!! </p>
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
