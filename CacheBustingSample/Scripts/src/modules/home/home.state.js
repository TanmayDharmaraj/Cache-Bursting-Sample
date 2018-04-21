(function (angular) {
    var app = angular.module('cachebusting.home');

    app.config(appConfig);

    appConfig.$inject = ['$stateProvider', '$urlRouterProvider'];

    function appConfig($stateProvider, $urlRouterProvider) {
        var states = getHomeStates();
        states.forEach(function (state) {
            $stateProvider.state(state);
        });

    }

    function getHomeStates() {
        return [
          {
              name: 'home',
              url: '/home',
              component: 'home',
          }
        ]
    }

})(window.angular);