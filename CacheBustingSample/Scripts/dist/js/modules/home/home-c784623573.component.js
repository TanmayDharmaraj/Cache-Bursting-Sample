(function (angular) {
    var app = angular.module('cachebusting.home');

    app.component('home', {
        templateUrl: 'Scripts/dist/views/modules/home/home.html',
        controller: HomeController,
        bindings: {
        }
    });

    HomeController.$inject = ['dataContext', '$state'];

    function HomeController(dataContext, $state) {
        var $ctrl = this;
        $ctrl.todoList = [];

        $ctrl.todoAdd = function () {
            $ctrl.todoList.push({ todoText: $ctrl.todoInput, done: false });
            $ctrl.todoInput = "";
        };

        $ctrl.remove = function () {
            var oldList = $ctrl.todoList;
            $ctrl.todoList = [];
            angular.forEach(oldList, function (x) {
                if (!x.done) $ctrl.todoList.push(x);
            });
        };

        var Init = (function () {
            dataContext.todo.getTodos()
            .then(function (resp) {
                $ctrl.todoList = resp.data;
            }, function (err) {
                console.error(err);
            })
        })();
    }
})(window.angular);