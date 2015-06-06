var app=angular.module("mezmun",[]);

 function myapp($scope,$http,$rootScope){
    $scope.currentPage = 0;
    $scope.pageSize = 3;
	$scope.items = [];
	$scope.getItems = function() {
       var query=window.location.href;

       var parqirlash=query.split("=");
       
		
		$http({method : 
			'GET',url : 
			'https://api.parse.com/1/classes/turlar/'+parqirlash[1],
			 headers: { 'X-Parse-Application-Id':'hSNY3qCUgP6jYeb3dwG53huAGGd8YEHugCAjdgGR', 'X-Parse-REST-API-Key':'2rkTaxHnBJbKZvJsDmqdl4kHhqTI8QP9rzaFpPDi'}

			} )
			
		.success(function(data, status) {
		 


  
			
			$scope.items = data;
	
			$(".spinner").hide();
			$(".desc").html(data.desc);
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
