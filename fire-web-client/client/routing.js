app.config(function ($routeProvider) {
    $routeProvider
        .when('/', {
            controller: 'MainCtrl',
            templateUrl: '/client/views/main.html'
        })
        .otherwise({
            redirectTo: '/'
        });
});