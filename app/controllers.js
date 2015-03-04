a.controller('myCtrl',function(){
	
});

a.controller('homeCtrl',function(){
	
});

a.controller('prodCtrl',['$scope','Data',function($scope,Data){
	Data.get('categories.php').then(function(results) {
		$scope.categories = results.data;
	});
	Data.get('products.php',{}).then(function(results) {
		$scope.products = results.data;
	});
}]);

a.controller('shopCtrl',['$scope','Data',function($scope,Data){
	Data.get('categories.php').then(function(results) {
		$scope.categories = results.data;
	});
	Data.get('products.php',{}).then(function(results) {
		$scope.products = results.data;
	});
}]);

a.controller('dashboardCtrl',['$scope','$location','Data',function($scope,$location,Data){
	$scope.logout=function() {
		Data.logout().then(function() {
			$location.path("/home");
		});
	}
}]);

a.controller('signupCtrl',['$scope','$location','Data',function($scope,$location,Data){
	$scope.signup=function() {
		Data.get('signup.php',{'signupname':$scope.signupname,'signupsurname':$scope.signupsurname,'signupemail':$scope.signupemail,'signuppwd':$scope.signuppwd}).then(function(result) {
			if (result.data==1) {
				Data.toast('success','registrazione avvenuta');
				$location.path('/login');
			}
		});
	}
}]);

a.controller('loginCtrl',['$scope', '$rootScope', '$location', 'Data', function($scope,$rootScope,$location,Data){
	$scope.login=function() {
		Data.login($scope.loginname,$scope.loginpwd).then(function(results) {
			if (results.data==1) {
				if ($rootScope.nextUrl) {
					$location.path($rootScope.nextUrl);
					delete $rootScope.nextUrl;
				}
				else
					$location.path("/dashboard");
			}
			else
				Data.toast('error',"login errato");
			$scope.loginname=$scope.loginpwd='';
		});
	};
	$scope.signup=function() {
		$location.path('/signup');
	}
}]);