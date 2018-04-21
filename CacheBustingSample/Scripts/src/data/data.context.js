(function () {
    'use strict';

    angular
        .module('cachebusting.data')
        .factory('dataContext', datacontext);

    datacontext.$inject = ['$injector', '$log'];

    function datacontext($injector, $log) {
        var repoNames = ['todo'];
        var service = {};

        init();

        return service;

        function init() {
            $log.info("initializing lazy loaded repos");
            defineLazyLoadedRepos();
        }

        // Add ES5 property to datacontext for each named repo
        function defineLazyLoadedRepos() {
            repoNames.forEach(function (name) {
                Object.defineProperty(service, name, {
                    configurable: true, // will redefine this property once
                    get: function () {
                        // The 1st time the repo is request via this property,
                        // we ask the repositories for it (which will inject it).
                        var repo = getRepo(name);
                        // Rewrite this property to always return this repo;
                        // no longer redefinable
                        Object.defineProperty(service, name, {
                            value: repo,
                            configurable: false,
                            enumerable: true
                        });
                        return repo;
                    }
                });
            });
        }

        // Get named Repository Ctor (by injection), new it, and initialize it
        function getRepo(repoName) {
            var fullRepoName = repoName.toLowerCase() + '.repository';
            var factory = $injector.get(fullRepoName);
            return factory;
        }
    }
})();
