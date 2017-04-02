import {PropTypes} from 'react';

export const rangeShape = PropTypes.shape({
  min: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  max: PropTypes.oneOfType([PropTypes.number, PropTypes.string])
});

export const exerciseTemplateShape = PropTypes.shape({
  exercise: PropTypes.string.isRequired,
  order: PropTypes.number.isRequired,
  reps: rangeShape,
  rest: rangeShape,
  sets: rangeShape
});
