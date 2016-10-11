//chart page
app.controller('MainCtrl', function ($scope, $firebaseAuth, $firebaseArray) {
    var config = {
        apiKey: "AIzaSyDc1JrMHS1EvfQtHyAMhzQ91zI9Z4trUBY",
        authDomain: "fir-6ecce.firebaseapp.com",
        databaseURL: "https://fir-6ecce.firebaseio.com",
        storageBucket: "fir-6ecce.appspot.com",
        messagingSenderId: "910621862628"
    };
    firebase.initializeApp(config);

    var ref = firebase.database();
    // create an instance of the authentication service
    $scope.auth = $firebaseAuth();

    $scope.currentData = {};
    $scope.auth.$onAuthStateChanged(function (firebaseUser) {
        if (firebaseUser) {
            console.log('auth changed', firebaseUser)
            userId = firebaseUser.uid;
            $scope.authData = firebaseUser;
            $scope.allData = $firebaseArray(ref.ref('rides/' + userId + '/1'));
        }
    });


    $scope.loginOrCreateUser = function () {
        var authInfo = {
            email: $scope.email,
            password: $scope.password
        };
        $scope.message = null;
        $scope.error = null;
        $scope.auth.$signInWithEmailAndPassword($scope.email, $scope.password)
            .then(function (authData) {
                console.log("Logged in as:", authData.uid);
            })
            .catch(function (error) {
                console.log("Authentication failed:", error);
                return $scope.auth.$createUserWithEmailAndPassword($scope.email, $scope.password);
            })
            .then(function (userData) {
                //$scope.message = "User auth with uid: " + ;
            })
            .catch(function (error) {
                $scope.error = error;
            });;
    }
});