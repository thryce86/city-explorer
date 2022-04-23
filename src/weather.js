import React from 'react';
import { Card } from "react-bootstrap" ; 

class  Weather extends React.Component {
  // constructor(props) {
  //   super(props);
  // }



  render(){
  console.log('In weather ' , this.props.weatherData.data[0].description ) ;     
    
    return( 
      <>
      <Card>
      {/* <Card.Img variant='bottom' src = {this.state.mapData}/> */}
        <Card.Body>
        <ul>
      {this.props.weatherData.data.map((tempObj,idx) =>{
       return( <li key={idx}>Date: {tempObj.date}      Forecast: {tempObj.description} </li> )
      }) }

        </ul>
        </Card.Body>
    </Card>
    </>
    );


    }


}

export default Weather ;