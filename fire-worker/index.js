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

            var activeref = firebase.database().ref('currentActive');

            activeref.on("child_added", logActivity);

            activeref.on("child_removed", aggAndPush);

        } else {
            console.log('User is not logged in'.red, user)
        }
    });

var activity = [];
var logActivity = function (snapshot) {
    var changedUserId = snapshot.key;
    console.log('child added', snapshot.key + snapshot.val());

    activity[changedUserId] = [];

    var rideRef = firebase.database().ref('rides/' + changedUserId);

    rideRef.on('child_changed', function (snapshot) {
         activity[changedUserId].push({ dateTime: new Date(), data_val: snapshot.val(), data_key: snapshot.key });

        console.log('data'.green, { dateTime: new Date(), data_val: snapshot.val(), data_key: snapshot.key })

    });

}

var logActivity = function (snapshot)