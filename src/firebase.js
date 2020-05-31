import firebase from 'firebase/app';
import 'firebase/app';
import 'firebase/database';
import 'firebase/auth';
import 'firebase/storage';


const firebaseConfig = {
    apiKey: "AIzaSyCtm5zS8qL75kkRzAt5TemooQx_-6yPU2Q",
    authDomain: "mancity-ff94c.firebaseapp.com",
    databaseURL: "https://mancity-ff94c.firebaseio.com",
    projectId: "mancity-ff94c",
    storageBucket: "mancity-ff94c.appspot.com",
    messagingSenderId: "476234550633",
    appId: "1:476234550633:web:82da0d1af7b64c1a7bc1f8",
    measurementId: "G-PSWV982RXL"
  };

  firebase.initializeApp(firebaseConfig);

  const firebaseDB = firebase.database();
  const firebaseMatches = firebaseDB.ref('matches');
  const firebasePromotions = firebaseDB.ref('promotions');
  const firebaseTeams = firebaseDB.ref('teams');
  const firebasePlayers = firebaseDB.ref('players');

export {
    firebase,
    firebaseMatches,
    firebasePromotions,
    firebaseTeams,
    firebasePlayers,
    firebaseDB
}