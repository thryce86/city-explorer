import React from 'react';
import { Card } from "react-bootstrap" ; 

class  Weather extends React.Component {
  constructor(props) {
    super(props);
  }



  render(){
  console.log('In weather ' + this.props.weatherData.data[0].description ) ;     
    
    return( 
      <>
      <Card>
      {/* <Card.Img variant='bottom' src = {this.state.mapData}/> */}
        <Card.Body>
        <ul>
              <li>Date: {this.props.weatherData.data[0].date}      Forecast: {this.props.weatherData.data[0].description} </li> 
              <li>Date:  {this.props.weatherData.data[1].date}     Forecast: {this.props.weatherData.data[1].description} </li>
              <li>Date: {this.props.weatherData.data[2].date}      Forecast: {this.props.weatherData.data[2].description} </li>
        </ul>
        </Card.Body>
    </Card>
    </>
    );


    }


}

export default Weather ;