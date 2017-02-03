import React, {PropTypes} from 'react';
import {Button, ButtonToolbar, Modal} from 'react-bootstrap';

export default function ConfirmModal({onConfirm, onHide, show, title}) {
  return <Modal show={show} onHide={onHide}>
    <Modal.Header closeButton>
      <Modal.Title>{title}</Modal.Title>
    </Modal.Header>
    <Modal.Body>
      <ButtonToolbar>
        <Button bsStyle="danger" onClick={onConfirm} block>OK</Button>
        <Button onClick={onHide} block>Cancel</Button>
      </ButtonToolbar>
    </Modal.Body>
  </Modal>;
}

ConfirmModal.propTypes = {
  onHide: Modal.propTypes.onHide,
  onConfirm: PropTypes.func.isRequired,
  show: Modal.propTypes.show,
  title: PropTypes.string.isRequired
};
