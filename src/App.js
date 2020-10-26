import React, { Component } from 'react';
import { Route, } from 'react-router-dom';

import Header from './components/header/Header';
import PassengerList from './containers/Passengers/PassengerList';
import PassengerCreate from './containers/Passengers/PassengerCreate';
import PassengerDetail from './containers/Passengers/PassengerDetail';

class App extends Component {
  render(){
    return (
      <div className="App">
        <Header />
        <Route path="/passenger/:id" exact component={PassengerDetail}/>
        <Route path="/create" exact component={PassengerCreate}/>
        <Route path="/" exact component={PassengerList}/>
      </div>
    );
  }
}

export default App;
