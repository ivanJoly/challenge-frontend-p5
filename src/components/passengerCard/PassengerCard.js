import { Card } from "react-bootstrap";
import { withRouter } from 'react-router-dom';

function PassengerCard(props) {

  return (
    <Card 
    className="mb-2" 
    style={{cursor: 'pointer'}}
    onClick={() => props.history.push({pathname: `/passenger/${props.id}`})}>
        <Card.Header>Nombre: {props.name} - Codigo de vuelo: {props.code}</Card.Header>
    </Card> 
  );
}

export default withRouter(PassengerCard);
