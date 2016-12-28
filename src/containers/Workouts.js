import React, {Component} from 'react';
import {Button, Col, FormControl, Row} from 'react-bootstrap';
import {connect} from 'react-redux';
import {browserHistory} from 'react-router';
import {addWorkoutTemplate} from '../actions/creators';
import {getWorkoutTemplateNames} from '../helpers/selectors';
import {NewEntityModal} from '../components';

class Workouts extends Component {
  state = {
    newWorkoutTemplateVisible: false
  };

  showNewWorkoutTemplate = () => {
    this.setState({newWorkoutTemplateVisible: true});
  };

  hideNewWorkoutTemplate = () => {
    this.setState({newWorkoutTemplateVisible: false});
  };

  onSubmitNewWorkoutTemplate = value => {
    const {dispatch} = this.props;
    dispatch(addWorkoutTemplate(value));

    this.setState({newWorkoutTemplateVisible: false});

    browserHistory.push(`/workout-template/${value}`);
  };

  getNameValidationState = (value) => {
    const {workoutTemplateNames} = this.props;

    if (!value.length) {
      return;
    }

    return workoutTemplateNames.includes(value) ? 'error' : 'success';
  };

  render() {
    return <Row>
      <Col lg={8} lgOffset={2}>
        <Row>
          <Col sm={6}>
            <Button
              title="New Workout Template"
              onClick={this.showNewWorkoutTemplate}
            >
              <span className="glyphicon glyphicon-plus" /> Template
            </Button>
          </Col>
          <Col sm={6}>
            <FormControl
              componentClass="select"
              placeholder="Workout Template"
              className="select-action"
            />
            <Button bsStyle="primary" title="New Workout">
              <span className="glyphicon glyphicon-plus" /> Workout
            </Button>
          </Col>
        </Row>
      </Col>
      <NewEntityModal
        onHide={this.hideNewWorkoutTemplate}
        onSubmit={this.onSubmitNewWorkoutTemplate}
        show={this.state.newWorkoutTemplateVisible}
        title="Add New Workout Template"
        getValidationState={this.getNameValidationState}
      />
    </Row>;
  }
}

function mapStateToProps(state) {
  return {
    workoutTemplateNames: getWorkoutTemplateNames(state)
  };
}

export default connect(mapStateToProps)(Workouts);
