// @flow

import actionTypes from './actionTypes';

type Action = {
  types: $Keys<typeof actionTypes>
};

type ItemAction = Action & {
  key: string
};

type AddExerciseAction = Action & {
  key: string,
  value: string
};

type Range = {
  min: number,
  max: number
};

type ExerciseTemplate = {
  exercise: string,
  order: number,
  reps: Range,
  rest: Range,
  sets: Range
};

type AddExerciseTemplateAction = Action & {
  key: string,
  value: ExerciseTemplate,
};
