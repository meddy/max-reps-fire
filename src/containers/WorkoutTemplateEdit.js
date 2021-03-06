import React, {Component, PropTypes} from 'react';
import {
  Breadcrumb,
  Button,
  ButtonGroup,
  ButtonToolbar,
  Col,
  Glyphicon,
  Label,
  ListGroup,
  ListGroupItem,
  Row
} from 'react-bootstrap';
import {connect} from 'react-redux';
import {Link} from 'redux-little-router';
import {addExerciseTemplate, requestExercises, requestExerciseTemplates} from '../actions';
import {EditExerciseTemplateModal, LoadingIndicator, NewExerciseTemplateModal, withModals} from '../components';
import {getExerciseOptions, getExerciseTemplates, getWorkoutTemplate} from '../helpers/selectors';
import {exerciseTemplateShape} from '../helpers/shapes';
import {createPathname, WORKOUT_TEMPLATE_VIEW} from '../routes';

class WorkoutTemplateEdit extends Component {
  static propTypes = {
    exerciseOptions: PropTypes.arrayOf(
      PropTypes.shape({
        value: PropTypes.string,
        label: PropTypes.string
      })
    ).isRequired,
    exerciseTemplates: PropTypes.arrayOf(exerciseTemplateShape),
    hideModal: PropTypes.func.isRequired,
    isModalVisible: PropTypes.func.isRequired,
    showModal: PropTypes.func.isRequired,
    workoutTemplate: PropTypes.string
  };

  static mapStateToProps(state) {
    const workoutTemplate = getWorkoutTemplate(state);
    return {
      exerciseOptions: getExerciseOptions(state),
      exerciseTemplates: getExerciseTemplates(state, workoutTemplate),
      workoutTemplate
    };
  }

  state = {
    exerciseTemplate: null
  };

  // TODO: Need to migrate this to saga
  componentDidMount() {
    const {dispatch, name} = this.props;
    dispatch(requestExercises());
    dispatch(requestExerciseTemplates(name));
  }

  // TODO: Implement
  onSubmitUpdateExerciseTemplate = () => {};

  onSubmitNewExerciseTemplate = exerciseTemplate => {
    const {dispatch, hideModal, workoutTemplate} = this.props;

    dispatch(addExerciseTemplate(workoutTemplate, exerciseTemplate));

    hideModal('new');
  };

  // TODO: Implement
  onDeleteExerciseTemplate = () => {};

  renderExerciseTemplate = exerciseTemplate => {
    const {exercise, key, reps, rest, sets} = exerciseTemplate;
    return <ListGroupItem key={key}>
      <div className="clearfix">
        <h4 className="pull-left">{exercise}</h4>
        <ButtonGroup className="pull-right">
          <Button onClick={() => {
            this.setState({exerciseTemplate});
            this.props.showModal('edit');
          }}>
            <Glyphicon glyph="edit" />
          </Button>
          <Button bsStyle="danger">
            <Glyphicon glyph="trash" />
          </Button>
        </ButtonGroup>

      </div>
      <ul className="list-inline">
        <li>
          <Label>Reps</Label>
          <code>{`${reps.min} - ${reps.max}`}</code>
        </li>
        <li>
          <Label>Sets</Label>
          <code>{`${sets.min} - ${sets.max}`}</code>
        </li>
        <li>
          <Label>Rest</Label>
          <code>{`${rest.min}' - ${rest.max}'`}</code>
        </li>
      </ul>
    </ListGroupItem>;
  };

  render() {
    const {
      exerciseOptions,
      exerciseTemplates,
      hideModal,
      isModalVisible,
      showModal,
      workoutTemplate
    } = this.props;
    const {exerciseTemplate} = this.state;
    const viewPath = createPathname(WORKOUT_TEMPLATE_VIEW, {workoutTemplate});

    return <LoadingIndicator loading={!exerciseOptions.length}>
      <Row>
        <Col lg={8} lgOffset={2}>
          <Breadcrumb>
            <Breadcrumb.Item active>
              <Link href={viewPath}>{workoutTemplate}</Link>
            </Breadcrumb.Item>
            <Breadcrumb.Item active>Exercise Templates</Breadcrumb.Item>
          </Breadcrumb>
          <ButtonToolbar>
            <ButtonGroup>
              <Button
                bsStyle="primary"
                title="Add Workout"
                onClick={() => showModal('new')}
              >
                <Glyphicon glyph="plus" /> Template
              </Button>
            </ButtonGroup>
          </ButtonToolbar>
        </Col>
      </Row>
      <Row>
        <Col lg={8} lgOffset={2}>
          <ListGroup>
            {exerciseTemplates.map(this.renderExerciseTemplate)}
          </ListGroup>
        </Col>
      </Row>
      {exerciseTemplate && <EditExerciseTemplateModal
        exerciseTemplate={exerciseTemplate}
        onSubmit={this.onSubmitUpdateExerciseTemplate}
        onHide={() => hideModal('edit')}
        show={isModalVisible('edit')}
      />}
      <NewExerciseTemplateModal
        exerciseOptions={exerciseOptions}
        onHide={() => hideModal('new')}
        onSubmit={this.onSubmitNewExerciseTemplate}
        title="New Exercise Template"
        show={isModalVisible('new')}
      />
    </LoadingIndicator>;
  }
}

const WorkoutTemplateEditWithModals = withModals(WorkoutTemplateEdit, ['new', 'edit']);
export default connect(WorkoutTemplateEdit.mapStateToProps)(WorkoutTemplateEditWithModals);
