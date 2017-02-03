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
import {LinkContainer} from 'react-router-bootstrap';
import {addExerciseTemplate, requestExercises, requestExerciseTemplates} from '../actions/creators';
import {EditExerciseTemplateModal, LoadingIndicator, NewExerciseTemplateModal, withModals} from '../components';
import {getExerciseOptions, getExerciseTemplates, getWorkoutTemplate} from '../helpers/selectors';
import {exerciseTemplateShape} from '../helpers/shapes';

class WorkoutTemplateEdit extends Component {
  state = {
    exerciseTemplate: null
  };

  componentDidMount() {
    const {dispatch, name} = this.props;
    dispatch(requestExercises());
    dispatch(requestExerciseTemplates(name));
  }

  onSubmitUpdateExerciseTemplate = () => {

  };

  onSubmitNewExerciseTemplate = value => {
    const {dispatch, hideModal} = this.props;

    dispatch(addExerciseTemplate(value));
    hideModal('create');
  };

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
      name,
      showModal
    } = this.props;

    return <LoadingIndicator loading={!exerciseOptions.length}>
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
      {this.state.exerciseTemplate && <EditExerciseTemplateModal
        exerciseTemplate={this.state.exerciseTemplate}
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

WorkoutTemplateEdit.propTypes = {
  exerciseOptions: PropTypes.arrayOf(
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
    exerciseOptions: getExerciseOptions(state),
    exerciseTemplates: getExerciseTemplates(state, name)
  };
}

export default connect(mapStateToProps)(withModals(WorkoutTemplateEdit, ['new', 'edit']));
