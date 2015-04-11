var app = angular.module('listerApp', ['ngRoute', 'ngCookies']);

app.config(['$routeProvider', '$locationProvider', function($routeProvide, $locationProvider){
	$routeProvide
		.when('/',{
			templateUrl:'view/lister.html',
			controller:'ListerCtrl'
			})
		.when('/login',{
			templateUrl:'view/login.html',
			controller:'LoginCtrl'
			})
		.when('/edit/:listId',{
			templateUrl:'view/edit.html',
			controller:'EditCtrl'
			})
		.otherwise({
			redirectTo: '/'
			});
}]);

app.factory('ListerFactory', function($http) {

	var apiUrl = 'api.php';

	return {
		getLists: function() {
			return $http.get(apiUrl)
				.error(function(data, status) {
					if (status == 401) window.location.href = '/lister/#/login';
				});
		},
		getList: function(id) {
			return $http.get(apiUrl+'?id='+id)
				.error(function(data, status) {
					if (status == 401) window.location.href = '/lister/#/login';
				});

		},
		setList: function(data) {
			return $http.post(apiUrl, data)
				.error(function(data, status) {
					if (status == 401) window.location.href = '/lister/#/login';
				});
		},
		updateList: function(data) {
			return $http.put(apiUrl, data)
				.error(function(data, status) {
					if (status == 401) window.location.href = '/lister/#/login';
				});
		},
		removeList: function(id) {
			return $http.delete(apiUrl+'?id='+id)
				.error(function(data, status) {
					if (status == 401) window.location.href = '/lister/#/login';
				});
		}
	}
});

app.filter('monthAndDate', function() {
	return function(dateString) {
		var date = new Date();
		date.setTime(Date.parse(dateString));
		return ("0" + date.getDate()).slice(-2) + '.' + ("0" + (date.getMonth()+1)).slice(-2);
	};
});

app.filter('pagination', function() {
	return function(input, start) {
		if (!input) return false;
		start = +start;
		return input.slice(start);
	}
});