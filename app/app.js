var a = angular.module('myApp',['ngRoute','ngAnimate','toaster','angularUtils.directives.dirPagination']);

a.config(['$routeProvider',function($routeProvider) {
	$routeProvider
		.when('/home', { title:'myApp | Home page', templateUrl:'partials/home.html', controller:'homeCtrl' })
		.when('/products', { title:'myApp | Products', templateUrl:'partials/products.html', controller:'prodCtrl' })
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