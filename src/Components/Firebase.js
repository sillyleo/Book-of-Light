// import firebase from 'firebase';
import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/firestore';
/******************
 * FIREBASE STUFF *
 ******************/

const config = {
  apiKey: "AIzaSyAU1PIBhz33ipRBnxPRcbbfXoy894YKzmI",
  authDomain: "firebible-expo.firebaseapp.com",
  databaseURL: "https://firebible-expo.firebaseio.com",
  projectId: "firebible-expo",
  storageBucket: "firebible-expo.appspot.com",
  messagingSenderId: "111259592204"
};

firebase.initializeApp(config);

// Initialize Cloud Firestore through Firebase
export const db = firebase.firestore();
export const dbe = firebase.firestore;

// Disable deprecated features
db.settings({timestampsInSnapshots: true});

firebase
  .firestore()
  .enablePersistence({experimentalTabSynchronization: true})
  .then()
  .catch(function (err) {
    if (err.code === 'failed-precondition') {
      // Multiple tabs open, persistence can only be enabled in one tab at a a time.
      // ...
    } else if (err.code === 'unimplemented') {
      // The current browser does not support all of the features required to enable
      // persistence ...
    }
  });

export default firebase;
export const provider = new firebase
  .auth
  .FacebookAuthProvider();
export const auth = firebase.auth();
