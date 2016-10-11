var firebase = require("firebase");
var Promise = require('promise');
var colors = require('colors');

var config = {
    apiKey: "AIzaSyDc1JrMHS1EvfQtHyAMhzQ91zI9Z4trUBY",
    authDomain: "fir-6ecce.firebaseapp.com",
    databaseURL: "https://fir-6ecce.firebaseio.com",
    storageBucket: "fir-6ecce.appspot.com",
    messagingSenderId: "910621862628"
};
firebase.initializeApp(config);

// Get a reference to the database service
var database = firebase.database();

var name = 'jeff klassen',
    email = 'j.kl@ssen.org',
    password = 'COBI.bike1';

firebase
    .auth()
    .signInWithEmailAndPassword(email, password)
    .catch(function (signInError) {

        // Handle Errors here.
        var errorCode = signInError.code;
        var errorMessage = signInError.message;
        console.log('signInError', signInError);
        // ...

        firebase
            .auth()
            .createUserWithEmailAndPassword(email, password)
            .catch(function (userCreateError) {
                var errorCode = userCreateError.code;
                var errorMessage = userCreateError.message;
                console.log('userCreateError', userCreateError);

                //if creating the user failed


            });
    });
var userid;
firebase
    .auth()
    .onAuthStateChanged(function (user) {
        userid = user.uid;

        if (user) {
            user.providerData.forEach(function (profile) {
                console.log('profile', profile);
                console.log('userid', userid);

            });

            firebase.database().ref('currentActive/' + userid).set(true);


            // ref.set({ datetime: datetime, speed: 10 });
            var dist = 0;
            setInterval(function () {
                dist = dist + 1.6;

                firebase.database().ref('rides/' + userid).set({lat: 1, lon: -6, speed: 8, accDist: dist, cad: Math.random() * (100-0)});
            }, 1000);

        } else {
            console.log('User is not logged in'.red, user)
        }
    });

process.on('SIGINT', (code) => {
  firebase.database().ref('currentActive/' + userid).set(null);

  process.exit();
});