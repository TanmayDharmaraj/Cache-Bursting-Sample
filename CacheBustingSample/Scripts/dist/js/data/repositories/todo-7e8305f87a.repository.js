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
            addTodo: addTodo,
            getTodos: getTodos,
            removeTodo: removeTodo
        };

        return repository;

        function addTodo(todo) {
            var apiUri = "todo";
            var params = { todo: todo}
            return base.insertCustomEndpoint(apiUri, params);
        }

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

        function removeTodo(data) {
            var apiUri = "todo/remove";
            return base.updateCustomEndpoint(apiUri, data.Id, data);
        }

    }
})();
