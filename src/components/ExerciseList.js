import React, {PropTypes} from 'react';
import {Button, Glyphicon, ListGroup, ListGroupItem} from 'react-bootstrap';

export default function ExerciseList({onClickDelete, items}) {
  return <ListGroup>
    {items.map(exercise => {
      return <ListGroupItem key={exercise} className="clearfix">
        <span className="pull-left">{exercise}</span>
        {onClickDelete && <Button
          bsStyle="danger"
          bsSize="xsmall"
          title="Delete Exercises"
          onClick={() => onClickDelete(exercise)}
          className="pull-right"
        >
          <Glyphicon glyph="trash" />
        </Button>}
      </ListGroupItem>;
    })}
  </ListGroup>;
}

ExerciseList.propTypes = {
  items: PropTypes.arrayOf(PropTypes.string).isRequired,
  onClickDelete: PropTypes.func,
};
