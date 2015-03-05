a.controller('myCtrl',function(){
	
});

a.controller('cartCtrl',['$scope','Data',function($scope,Data){
	function totcart() {
		tot = 0.0;
		for (var y in $scope.prodincart) {
			tot = tot + $scope.prodincart[y].prodcost*$scope.prodincart[y].quant;
		}
		$scope.tot=tot.toFixed(2);
	}
	Data.get('prodincart.php',{}).then(function(results) {
		$scope.prodincart = results.data;
		totcart();
	});
	$scope.cartminus = function(id,descr) {
		Data.get("delfromcart.php",{'prodid':id}).then(function() {
			Data.getsession().then(function (results) {
				Data.get('prodincart.php',{}).then(function(results) {
					$scope.prodincart = results.data;
					totcart();
				});
			});
		});
		Data.toast('info','Diminuita quantit&agrave; di '+descr);
	}
	$scope.cartplus = function(id,descr) {
		Data.get("addtocart.php",{'prodid':id}).then(function() {
			Data.getsession().then(function (results) {
				Data.get('prodincart.php',{}).then(function(results) {
					$scope.prodincart = results.data;
					totcart();
				});
			});
		});
		Data.toast('info','Aumentata quantit&agrave; di '+descr);
	}
}]);

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

	function getDatiCart(results) {
		$scope.ncart=results.cart.length;
		tot = 0.0;
		totq=0;
		for (var x in results.cart) {
			for (var y in $scope.products) {
				if (results.cart[x] == $scope.products[y].prodid) {
					tot = tot + parseFloat($scope.products[y].prodcost)*results.cartquant[x];
					totq+=results.cartquant[x];
					break;
				}
			}
		}
		$scope.eurocart=tot.toFixed(2);
		$scope.qtotcart=totq;
	};
	Data.get('categories.php').then(function(results) {
		$scope.categories = results.data;
	});
	Data.get('products.php',{}).then(function(results) {
		$scope.products = results.data;
		Data.getsession().then(function (results) {getDatiCart(results);});
	});
	$scope.ncart=0;
	$scope.eurocart=0;
	$scope.qtotcart=0;
	
	$scope.addtocart=function(id,descr) {
		Data.get("addtocart.php",{'prodid':id}).then(function() {
			Data.getsession().then(function (results) {getDatiCart(results);});
		});
		Data.toast('info',descr + " aggiunto al carrello");
	}
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