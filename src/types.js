type Action = {
  type: string
};

type AddExerciseAction = {
  type: ADD_EXERCISE,
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
