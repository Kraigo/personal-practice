app.controller('ListerCtrl', function($scope, $http, $location, ListerFactory) {

	ListerFactory.getLists()
		.success(function(data) {
			$scope.listers = data;
		})

	$scope.addList = function() {

		if ($scope.listTitle == '' || !$scope.listTitle) {
			$scope.alert.error = true;
			$scope.alert.msg = 'Укажите название вашей записи';
			return false;
		}

		if ($scope.listCategory == '' || !$scope.listCategory) {
			$scope.alert.error = true;
			$scope.alert.msg = 'Укажите категорию вашей записи';
			return false;
		}

		ListerFactory.setList({
				title: $scope.listTitle,
				category: $scope.listCategory
		})
		.success(function(data) {
			$scope.listTitle = '';
			$scope.listCategory = '';
			ListerFactory.getLists()
				.success(function(data, status) {
					$scope.listers = data;
					$scope.alert.error = false;
					$scope.alert.msg = 'Новая запись успешно добавлена';
				})
		});		
	};


	$scope.removeList = function(id) {
		ListerFactory.removeList(id)
			.success(function(data, status) {
					ListerFactory.getLists()
						.success(function(data, status) {
							$scope.listers = data;
						})
			})
	};

	$scope.editList = function(id) {
		$location.path('/edit/'+id);
	}

	$scope.numberOfPages = function() {
		return Math.ceil($scope.listers.length / $scope.pageSize);
	};
	$scope.prePage = function() {
		console.log($scope.curPage);
		if ($scope.curPage >= 1) $scope.curPage -= 1;
	};
	$scope.nextPage = function() {
		if ($scope.curPage < $scope.numberOfPages() -1 ) $scope.curPage += 1;
	};

	$scope.logout = function() {
		$http.delete('login.php')
			.success(function() {
				$location.path('/login');
			});
	};

	$scope.listers = [];
	$scope.filters = '';
	$scope.seach = '';
	$scope.curPage = 0;
	$scope.pageSize = 20;
	$scope.alert = {
		error: false,
		msg: null
	}

});

app.controller('LoginCtrl', function($scope, $http, $location, $cookies) {

	var loginUrl = 'login.php';

	if ($cookies['user_id']) {
		$http.get(loginUrl)
			.success(function(data) {
				$location.path('/');
			})
	}

	$scope.username = '';
	$scope.password = '';

	$scope.alert = {
		error: false,
		msg: null
	}


	$scope.register = function () {

		var loginData = {
			'username': $scope.username,
			'password': $scope.password
		};

		$http.post(loginUrl, loginData)
			.success(function(data, status) {
				if (status == 201) {
					$scope.alert.error = false;
					$scope.alert.msg = 'Пользователь успешно cоздан';
					$scope.login();
				}
			})
			.error(function(data, status) {
				if (status == 406) {
					$scope.alert.error = true;
					$scope.alert.msg = 'Такой пользователь уже существует';
				}
			});
	}


	$scope.login = function() {

		var loginData = {
			'username': $scope.username,
			'password': $scope.password
		};

		$http.put('login.php', loginData )
			.success(function(data) {
				$location.path('/');
			})
			.error(function(data, status){
				if (status == 401) {
					$scope.alert.error = true;
					$scope.alert.msg = 'Неверное имя пользователя или пароль';
				}
			})
	}

});

app.controller('EditCtrl', function($scope, $http, $location, $routeParams, ListerFactory) {

	$scope.listId = $routeParams.listId;



	ListerFactory.getList($scope.listId)
		.success(function(data, status) {
			$scope.list = data;
		})
		.error(function(data, status) {

		});

	$scope.saveList = function() {
		var listData = {
			id: $scope.listId,
			title: $scope.list.title,
			category: $scope.list.category,
			rating: $scope.list.rating,
			comment: $scope.list.comment,
			date: $scope.list.date
		}

		ListerFactory.updateList(listData)
			.success(function(data, status) {
				$location.path('/');
			})

	}
	$scope.removeList = function() {
		ListerFactory.removeList($scope.listId).
			success(function() {
				$location.path('/');
			})
	}
});