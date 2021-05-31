import React from "react";
import { Provider } from "react-redux";
import { createStore, applyMiddleware } from "redux";
import reduxThunk from "redux-thunk";
import logger from "redux-logger";
import reducers from "reducers";
import firebase from "firebase/app";
import "firebase/app";
import "firebase/auth";
import "firebase/firestore";

// Configure firebase and react-redux-firebase
const firebaseConfig = {
  apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
  authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID,
  storageBucket: process.env.REACT_APP_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.REACT_APP_FIREBASE_SENDER_ID,
};

// Initialize firebase instance
firebase.initializeApp(firebaseConfig);

const middleware = applyMiddleware(reduxThunk, logger);

export default ({ children, initialState = {} }) => {
  const store = createStore(reducers, initialState, middleware);
  return <Provider store={store}>{children}</Provider>;
};
