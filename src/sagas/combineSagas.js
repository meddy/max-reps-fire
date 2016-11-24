import watchAuth from './watchAuth';
import watchExercises from './watchExercises';

export default function* combineSagas() {
  return yield [
    watchAuth(),
    watchExercises()
  ];
}
