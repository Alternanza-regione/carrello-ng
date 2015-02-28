var a = angular.module('myApp',['ngRoute','ngAnimate','toaster']);
a.config(['$routeProvider',function($routeProvider) {
	$routeProvider
		.when('/home', { title:'myApp | Home page', templateUrl:'partials/home.html', controller:'homeCtrl' })
		.when('/reserved', { title:'myApp | Reserved', templateUrl:'partials/reserved.html', controller:'reservedCtrl' })
		.when('/login', { title:'myApp | Log-in', templateUrl:'partials/login.html', controller:'loginCtrl' })
		.when('/dashboard', { title:'myApp | Dashboard', templateUrl:'partials/dashboard.html', controller:'dashboardCtrl' })
		.otherwise({redirectTo:'/home'});
}]);
a.run(function($rootScope, $route, $location, Data) {
    $rootScope.$on('$routeChangeSuccess', function(newVal, oldVal) {
        if (oldVal !== newVal) {
            document.title = $route.current.title;
        }
    });
	$rootScope.$on("$routeChangeStart", function (event, next, current) {
		if (next.$$route)
			var nextUrl = next.$$route.originalPath;
		if (current.$$route)
			var currentUrl = current.$$route.originalPath;

		$rootScope.authenticated = false;
		Data.getsession().then(function (results) {
			if (results.uid) {
				$rootScope.authenticated = true;
				$rootScope.uid = results.uid;
				$rootScope.name = results.name;
				$rootScope.email = results.email;
				if (nextUrl == '/login') {
					$location.path("/dashboard");
				}
			}
			else {
				if (nextUrl == '/reserved' || nextUrl == '/dashboard') {
					$location.path("/login");
				}
			}
		});
	});
});
a.controller('myCtrl',function(){});
a.controller('homeCtrl',function(){});
a.controller('reservedCtrl',function(){});
a.controller('dashboardCtrl',['$scope','$location','Data',function($scope,$location,Data){
	$scope.logout=function() {
		Data.logout().then(function() {
			$location.path("/home");
		});
	}
}]);
a.controller('loginCtrl',['$scope', '$location', 'Data', function($scope,$location,Data){
	$scope.login=function() {
		Data.login($scope.username,$scope.password).then(function(results) {
			if (results.data==1)
				$location.path("/dashboard");
			else
				Data.toast('warning',"login errato");
		});
	}
}]);

a.factory('Data',['$http', 'toaster', function($http,toaster) {
	var obj = {};
	obj.toast = function (typetoast,msg) {
		//toaster.pop(data.status, "", data.message, 10000, 'trustedHtml');
		toaster.pop(typetoast, "", msg, 5000, 'trustedHtml');
	};
	obj.getsession = function () {
		return $http.get('db/getsession.php').then(function (results) {
			return results.data;
		});
	};
	obj.login = function(u,p) {
		return $http.post('db/login.php',{'username':u,'password':p}).then(function(results) {
			return results;
		});
	};
	obj.logout = function() {
		return $http.get('db/logout.php');
	}
	
	return obj;
}]);