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

firebase
    .auth()
    .onAuthStateChanged(function (user) {
        var userid = user.uid;
        if (user) {
            user.providerData.forEach(function (profile) {
                console.log('profile', profile);
                console.log('userid', userid);

            });

            var ref = firebase.database().ref('rides/' + userid + '/1');

            setInterval(function () {
                console.log('entering interval')
                var currentdate = new Date();
                var datetime = currentdate.getDate() + "/"
                    + (currentdate.getMonth() + 1) + "/"
                    + currentdate.getFullYear() + " @ "
                    + currentdate.getHours() + ":"
                    + currentdate.getMinutes() + ":"
                    + currentdate.getSeconds();
                console.log(datetime);



                ref.push({ datetime: datetime, speed: 10 });
            }, 1000);


        } else {
            console.log('User is not logged in'.red, user)
        }
    });

