import { Container, Navbar } from "react-bootstrap";
import { Link } from 'react-router-dom';

function Header() {
  return (
    <Navbar expand="lg" variant="light" bg="light">
      <Container className="justify-space-between">
            <h3 className="text-center my-2">Servicio de pasajeros</h3>
            <Link to="/">HOME</Link>
      </Container>
    </Navbar>
  );
}

export default Header;