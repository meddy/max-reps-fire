import React, {Component} from 'react';
import {Col, Row, ListGroup, ListGroupItem} from 'react-bootstrap';

class Exercises extends Component {
  render() {
    return <Row>
      <Col lg={6} lgOffset={3}>
        <h4>System Defined</h4>
        <ListGroup>
          <ListGroupItem>Barbell Bench Press</ListGroupItem>
          <ListGroupItem>Barbell Shoulder Press</ListGroupItem>
          <ListGroupItem>Dumbbell Tricep Extension</ListGroupItem>
        </ListGroup>
      </Col>
    </Row>;
  }
}

export default Exercises;
