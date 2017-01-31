import React, {Component, PropTypes} from 'react';
import {Breadcrumb, Button, ButtonToolbar, Col, Row} from 'react-bootstrap';
import {connect} from 'react-redux';
import {LinkContainer} from 'react-router-bootstrap';
import {addExerciseTemplate, requestExercises, requestExerciseTemplates} from '../actions/creators';
import {LoadingIndicator, NewExerciseTemplateModal, withModals} from '../components';
import {getSelectExercises, getWorkoutTemplate} from '../helpers/selectors';

class WorkoutTemplateEdit extends Component {
  componentDidMount() {
    const {dispatch, name} = this.props;
    dispatch(requestExercises());
    dispatch(requestExerciseTemplates(name));
  }

  onSubmitNewExerciseTemplate = value => {
    const {dispatch, hideModal} = this.props;

    dispatch(addExerciseTemplate(value));
    hideModal('exerciseTemplate');
  };

  render() {
    const {
      exercises,
      hideModal,
      isModalVisible,
      name,
      showModal
    } = this.props;

    return <LoadingIndicator loading={!exercises.length}>
      <Row>
        <Col lg={8} lgOffset={2}>
          <Breadcrumb>
            <LinkContainer to={`/workout-template/${name}`}>
              <Breadcrumb.Item active>{name}</Breadcrumb.Item>
            </LinkContainer>
            <Breadcrumb.Item active>Exercise Templates</Breadcrumb.Item>
          </Breadcrumb>
          <ButtonToolbar>
            <Button
              bsStyle="primary"
              title="Add Workout"
              onClick={() => showModal('exerciseTemplate')}
            >
              <span className="glyphicon glyphicon-plus" /> Template
            </Button>
          </ButtonToolbar>
        </Col>
        <NewExerciseTemplateModal
          exercises={exercises}
          onSubmit={this.onSubmitNewExerciseTemplate}
          onHide={() => hideModal('exerciseTemplate')}
          show={isModalVisible('exerciseTemplate')}
          title="Add Exercise Template"
        />
      </Row>
    </LoadingIndicator>;
  }
}

WorkoutTemplateEdit.propTypes = {
  exercises: PropTypes.arrayOf(
    PropTypes.shape({
      value: PropTypes.string,
      label: PropTypes.string
    })
  ).isRequired,
  hideModal: PropTypes.func.isRequired,
  isModalVisible: PropTypes.func.isRequired,
  name: PropTypes.string.isRequired,
  showModal: PropTypes.func.isRequired
};

function mapStateToProps(state, props) {
  return {
    name: getWorkoutTemplate(state, props).name,
    exercises: getSelectExercises(state)
  };
}

export default connect(mapStateToProps)(withModals(WorkoutTemplateEdit, ['exerciseTemplate']));
