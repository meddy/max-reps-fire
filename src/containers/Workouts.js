import React, {Component, PropTypes} from 'react';
import {Button, Col, FormControl, Row} from 'react-bootstrap';
import {connect} from 'react-redux';
import {withRouter} from 'react-router';
import {addWorkoutTemplate} from '../actions/creators';
import {getWorkoutTemplateNames} from '../helpers/selectors';
import {NewEntityModal, withModals} from '../components';

class Workouts extends Component {
  onSubmitNewWorkoutTemplate = value => {
    const {dispatch, hideModal, router} = this.props;

    dispatch(addWorkoutTemplate(value));
    hideModal('workoutTemplate');
    router.push(`/workout-template/${value}`);
  };

  getNameValidationState = (value) => {
    const {workoutTemplateNames} = this.props;

    if (!value.length) {
      return;
    }

    return workoutTemplateNames.includes(value) ? 'error' : 'success';
  };

  render() {
    const {hideModal, isModalVisible, showModal} = this.props;

    return <Row>
      <Col lg={8} lgOffset={2}>
        <Row>
          <Col sm={6}>
            <Button
              title="New Workout Template"
              onClick={() => showModal('workoutTemplate')}
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
        onHide={() => hideModal('workoutTemplate')}
        onSubmit={this.onSubmitNewWorkoutTemplate}
        show={isModalVisible('workoutTemplate')}
        title="Add New Workout Template"
        getValidationState={this.getNameValidationState}
      />
    </Row>;
  }
}

Workouts.propTypes = {
  isModalVisible: PropTypes.func.isRequired,
  hideModal: PropTypes.func.isRequired,
  showModal: PropTypes.func.isRequired
};

function mapStateToProps(state) {
  return {
    workoutTemplateNames: getWorkoutTemplateNames(state)
  };
}

const WrappedComponent = withRouter(withModals(Workouts, ['workoutTemplate']));
export default connect(mapStateToProps)(WrappedComponent);
