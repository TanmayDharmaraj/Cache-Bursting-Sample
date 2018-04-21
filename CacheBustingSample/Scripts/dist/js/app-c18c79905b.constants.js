(function (angular) {
	angular.module('cachebusting.constants', [])
	  .constant(
	  'ENVIRONMENT',
	  {
	  	"api": window.location.origin + "/api",
	  	"type": "development",
	  	"upload_path": "/cf/upload"

	  }
	  );
})(window.angular);