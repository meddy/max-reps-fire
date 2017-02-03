import React, {Component, PropTypes} from 'react';
import {Button, ControlLabel, FormGroup, Modal} from 'react-bootstrap';
import Select from 'react-select';
import ExerciseTemplateControl from './ExerciseTemplateControl';

export default class NewExerciseTemplateModal extends Component {
  initialState = {
    exercise: '',
    reps: {
      min: 0,
      max: 0
    },
    sets: {
      min: 0,
      max: 0
    },
    rest: {
      min: 0,
      max: 0
    }
  };

  state = this.initialState;

  onClickSubmit = event => {
    event.preventDefault();

    const {onSubmit} = this.props;
    onSubmit(this.state);
    this.setState(this.initialState);
  };

  getValidationState = () => this.state.exercise ? null : 'error';

  render() {
    const {exerciseOptions, onHide, show, title} = this.props;
    const validationState = this.getValidationState();

    return <Modal show={show} onHide={onHide}>
      <Modal.Header closeButton>
        <Modal.Title>{title}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <FormGroup controlId="exercise" validationState={validationState}>
          <ControlLabel>Exercise</ControlLabel>
          <Select
            name="exercise"
            options={exerciseOptions}
            onChange={option => this.setState({exercise: option.value})}
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
          label="Rest (Seconds)"
          value={this.state.rest}
          onChange={rest => this.setState({rest})}
        />
      </Modal.Body>
      <Modal.Footer>
        <Button
          bsStyle="success"
          block
          disabled={validationState === 'error'}
          onClick={this.onClickSubmit}
          type="submit"
        >
          Add
        </Button>
      </Modal.Footer>
    </Modal>;
  }
}

NewExerciseTemplateModal.propTypes = {
  exerciseOptions: PropTypes.arrayOf(
    PropTypes.shape({
      value: PropTypes.string,
      label: PropTypes.string
    })
  ).isRequired,
  onSubmit: PropTypes.func.isRequired,
  onHide: Modal.propTypes.onHide,
  show: Modal.propTypes.show,
  title: PropTypes.string.isRequired,
};
