import React, {Component} from 'react';
import { Link } from 'react-router-dom';
import { Container, Button } from "react-bootstrap";
import PassengerCard from "../../components/passengerCard/PassengerCard";

import API from "../../utils/API";

class PassengerList extends Component {

  state = {
    passengersList: [],
  }

  async componentDidMount(){
    const passengers = await API.get('/passengers');
    this.setState({
      passengersList: passengers.data.passengers
    })
  }

  render(){
    let passengersList;

    if(this.state.passengersList.length !== 0){
      passengersList = this.state.passengersList.map(passenger => {
        return(
          <PassengerCard
            key={passenger.id}
            id={passenger.id}
            name={passenger.name}
            code={passenger.code}
          />
        )
      })
    }else{
      passengersList = <span>No hay pasajeros cargados actualmente.</span>
    }

    return (
        <Container>
            <div className="d-flex justify-content-between my-3">
              <div>
                <h4 >Lista de pasajeros con equipajes</h4>
              </div>
              <div>
                <Link to="/create">
                  <Button>Agregar nuevo pasajero</Button>
                </Link>
              </div>
            </div>
            {passengersList}
        </Container>
    );
  }
}

export default PassengerList;
