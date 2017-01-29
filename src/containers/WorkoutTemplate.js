import React, {Component, PropTypes} from 'react';
import {Breadcrumb, Button, ButtonGroup, ButtonToolbar, Col, Row} from 'react-bootstrap';
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
    const {name, dispatch} = this.props;

    if (this.removeOnUnmount) {
      dispatch(removeWorkoutTemplate(name));
    }
  }

  render() {
    const {hideModal, isModalVisible, name, showModal} = this.props;

    return <Row>
      <Col lg={8} lgOffset={2}>
        <Breadcrumb>
          <Breadcrumb.Item active>{name}</Breadcrumb.Item>
        </Breadcrumb>
        <ButtonToolbar>
          <ButtonGroup>
            <Button bsStyle="primary" title="Add Workout">
              <span className="glyphicon glyphicon-plus" /> Workout
            </Button>
          </ButtonGroup>
          <ButtonGroup>
            <LinkContainer to={`/workout-template/${name}/edit`}>
              <Button title="Edit Workout Template">
                <span className="glyphicon glyphicon-edit" /> Template
              </Button>
            </LinkContainer>
            <Button
              bsStyle="danger"
              title="Delete Workout Template"
              onClick={() => showModal('workoutTemplate')}
            >
              <span className="glyphicon glyphicon-trash" /> Template
            </Button>
          </ButtonGroup>
        </ButtonToolbar>
      </Col>
      <ConfirmModal
        onHide={() => hideModal('workoutTemplate')}
        onConfirm={this.onConfirmDeleteWorkoutTemplate}
        show={isModalVisible('workoutTemplate')}
        title={`Delete ${name}?`}
      />
    </Row>;
  }
}

WorkoutTemplate.propTypes = {
  name: PropTypes.string.isRequired,
  isModalVisible: PropTypes.func.isRequired,
  hideModal: PropTypes.func.isRequired,
  showModal: PropTypes.func.isRequired
};

function mapStateToProps(state, props) {
  return {
    name: getWorkoutTemplate(state, props).name
  };
}

const WrappedComponent = withRouter(withModals(WorkoutTemplate, ['workoutTemplate']));
export default connect(mapStateToProps)(WrappedComponent);
