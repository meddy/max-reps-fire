import React, {Component, PropTypes} from 'react';
import {Button, Col, FormGroup, FormControl, Modal, Row} from 'react-bootstrap';
import {connect} from 'react-redux';

import actions from '../actions';
import {ExerciseList} from '../components';

class Exercises extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isModalVisible: false,
      name: ''
    };

    this.getNameValidationState = this.getNameValidationState.bind(this);
    this.onNewExerciseSubmit = this.onNewExerciseSubmit.bind(this);
  }

  componentWillMount() {
    const {dispatch} = this.props;
    dispatch(actions.requestExercises());

    // load exercises page
    // fetch system exercises
    // fetch user exercises
    // add new exercise
    // delete new exercise

    // fetch user exercises
  }

  getNameValidationState() {
    const {user, system} = this.props;
    const {name} = this.state;

    if (!name.length) {
      return;
    }

    if (user.includes(name) || system.includes(name)) {
      return 'error';
    }

    return 'success';
  }

  onNewExerciseSubmit(event) {
    event.preventDefault();

    // create new exercise
    // set set
    console.log('test');
  }

  renderModal() {
    const validationState = this.getNameValidationState();

    return <Modal
      show={this.state.isModalVisible}
      onHide={() => this.setState({isModalVisible: false})}
    >
      <Modal.Header closeButton>
        <Modal.Title>Add New Exercise</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <form>
          <FormGroup
            controlId="formBasicText"
            validationState={validationState}
          >
            <FormControl
              type="text"
              value={this.state.name}
              placeholder="name"
              onChange={e => this.setState({name: e.target.value})}
            />
            <FormControl.Feedback />
          </FormGroup>
          <Button
            type="submit"
            bsStyle="success"
            disabled={validationState !== 'success'}
            onClick={this.onNewExerciseSubmit}
          >
            Create
          </Button>
        </form>
      </Modal.Body>
    </Modal>;
  }

  render() {
    const {system, user} = this.props;

    return <Row>
      <Col lg={6} lgOffset={3}>
        <div className="clearfix">
          <h4 className="pull-left">User Defined</h4>
          <Button
            bsStyle="success"
            title="New Workout"
            className="pull-right"
            onClick={() => this.setState({isModalVisible: true})}
          >
            <span className="glyphicon glyphicon-plus"/> Create
          </Button>
        </div>
        <ExerciseList items={user}/>
      </Col>
      <Col lg={6} lgOffset={3}>
        <h4>System Defined</h4>
        <ExerciseList items={system}/>
      </Col>
      {this.renderModal()}
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

function mapStateToProps(state) {
  return {
    system: Object.values(state.exercise.system),
    user: Object.values(state.exercise.user)
  };
}

export default connect(mapStateToProps)(Exercises)
