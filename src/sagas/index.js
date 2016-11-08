import signInFlow from './signInFlow';

export default function* rootSaga() {
  yield [
    signInFlow()
  ]
}
