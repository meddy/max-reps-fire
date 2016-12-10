import React, {PropTypes} from 'react';
import {Button, ListGroup, ListGroupItem} from 'react-bootstrap';

export default function ExerciseList(props) {
  const {onClickDelete, items} = props;
  return <ListGroup>
    {items.map(exercise => {
      return <ListGroupItem key={exercise} className="clearfix">
        <span className="pull-left">{exercise}</span>
        {onClickDelete && <Button
          bsStyle="danger"
          bsSize="xsmall"
          title="Delete Exercises"
          onClick={() => props.onClickDelete(exercise)}
          className="pull-right"
        >
          <span className="glyphicon glyphicon-trash" />
        </Button>}
      </ListGroupItem>;
    })}
  </ListGroup>;
}

ExerciseList.propTypes = {
  items: PropTypes.arrayOf(PropTypes.string).isRequired,
  onClickDelete: PropTypes.func,
};
