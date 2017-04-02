import {omit} from 'lodash/fp';
import React, {Component, PropTypes} from 'react';
import {Button, Modal} from 'react-bootstrap';
import ExerciseTemplateControl from './ExerciseTemplateControl';
import {exerciseTemplateShape} from '../helpers/shapes';

export default class EditExerciseTemplateModal extends Component {
  static propTypes = {
    exerciseTemplate: exerciseTemplateShape,
    onSubmit: PropTypes.func.isRequired,
    onHide: Modal.propTypes.onHide,
    show: Modal.propTypes.show
  };

  constructor(props) {
    super(props);
    this.state = {
      ...omit(['exercise'], props.exerciseTemplate)
    };
  }

  render() {
    const {exerciseTemplate, onHide, onSubmit, show} = this.props;

    return <Modal show={show} onHide={onHide}>
      <Modal.Header closeButton>
        <Modal.Title>Edit {exerciseTemplate.exercise}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <ExerciseTemplateControl
          label="Reps"
          value={this.state.reps}
          onChange={reps => this.setState({reps})}
        />
        <ExerciseTemplateControl
          label="Sets"
          value={this.state.sets}
          onChange={sets => this.setState({sets})}
        />
        <ExerciseTemplateControl
          label="Rest (Seconds)"
          value={this.state.rest}
          onChange={rest => this.setState({rest})}
        />
      </Modal.Body>
      <Modal.Footer>
        <Button
          type="submit"
          bsStyle="success"
          onClick={onSubmit}
          block
        >
          Update
        </Button>
      </Modal.Footer>
    </Modal>;
  }
}
