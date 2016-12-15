import React, {Component, PropTypes} from 'react';
import {Button, ControlLabel, FormGroup, Modal} from 'react-bootstrap';
import Select from 'react-select';
import ExerciseTemplateControl from './ExerciseTemplateControl';

export default class NewExerciseTemplateModal extends Component {
  initialState = {
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

  constructor(props) {
    super(props);
    this.state = {...this.initialState};
  }

  onClickSubmit = event => {
    const {onSubmit} = this.props;

    event.preventDefault();
    console.log(this.state);
    onSubmit(this.state);
    this.setState(this.initialState);
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
            // need to probably change this to have value/label
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
  onSubmit: PropTypes.func.isRequired,
  onHide: Modal.propTypes.onHide,
  show: Modal.propTypes.show,
  title: PropTypes.string.isRequired,
};
