/*

autor tormahiri

ttormahiri@hotmail.com
*/

var app=angular.module("tormahiri",[]);


app.directive('helloWorld', function() {
  return {
      restrict: 'AE',
      replace: 'true',
      template: 'aa'
  };
});


 function myapp($scope,$http,$rootScope){
    $scope.currentPage = 0;
    $scope.pageSize = 20;
	$scope.items = [];
	$scope.getItems = function() {
		 $(".btn-danger").hide();
		$(".spinner").show();
		$http({method : 
			'GET',url : 
			'https://api.parse.com/1/classes/turlar/',
			 headers: {
			  'X-Parse-Application-Id':'hSNY3qCUgP6jYeb3dwG53huAGGd8YEHugCAjdgGR', 
			  'X-Parse-REST-API-Key':'2rkTaxHnBJbKZvJsDmqdl4kHhqTI8QP9rzaFpPDi'
			}
			,

     params:  { 
              "order":"createdAt"
                 
              }

			} )
			
		.success(function(data, status) {
        
			$scope.items = data.results.reverse();
			
			 $(".btn-danger").show();
			 $(".loading").hide();
		});
	};

	};

	app.filter('startFrom', function() {
    return function(input, start) {
        start = +start; //parse to int
        return input.slice(start);
    }

});
