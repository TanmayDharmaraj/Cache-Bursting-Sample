(function (angular) {
    var app = angular.module('cachebusting', [
        /*
        * Third party libraries
        */
        'ui.router', //routing
        /*
        * Feature modules
        */
        'cachebusting.home', //homepage
        /*
        * Shared components and services
        */
        'cachebusting.data', //data layer (communication with backend)

    ]);


})(window.angular);