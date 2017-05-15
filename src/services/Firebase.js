/* @flow */

import * as firebase from 'firebase';  // Initialize Firebase
const fireBaseconfig = {
  apiKey: "AIzaSyDD7-EsdG9pVNV542aQFNodDxsh5kIjAKY",
  authDomain: "bookie-9c968.firebaseapp.com",
  databaseURL: "https://bookie-9c968.firebaseio.com",
  projectId: "bookie-9c968",
  storageBucket: "bookie-9c968.appspot.com",
  messagingSenderId: "604308769712"
};

// firebase.initializeApp(fireBaseconfig);
const firebaseApp = firebase.initializeApp(fireBaseconfig);
export default firebaseApp;
