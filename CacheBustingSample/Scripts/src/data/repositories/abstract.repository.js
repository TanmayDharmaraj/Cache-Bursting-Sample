(function () {
    'use strict';

    angular
        .module('cachebusting.data')
        .factory('abstract.repository', AbstractRepository);

    AbstractRepository.$inject = ['$http', 'ENVIRONMENT'];

    /* @ngInject */
    function AbstractRepository($http, ENVIRONMENT) {
        function Ctor(resourceName, rootLevel) {
            this.urlBase = ENVIRONMENT.api + '/' + resourceName;

            if (rootLevel) {
                this.urlBase = ENVIRONMENT.api;
            }

            this.getList = getList.bind(this);
            this.get = get.bind(this);
            this.insert = insert.bind(this);
            this.update = update.bind(this);
            this.partialUpdate = partialUpdate.bind(this);
            this.remove = remove.bind(this);

            //custom endpoints
            this.getCustomEndpoint = getCustomEndpoint.bind(this);
            this.getListCustomEndpoint = getListCustomEndpoint.bind(this);
            this.insertCustomEndpoint = insertCustomEndpoint.bind(this);
            this.updateCustomEndpoint = updateCustomEndpoint.bind(this);
            this.partialUpdateCustomEndpoint = partialUpdateCustomEndpoint.bind(this);
            this.removeUpdateCustomEndpoint = removeUpdateCustomEndpoint.bind(this);
        }

        return Ctor;


        function getListCustomEndpoint(customEp, params) {
            var url = ENVIRONMENT.api + '/' + customEp;
            return $http.get(url, {
                params: params
            });
        }

        function getCustomEndpoint(customEp, params) {
            var url = ENVIRONMENT.api + '/' + customEp;
            return $http.get(url, {
                params: params
            });
        }
        function insertCustomEndpoint(customEp, data) {
            var url = ENVIRONMENT.api + '/' + customEp;
            return $http.post(url, data);

        }
        function updateCustomEndpoint(customEp, id, data) {
            var url = ENVIRONMENT.api + '/' + customEp;
            return $http.put(this.urlBase + '/' + id, data);

        }
        function partialUpdateCustomEndpoint(customEp, id, data) {
            var url = ENVIRONMENT.api + '/' + customEp;
            return $http.patch(this.urlBase + '/' + id, data);

        }
        function removeUpdateCustomEndpoint(customEp, id) {
            var url = ENVIRONMENT.api + '/' + customEp;
            return $http.delete(this.urlBase + '/' + id);

        }

        function getList(params) {
            /* jshint -W040 */
            return $http.get(this.urlBase, {
                params: params
            });
        }

        function get(id, params) {
            /* jshint -W040 */
            return $http.get(this.urlBase + '/' + id, {
                params: params
            });
        }


        function insert(data) {
            /* jshint -W040 */
            return $http.post(this.urlBase, data);
        }

        function update(id, data) {
            /* jshint -W040 */
            return $http.put(this.urlBase + '/' + id, data);
        }

        function partialUpdate(id, data) {
            /* jshint -W040 */
            return $http.patch(this.urlBase + '/' + id, data);
        }

        function remove(id) {
            /* jshint -W040 */
            return $http.delete(this.urlBase + '/' + id);
        }
    }
})();
