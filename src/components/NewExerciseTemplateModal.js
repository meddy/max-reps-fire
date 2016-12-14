import React, {Component, PropTypes} from 'react';
import {Button, ControlLabel, FormGroup, Modal} from 'react-bootstrap';
import Select from 'react-select';
import ExerciseTemplateControl from './ExerciseTemplateControl';

export default class NewExerciseTemplateModal extends Component {
  state = {
    exercise: '',
    reps: {
      min: '',
      max: ''
    },
    sets: {
      min: '',
      max: ''
    },
    rest: {
      min: '',
      max: ''
    }
  };

  render() {
    const {exercises, onHide, show, title} = this.props;

    return <Modal
      show={show}
      onHide={onHide}
    >
      <Modal.Header closeButton>
        <Modal.Title>{title}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <FormGroup controlId="exercise">
          <ControlLabel>Exercise</ControlLabel>
          <Select
            name="exercise"
            options={exercises}
            onChange={exercise => this.setState({exercise})}
            value={this.state.exercise}
          />
        </FormGroup>
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
          label="Rest"
          value={this.state.rest}
          onChange={rest => this.setState({rest})}
        />
        <Button
          type="submit"
          bsStyle="success"
          onClick={this.onClickSubmit}
          block
        >
          Add
        </Button>
      </Modal.Body>
    </Modal>;
  }
}

NewExerciseTemplateModal.propTypes = {
  exercises: PropTypes.arrayOf(
    PropTypes.shape({
      value: PropTypes.string,
      label: PropTypes.string
    })
  ).isRequired,
  onClickSubmit: PropTypes.func,
  onHide: Modal.propTypes.onHide,
  show: Modal.propTypes.show,
  title: PropTypes.string.isRequired,

};
