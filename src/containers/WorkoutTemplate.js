import React, {Component, PropTypes} from 'react';
import {Breadcrumb, Button, ButtonGroup, ButtonToolbar, Col, Glyphicon, Row} from 'react-bootstrap';
import {connect} from 'react-redux';
import {push, replace} from 'redux-little-router';
import {removeWorkoutTemplate} from '../actions';
import {ConfirmModal, LoadingIndicator, withModals} from '../components';
import {getWorkoutTemplate} from '../helpers/selectors';
import {createPathname, WORKOUT_LIST, WORKOUT_TEMPLATE_EDIT} from '../routes';

class WorkoutTemplate extends Component {
  static propTypes = {
    isModalVisible: PropTypes.func.isRequired,
    hideModal: PropTypes.func.isRequired,
    showModal: PropTypes.func.isRequired,
    workoutTemplate: PropTypes.string
  };

  static mapStateToProps(state) {
    return {
      workoutTemplate: getWorkoutTemplate(state)
    };
  }

  removeOnUnmount = false;

  onConfirmDeleteWorkoutTemplate = () => {
    this.props.dispatch(replace(WORKOUT_LIST));
    this.removeOnUnmount = true;
  };

  componentWillUnmount() {
    const {dispatch, workoutTemplate} = this.props;

    if (this.removeOnUnmount) {
      dispatch(removeWorkoutTemplate(workoutTemplate));
    }
  }

  render() {
    const {dispatch, hideModal, isModalVisible, showModal, workoutTemplate} = this.props;
    const editPathname = createPathname(WORKOUT_TEMPLATE_EDIT, {workoutTemplate});

    return <LoadingIndicator loading={!workoutTemplate}>
      <Row>
        <Col lg={8} lgOffset={2}>
          <Breadcrumb>
            <Breadcrumb.Item active>{workoutTemplate}</Breadcrumb.Item>
          </Breadcrumb>
          <ButtonToolbar>
            <ButtonGroup>
              <Button bsStyle="primary" title="Add Workout">
                <Glyphicon glyph="plus" /> Workout
              </Button>
            </ButtonGroup>
            <ButtonGroup>
              <Button
                title="Edit Workout Template"
                onClick={() => dispatch(push(editPathname))}
              >
                <Glyphicon glyph="edit" /> Template
              </Button>
              <Button
                bsStyle="danger"
                title="Delete Workout Template"
                onClick={() => showModal('workoutTemplate')}
              >
                <Glyphicon glyph="trash" /> Template
              </Button>
            </ButtonGroup>
          </ButtonToolbar>
        </Col>
        <ConfirmModal
          onHide={() => hideModal('workoutTemplate')}
          onConfirm={this.onConfirmDeleteWorkoutTemplate}
          show={isModalVisible('workoutTemplate')}
          title={`Delete ${workoutTemplate}?`}
        />
      </Row>
    </LoadingIndicator>;
  }
}

WorkoutTemplate.propTypes = {
  isModalVisible: PropTypes.func.isRequired,
  hideModal: PropTypes.func.isRequired,
  showModal: PropTypes.func.isRequired,
  workoutTemplate: PropTypes.string
};

const WorkoutTemplateWithModals = withModals(WorkoutTemplate, ['workoutTemplate']);
export default connect(WorkoutTemplate.mapStateToProps)(WorkoutTemplateWithModals);
