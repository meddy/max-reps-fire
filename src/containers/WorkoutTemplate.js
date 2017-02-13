import React, {Component, PropTypes} from 'react';
import {Breadcrumb, Button, ButtonGroup, ButtonToolbar, Col, Glyphicon, Row} from 'react-bootstrap';
import {connect} from 'react-redux';
import {withRouter} from 'react-router';
import {LinkContainer} from 'react-router-bootstrap';
import {ConfirmModal, withModals} from '../components';
import {removeWorkoutTemplate} from '../actions/creators';
import {getWorkoutTemplate} from '../helpers/selectors';

class WorkoutTemplate extends Component {
  removeOnUnmount = false;

  onConfirmDeleteWorkoutTemplate = () => {
    this.props.router.replace('/workouts');
    this.removeOnUnmount = true;
  };

  componentWillUnmount() {
    const {dispatch, workoutTemplate} = this.props;

    if (this.removeOnUnmount) {
      dispatch(removeWorkoutTemplate(workoutTemplate));
    }
  }

  render() {
    const {hideModal, isModalVisible, showModal, workoutTemplate} = this.props;

    return <Row>
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
            <LinkContainer to={`/workout-template/${workoutTemplate}/edit`}>
              <Button title="Edit Workout Template">
                <Glyphicon glyph="edit" /> Template
              </Button>
            </LinkContainer>
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
    </Row>;
  }
}

WorkoutTemplate.propTypes = {
  isModalVisible: PropTypes.func.isRequired,
  hideModal: PropTypes.func.isRequired,
  showModal: PropTypes.func.isRequired,
  workoutTemplate: PropTypes.string.isRequired
};

function mapStateToProps(state, props) {
  return {
    workoutTemplate: getWorkoutTemplate(state, props)
  };
}

const WrappedComponent = withRouter(withModals(WorkoutTemplate, ['workoutTemplate']));
export default connect(mapStateToProps)(WrappedComponent);
