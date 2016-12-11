import React, {Component, PropTypes} from 'react';
import {Modal} from 'react-bootstrap';

export default class NewExerciseTemplateModal extends Component {
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
        {JSON.stringify(exercises)}
      </Modal.Body>
    </Modal>;
  }
}

NewExerciseTemplateModal.propTypes = {
  onHide: Modal.propTypes.onHide,
  show: Modal.propTypes.show,
  title: PropTypes.string.isRequired,
  exercises: PropTypes.arrayOf(
    PropTypes.shape({
      value: PropTypes.string,
      label: PropTypes.string
    })
  ).isRequired
};
