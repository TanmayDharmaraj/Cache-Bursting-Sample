(function () {
    'use strict';

    angular
      .module('cachebusting.data')
      .factory('todo.repository', TodoRepository);

    TodoRepository.$inject = ['abstract.repository', '$q', '$filter'];

    function TodoRepository(AbstractRepository, $q, $filter) {
        var base = new AbstractRepository('todo');
        var getListPromise = null;

        var repository = {
            getTodos: getTodos
        };

        return repository;

        function getTodos(top, skip, search) {
            var apiUrl = "todo";
            var params = {
                top: top,
                skip: skip
            };

            if (search !== undefined) {
                params.search = search;
            }
            return base.getCustomEndpoint(apiUrl, params);
        }
    }
})();
