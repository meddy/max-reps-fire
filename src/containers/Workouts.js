import React, {Component} from 'react';
import {Button, ButtonGroup, ButtonToolbar, Col, DropdownButton, FormControl, MenuItem, Row} from 'react-bootstrap';
import {LinkContainer} from 'react-router-bootstrap';

class Workouts extends Component {
  render() {
    return <Row>
      <Col lg={6} lgOffset={3}>
        <Row>
          <Col md={6}>
            <FormControl componentClass="select" placeholder="Workout Template" className="select-action"/>
            <Button bsStyle="primary" title="New Workout">
              <span className="glyphicon glyphicon-plus" /> Workout
            </Button>
          </Col>
          <Col md={6} className="text-right">
            <LinkContainer to={{ pathname: '/workout-templates'}}>
              <Button title="New Workout Template">
                <span className="glyphicon glyphicon-plus" /> Template
              </Button>
            </LinkContainer>
          </Col>
        </Row>
      </Col>
    </Row>;
  }
}

export default Workouts;
