import React, {Component} from 'react';
import { Container, Form, Col, Button, Alert } from "react-bootstrap";
import { withRouter } from 'react-router-dom';

import API from "../../utils/API";

class PassengerCreate extends Component {
  state = {
      name:'',
      code: '',
      error: ''
  }

  handleChange(name, event) {
      this.setState({[name]: event.target.value});
  }

  createPassenger = async (event) =>{
    event.preventDefault();
    const { name, code } = this.state;

    if(name === '' || code === ''){
      return this.setState({error: 'Debe completar los campos'})
    }

    try {
      await API.post('/passengers', this.state);
      this.props.history.push({pathname: `/`})
    } catch (error) {
        if(error.response.status === 400){
          this.setState({error: error.response.data.message})
        }
    }
  }

  render(){
    return (
        <Container>
            <h4 className="my-3">Agregar pasajero</h4>
            <Form className="my-4" onSubmit={this.createPassenger}>
                <Form.Row>
                    <Col>
                        <Form.Control 
                        placeholder="Nombre" 
                        value={this.state.name} 
                        onChange={(e) => this.handleChange('name', e)}
                        />
                    </Col>
                    <Col>
                        <Form.Control 
                        placeholder="Codigo de vuelo" 
                        value={this.state.code} 
                        onChange={(e) => this.handleChange('code', e)}
                        />
                    </Col>
                </Form.Row>
                {
                  this.state.error ?
                  <Alert variant='danger' className="my-4">
                    {this.state.error}
                  </Alert>
                  :
                    null
                }
                <div className="my-4 text-right">
                    <Button type="submit">Enviar</Button>
                </div>
            </Form>
        </Container>
    );
  }
}

export default withRouter(PassengerCreate);
