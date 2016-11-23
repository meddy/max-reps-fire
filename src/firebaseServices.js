import firebase from 'firebase';

const app = firebase.initializeApp({
  apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
  authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN,
  databaseURL: process.env.REACT_APP_FIREBASE_DATABASE_URL,
});
const db = app.database();
const auth = app.auth();
const authProvider = new firebase.auth.GoogleAuthProvider();

export {
  app,
  db,
  auth,
  authProvider
};
