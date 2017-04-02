import firebase from 'firebase';

let app;

export default function createFirebase() {
  app = firebase.initializeApp({
    apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
    authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN,
    databaseURL: process.env.REACT_APP_FIREBASE_DATABASE_URL,
  });
}

export function getServices() {
  if (!app) {
    throw new Error('Firebase has not been initialized.');
  }

  return {
    db: app.database(),
    auth: app.auth(),
    authProvider: new firebase.auth.GoogleAuthProvider()
  };
}
