import React, {Component, PropTypes} from 'react';
import {Col, Row, ListGroup, ListGroupItem} from 'react-bootstrap';
import {connect} from 'react-redux';

import actions from '../actions';

class Exercises extends Component {
  componentWillMount() {
    this.props.dispatch(actions.requestExercises());
  }

  render() {
    return <Row>
      <Col lg={6} lgOffset={3}>
        <h4>System Defined</h4>
        <ListGroup>
          {this.props.system.map((exercise, index) => <ListGroupItem key={index}>{exercise}</ListGroupItem>)}
        </ListGroup>
      </Col>
    </Row>;
  }
}

function mapStateToProps(state) {
  return {
    system: Object.values(state.exercise.system)
  };
}

Exercises.propTypes = {
  system: PropTypes.arrayOf(PropTypes.string).isRequired,
};

Exercises.defaultProps = {
  system: []
};

export default connect(mapStateToProps)(Exercises)
