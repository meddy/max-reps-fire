import React, {Component} from 'react';
import {Button, Col, FormControl, Row} from 'react-bootstrap';
import {connect} from 'react-redux';

import {addWorkoutTemplate} from '../actionCreators';
import {NewEntityModal} from '../components';

class Workouts extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isModalVisible: false
    };

    this.getNameValidationState = this.getNameValidationState.bind(this);
    this.onSubmitNewWorkoutTemplate = this.onSubmitNewWorkoutTemplate.bind(this);
  }

  getNameValidationState(value) {
    const {workoutTemplateNames} = this.props;

    if (!value.length) {
      return;
    }

    return workoutTemplateNames.includes(value) ? 'error' : 'success';
  }

  onSubmitNewWorkoutTemplate(value) {
    const {dispatch} = this.props;

    dispatch(addWorkoutTemplate(value));
    this.setState({isModalVisible: false});
  }

  render() {
    return <Row>
      <Col lg={6} lgOffset={3}>
        <Row>
          <Col md={6}>
            <FormControl
              componentClass="select"
              placeholder="Workout Template"
              className="select-action"
            />
            <Button bsStyle="primary" title="New Workout">
              <span className="glyphicon glyphicon-plus" /> Workout
            </Button>
          </Col>
          <Col md={6} className="text-right">
            <Button
              title="New Workout Template"
              onClick={() => this.setState({isModalVisible: true})}
            >
              <span className="glyphicon glyphicon-plus" /> Template
            </Button>
          </Col>
        </Row>
      </Col>
      <NewEntityModal
        onHide={() => this.setState({isModalVisible: false})}
        onSubmit={this.onSubmitNewWorkoutTemplate}
        show={this.state.isModalVisible}
        title="Add New Workout Template"
        getValidationState={this.getNameValidationState}
      />
    </Row>;
  }
}

function mapStateToProps(state) {
  return {
    workoutTemplateNames: Object.keys(state.workoutTemplate)
  };
}

export default connect(mapStateToProps)(Workouts);
