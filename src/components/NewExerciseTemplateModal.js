import React, {Component, PropTypes} from 'react';
import {Button, ControlLabel, FormGroup, Modal} from 'react-bootstrap';
import Select from 'react-select';
import ExerciseTemplateControl from './ExerciseTemplateControl';

export default class NewExerciseTemplateModal extends Component {
  static propTypes = {
    exerciseOptions: PropTypes.arrayOf(
      PropTypes.shape({
        value: PropTypes.string,
        label: PropTypes.string
      })
    ).isRequired,
    onSubmit: PropTypes.func.isRequired,
    onHide: Modal.propTypes.onHide,
    show: Modal.propTypes.show,
    title: PropTypes.string.isRequired
  };

  initialState = {
    exercise: null,
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
    },
    order: 1
  };

  state = this.initialState;

  onClickSubmit = event => {
    event.preventDefault();

    this.props.onSubmit(this.state);
    this.setState(this.initialState);
  };

  getValidationState = () => this.state.exercise ? 'success' : null;

  render() {
    const {exerciseOptions, onHide, show, title} = this.props;
    const {exercise, reps, sets, rest} = this.state;
    const validationState = this.getValidationState();

    return <Modal show={show} onHide={onHide}>
      <Modal.Header closeButton>
        <Modal.Title>{title}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <FormGroup controlId="exercise">
          <ControlLabel>Exercise</ControlLabel>
          <Select
            name="exercise"
            options={exerciseOptions}
            onChange={option => this.setState({exercise: option ? option.value : null})}
            value={exercise}
          />
        </FormGroup>
        <ExerciseTemplateControl
          label="Reps"
          value={reps}
          onChange={reps => this.setState({reps})}
        />
        <ExerciseTemplateControl
          label="Sets"
          value={sets}
          onChange={sets => this.setState({sets})}
        />
        <ExerciseTemplateControl
          label="Rest (Seconds)"
          value={rest}
          onChange={rest => this.setState({rest})}
        />
      </Modal.Body>
      <Modal.Footer>
        <Button
          bsStyle="success"
          block
          disabled={validationState !== 'success'}
          onClick={this.onClickSubmit}
          type="submit"
        >
          Add
        </Button>
      </Modal.Footer>
    </Modal>;
  }
}
