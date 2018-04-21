(function (angular) {
    angular
        .module('cachebusting')
        .factory('customHttpInterceptor', ['$q', 'HTML', function ($q, html) {
            return {
                request: function (config) {
                    if (config.url.indexOf('views/') > 0) {
                        var key = config.url.replace("Scripts/dist/", "")
                        config.url = "Scripts/dist/" + html[key];
                        return config
                    }
                    return config;
                },

                requestError: function (config) {
                    return config;
                },

                response: function (res) {
                    return res;
                },

                responseError: function (res) {
                    return res;
                }
            }
        }]);

})(window.angular);