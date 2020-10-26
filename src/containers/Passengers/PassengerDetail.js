import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import { Container, Card, Button, Form } from "react-bootstrap";

import API from "../../utils/API";

class PassengerDetail extends Component {
  state = {
    id: null,
    passenger: null,
    packages: [],
    categoryPackage: 1,
  };

  async componentDidMount() {
    const passengerId = this.props.match.params.id;
    try {
      const responseData = await this.getPassenger(passengerId);
      console.log(responseData);
      const { passenger } = responseData.data;
      this.setState({
        id: passengerId,
        passenger,
        packages: passenger.packages,
      });
    } catch (error) {
      console.log("error");
      this.props.history.push({ pathname: `/` });
    }
  }

  async getPassenger(id) {
    return await API.get(`/passengers/${id}`);
  }

  createPackages = async () => {
    const data = {
      passengerId: this.state.id,
      category: this.state.categoryPackage,
    };

    try {
      await API.post(`/packages/`, data);
      const responseData = await this.getPassenger(this.state.passenger.id);
      console.log(responseData);
      const packages = responseData.data.passenger.packages;
      this.setState({ packages });
    } catch (error) {
      console.log(error.response);
    }
  };

  removePassenger = async () => {
    try {
      await API.delete(`/passengers/${this.state.id}`);
      this.props.history.push({ pathname: `/` });
    } catch (error) {}
  };

  handleChange(name, event) {
    this.setState({ [name]: event.target.value });
  }

  getCategory(id) {
    let category;
    switch (id) {
      case 1:
        category = `Categoria ${id} - Grandes (un carry-on o similar)`;
        break;
      case 2:
        category = `Categoria ${id} - Pequeños (una cartera, mochila o bolso pequeño)`;
        break;
      case 3:
        category = `Categoria ${id} - Prendas (abrigos o mantas)`;
        break;
      default:
        break;
    }

    return category;
  }

  render() {
    let packages = [];

    if (this.state.packages.length !== 0) {
      packages = this.state.packages.map((packages) => {
        return (
          <Card.Text key={packages.id}>
            <span>{`Id: ${packages.id} - Categoria: ${this.getCategory(
              packages.category
            )}`}</span>
          </Card.Text>
        );
      });
    } else {
      packages = <span>No hay paquetes cargados actualmente.</span>;
    }

    return (
      <Container>
        <h4 className="my-3">Informacion de pasajero:</h4>
        {this.state.passenger != null ? (
          <Card className="mb-2">
            <Card.Header>
              <span>{`Nombre: ${this.state.passenger.name} - Codigo de vuelo: ${this.state.passenger.code}`}</span>
            </Card.Header>
            <Card.Body>
              <Card.Title>Paquetes guardados:</Card.Title>
              <div className="mb-3">{packages}</div>
              <div>
                <Form.Group controlId="exampleForm.ControlSelect1">
                  <Form.Label>
                    Seleccione categoria de paquete a agregar
                  </Form.Label>
                  <Form.Control
                    as="select"
                    onChange={(e) => this.handleChange("categoryPackage", e)}
                  >
                    <option value="1">Grandes (un carry-on o similar)</option>
                    <option value="2">
                      Pequeños (una cartera, mochila o bolso pequeño)
                    </option>
                    <option value="3">Prendas (abrigos o mantas)</option>
                  </Form.Control>
                </Form.Group>
                <Button
                  variant="primary"
                  className="mr-3"
                  onClick={this.createPackages}
                  disabled={this.state.packages.length === 3}
                >
                  Agregar nuevo
                </Button>
                <Button
                  variant="primary"
                  onClick={this.removePassenger}
                  disabled={!(this.state.packages.length !== 0)}
                >
                  Retirar todo
                </Button>
              </div>
            </Card.Body>
          </Card>
        ) : (
          "cargando"
        )}
      </Container>
    );
  }
}

export default withRouter(PassengerDetail);
