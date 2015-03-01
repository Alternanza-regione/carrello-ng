var a = angular.module('myApp',['ngRoute','ngAnimate','toaster']);
a.config(['$routeProvider',function($routeProvider) {
	$routeProvider
		.when('/home', { title:'myApp | Home page', templateUrl:'partials/home.html', controller:'homeCtrl' })
		.when('/shop', { title:'myApp | Shop', templateUrl:'partials/shop.html', controller:'shopCtrl' })
		.when('/login', { title:'myApp | Log-in', templateUrl:'partials/login.html', controller:'loginCtrl' })
		.when('/dashboard', { title:'myApp | Dashboard', templateUrl:'partials/dashboard.html', controller:'dashboardCtrl' })
		.when('/signup', { title:'myApp | Sign-up', templateUrl:'partials/signup.html', controller:'signupCtrl' })
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
		if (current && current.$$route)
			var currentUrl = current.$$route.originalPath;

		$rootScope.authenticated = false;
		Data.getsession().then(function (results) {
			if (results.userid) {
				$rootScope.authenticated = true;
				$rootScope.userid = results.userid;
				$rootScope.username = results.username;
				$rootScope.usersurname = results.usersurname;
				$rootScope.useremail = results.useremail;
				$rootScope.userlevel = results.userlevel;
				if (nextUrl == '/login') {
					$location.path("/dashboard");
				}
			}
			else {
				if (nextUrl == '/shop' || nextUrl == '/dashboard') {
					$rootScope.nextUrl = nextUrl;
					$location.path("/login");
				}
			}
		});
	});
});
a.controller('myCtrl',function(){});
a.controller('homeCtrl',function(){});
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
	obj.get = function(query,p) {
		return $http.post('db/'+query,p).then(function(results) {
			return results;
		});
	};
	
	return obj;
}]);