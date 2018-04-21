(function (angular) {
    var app = angular.module('cachebusting');

    app.config(
        [
            '$urlRouterProvider'
            , '$locationProvider'
            , '$httpProvider'
            , function ($urlRouterProvider, $locationProvider, $httpProvider) {
                $urlRouterProvider.otherwise('/home');
                $locationProvider.html5Mode(true);
                $httpProvider.interceptors.push('customHttpInterceptor');
            }]);
})(window.angular);