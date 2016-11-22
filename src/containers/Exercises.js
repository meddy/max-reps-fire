import React, {Component, PropTypes} from 'react';
import {Button, Col, Modal, Row, ListGroup, ListGroupItem} from 'react-bootstrap';
import {connect} from 'react-redux';
import actions from '../actions';

class Exercises extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isModalVisible: false
    };
  }

  componentWillMount() {
    this.props.dispatch(actions.requestExercises());
  }

  render() {
    const {system, user} = this.props;
    return <Row>
      <Col lg={6} lgOffset={3}>
        <div className="clearfix">
          <h4 className="pull-left">User Defined</h4>
          <Button
            bsStyle="primary"
            title="New Workout"
            className="pull-right"
            onClick={() => this.setState({isModalVisible: true})}
          >
            <span className="glyphicon glyphicon-plus"/>
          </Button>
        </div>
        <NewExerciseForm
          show={this.state.isModalVisible}
          onHide={() => this.setState({isModalVisible: false})}
        />
        <ListGroup>
          {user.map(exercise =>
            <Exercise name={exercise} key={exercise}>{exercise}</Exercise>
          )}
        </ListGroup>
      </Col>
      <Col lg={6} lgOffset={3}>
        <h4>System Defined</h4>
        <ListGroup>
        {system.map(exercise =>
          <Exercise name={exercise} key={exercise}>{exercise}</Exercise>
        )}
      </ListGroup>;
      </Col>
    </Row>;
  }
}

Exercises.propTypes = {
  system: PropTypes.arrayOf(PropTypes.string).isRequired,
  user: PropTypes.arrayOf(PropTypes.string).isRequired
};

Exercises.defaultProps = {
  system: [],
  user: []
};

function NewExerciseForm(props) {
  return <Modal show={props.show} onHide={props.onHide}>
    <Modal.Header closeButton>
      <Modal.Title>Add New Exercise</Modal.Title>
    </Modal.Header>
    <Modal.Body>
      <p>Test</p>
    </Modal.Body>
  </Modal>;
}

NewExerciseForm.propTypes = {
  show: Modal.propTypes.show,
  onHide: Modal.propTypes.onHide
};

function Exercise(props) {
  const {onClickDelete, name} = props;
  return <ListGroupItem key={name} className="clearfix">
    <span className="pull-left">{name}</span>
    {onClickDelete && <Button
      bsStyle="danger"
      title="Delete Exercises"
      onClick={props.onClickDelete}
      className="pull-right"
    >
      <span className="glyphicon glyphicon-trash"/>
    </Button>}
  </ListGroupItem>;
}

Exercise.propTypes = {
  name: PropTypes.string.isRequired,
  onClickDelete: PropTypes.func,
};

function mapStateToProps(state) {
  return {
    system: Object.values(state.exercise.system),
    user: Object.values(state.exercise.user)
  };
}

export default connect(mapStateToProps)(Exercises)
