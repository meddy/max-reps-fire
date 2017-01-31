import React, {Component, PropTypes} from 'react';
import {Breadcrumb, Button, ButtonGroup, ButtonToolbar, Col, ListGroup, ListGroupItem, Row} from 'react-bootstrap';
import {connect} from 'react-redux';
import {LinkContainer} from 'react-router-bootstrap';
import {addExerciseTemplate, requestExercises, requestExerciseTemplates} from '../actions/creators';
import {LoadingIndicator, NewExerciseTemplateModal, withModals} from '../components';
import {getExerciseOptions, getExerciseTemplates, getWorkoutTemplate} from '../helpers/selectors';
import {exerciseTemplateShape} from '../helpers/shapes';

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
      exerciseTemplates,
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
            <ButtonGroup>
              <Button
                bsStyle="primary"
                title="Add Workout"
                onClick={() => showModal('exerciseTemplate')}
              >
                <span className="glyphicon glyphicon-plus" /> Template
              </Button>
            </ButtonGroup>
          </ButtonToolbar>
        </Col>
      </Row>
      <Row>
        <Col lg={8} lgOffset={2}>
          <ListGroup>
            {exerciseTemplates.map(exerciseTemplate => {
                const {exercise, key, reps, rest, sets} = exerciseTemplate;
                return <ListGroupItem key={key}>
                  <h3>
                    {exercise}
                    &nbsp;
                    <small>
                      {`${reps.min} - ${reps.max}`}
                      <strong>&nbsp;X&nbsp;</strong>
                      {`${sets.min} - ${sets.max}`}
                      <strong>&nbsp;rest&nbsp;</strong>
                      {`${rest.min}' - ${rest.max}'`}
                    </small>
                  </h3>
                </ListGroupItem>;
              }
            )}
          </ListGroup>
        </Col>
      </Row>
      <NewExerciseTemplateModal
        exercises={exercises}
        onSubmit={this.onSubmitNewExerciseTemplate}
        onHide={() => hideModal('exerciseTemplate')}
        show={isModalVisible('exerciseTemplate')}
        title="Add Exercise Template"
      />
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
  exerciseTemplates: PropTypes.arrayOf(exerciseTemplateShape),
  hideModal: PropTypes.func.isRequired,
  isModalVisible: PropTypes.func.isRequired,
  name: PropTypes.string.isRequired,
  showModal: PropTypes.func.isRequired
};

function mapStateToProps(state, props) {
  const {name} = getWorkoutTemplate(state, props);
  return {
    name,
    exercises: getExerciseOptions(state),
    exerciseTemplates: getExerciseTemplates(state, name)
  };
}

export default connect(mapStateToProps)(withModals(WorkoutTemplateEdit, ['exerciseTemplate']));
