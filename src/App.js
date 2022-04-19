// import logo from './logo.svg';
import React from 'react';
import './App.css';
import axios from 'axios';
// import bootstrap from "react-bootstrap" ; 

class  App extends React.Component {


  constructor(props) {
    super(props);
    this.state = {
      InputData: [],
      city: '',
      cityData: {},
      error: false,
      errorMessage: 'You have an error.'
    }
  }


  handleRequest = (event) => {
    this.setState({
      city : event.target.value
    })
    console.log(event.target.value);
  }


  handleRetrieveData = async (e) => {
    e.preventDefault();
      // console.log(this.state.city);

    console.log('In State: ', this.state.city);
    // get city data?
    let url = `https://us1.locationiq.com/v1/search.php?key=${process.env.REACT_APP_LOCATIONIQ_API_KEY}&q=${this.state.city}&format=json`;
    let cityData = await axios.get(url);
    console.log(cityData.data[0]);
    this.setState({
      cityData: cityData.data[0]
    })
    console.log(cityData);

  }





  render(){

    
let swListItems = this.state.InputData.map((char, idx) => {
  return <li key={idx}>{char.name}</li>
})




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




{this.state.error
    ?
    <p>{this.state.errorMessage}</p>
    :
    <ul>
      {swListItems}
    </ul>}
   


    </>
  );

}
}

export default App;
