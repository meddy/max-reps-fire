import {PropTypes} from 'react';

export const rangeShape = PropTypes.shape({
  min: PropTypes.number,
  max: PropTypes.number
});

export const exerciseTemplateShape = PropTypes.shape({
  exercise: PropTypes.string.isRequired,
  order: PropTypes.number.isRequired,
  reps: rangeShape,
  rest: rangeShape,
  sets: rangeShape
});