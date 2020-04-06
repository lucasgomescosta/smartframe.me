import firebase from 'firebase'
import  'firebase/firestore'
import 'firebase/auth'

const firebaseConfig = {
  apiKey: "AIzaSyDO5pL5HKjXe30mua4bDZWepBPN9nUmXIE",
  authDomain: "smartframe-one.firebaseapp.com",
  databaseURL: "https://smartframe-one.firebaseio.com",
  projectId: "smartframe-one",
  storageBucket: "smartframe-one.appspot.com",
  messagingSenderId: "372789499441",
  appId: "1:372789499441:web:686da8d461d2a08d966710"
};

firebase.initializeApp(firebaseConfig)

export default firebase