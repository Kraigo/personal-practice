function MunchCtrl($scope) {

	$scope.player = {
		name: 'Player',
		level: 5,
		race: 'human',
		class: 'none',
		sex: 'male',
		status: 'outdoor',
		items: [],
		hand: [],

		total: function() {
			return this.level + this.gear();
		},
		addLevel: function() {
			this.level++;
			console.log('Ты получил уровень. Теперь ты %s', this.level);
		},
		removeLevel: function() {
			if (this.level > 1) {
				this.level--;
			}
			console.log('Ты потерял уровень. Теперь ты %s', this.level);
		},
		addGear: function() {
			this.gear++;
		},
		removeGear: function() {
			this.gear--;
		},
		changeSex: function() {
			if (this.sex == 'male') {
				this.sex = 'woman'
			} else {
				this.sex = 'male'
			}
		},
		wearItem: function(item) {
			this.push(item);
		},
		toString: function() {
			return this.name + ' [' + this.level + ']';
		}
	}

	$scope.checkItemsGear = function (player) {
		console.log('Проверка бонусов вещей');
		// Бонусы одетых шмоток
		var itemsGear = 0;
		for (var item in player.items) {
			if (player.items[item].playerGear) {
				itemsGear += player.items[item].playerGear(player);
			}
			if (player.items[item].playerWeak) {
				itemsGear -= player.items[item].playerWeak(player);
			}
		}
		return itemsGear;
	};

	$scope.giveChoice = function (player) {
		console.log('Дан выбор. Состояние игрока: %s', player.status);
		if (player.status == 'outdoor') {
		}

		if (player.status == 'endturn') {
		}

		if (player.status == 'loser') {
		}
		
	}


	$scope.fight = function (player, monster) { 
			var outcome = {
				win: false,
				over: 0
			}

			var _playerTotal = 0;
			var _monsterTotal = 0;

			_monsterTotal += monster.level;

			_playerTotal += $scope.checkItemsGear(player);
			_playerTotal += player.level;

			// Бонусы и Штрафы карт в игре
			for (var card in $scope.cards.inGame) {
				if ( $scope.cards.inGame[card].monsterGear ) {
					_monsterTotal += $scope.cards.inGame[card].monsterGear(player)
				}
				if ( $scope.cards.inGame[card].monsterWeak ) {
					_monsterTotal += $scope.cards.inGame[card].monsterWeak(player)
				}
				if ( $scope.cards.inGame[card].playerGear ) {
					_monsterTotal += $scope.cards.inGame[card].playerGear(player)
				}
				if ( $scope.cards.inGame[card].playerWeak ) {
					_monsterTotal += $scope.cards.inGame[card].playerWeak(player)
				}

			}



			if (_playerTotal > _monsterTotal) {
				outcome.win = true;
				outcome.over = _playerTotal - _monsterTotal;
			} else {
				outcome.win = false;
				outcome.over = _monsterTotal - _playerTotal;
			}


			$scope.log('Игрок ОУ[%s] - %s ОУ[%s]', _playerTotal, monster.title, _monsterTotal);

			if (outcome.win) {
				$scope.log('Вы победили монстра. Награда за него %s сокровище и %s уровень', monster.treasure, monster.reward);
				player.addLevel();
				for (var i=0; i< monster.reward; i++) {
					$scope.takeTreasure(player);
				}						
				console.groupEnd();

				// $scope.dropRound();
			} else {
				$scope.log('Вы проигрываете монстру %s с перевесом в %s очков. Что будете делать?', monster.title, outcome.over);
				player.status = 'loser';
				$scope.giveChoise(player);
			}
			return outcome;
		},

	$scope.run = function (player) {
		var _runGear = 0;

		for (var card in $scope.cards.inGame) {
				if ( $scope.cards.inGame[card].runGear ) {
					_runGear += $scope.cards.inGame[card].runGear();
				}
				if ( $scope.cards.inGame[card].runWeak ) {
					_runGear -= $scope.cards.inGame[card].runWeak();
				}
			}

		for (var item in player.items) {
			if ( player.items[item].runGear ) {
				_runGear += player.items[item].runGear();
			}
		}

		var dice = getRandom(1, 6);
		console.log('На костях выпало %s и у вас %s бонусов на смыску.', dice, _runGear);
		if (dice + _runGear > 4) {
			console.log('Ты убежал');
		} else {
			console.log('Ты не убежал');
		}
		console.groupEnd();
	};

	$scope.endTurn = function (player) {
		for (var card in $scope.cards.inGame) {
			if ($scope.cards.inGame[card].card == 'doors') {
				$scope.moveCard( $scope.cards.inGame[card], $scope.cards.inGame, $scope.cards.doorsFold );
			}
			else if ($scope.cards.inGame[card].card == 'treasures') {
				$scope.moveCard( $scope.cards.inGame[card], $scope.cards.inGame, $scope.cards.treasuresFold );
			}
		}
		player.status = 'outdoor';
		$scope.log('Ты справился с трудностями предыдущей комнаты.')
		$scope.giveChoice(player);
	}


	$scope.kickDoor = function (player) {
		var rnd = getRandom(0, $scope.cards.doors.length-1);
		var card = $scope.cards.doors[rnd];

		$scope.moveCard(card, $scope.cards.doors, $scope.cards.inGame);

		if (card.type == 'monster') {
			$scope.log('За дверь оказался монстр <b>%s [%s ур.]</b>.<br><i>%s.</i>', card.title, card.level, card.text)
			$scope.fight( player, card);
		} else if (card.type == 'curse') {
			console.log( card );
			$scope.log('За дверью оказалось проклятие <b>%s</b>, которое тут же действует на тебя.<br><i>%s.</i>', card.title, card.text);
			card.apply(player);
			player.status = 'endturn';
			$scope.giveChoice( player );
		}
	};
	$scope.takeTreasure = function(player, num) {

		if ($scope.cards.treasures.length == 0) return false;

		var rnd = num || getRandom(0, $scope.cards.treasures.length-1);
		var card = $scope.cards.treasures[rnd];

		$scope.moveCard(card, $scope.cards.treasures, player.hand);

		console.log('Ты получил сокровище: '+ card.title);

	};
	$scope.wearItem = function(player, card) {
		$scope.moveCard(card, player.hand, player.items);
		console.log('Ты сыграл карту: ' + card.title)
	};

	$scope.playCard = function(card, monster) {
		card.apply(monster);
		console.log('Ты сыграл карту:' + card.title)
		$scope.fight($scope.player, monster)
	}
	$scope.moveCard = function(card, from, to) {
		var cardIndex = from.indexOf(card);
		to.push(card);
		from.splice(cardIndex, 1);
	}

	$scope.cards = {
		doors: [],
		treasures: [],
		doorsFold: [],
		treasuresFold: [],
		inGame: []
	};
	$scope.logList = []
	$scope.log = function (msg) {
		for(var i=1; i<arguments.length; i++) { 
			msg = msg.replace('%s', arguments[i]);
		}
		$scope.logList.push(msg);
	}

	function getRandom (min, max) {
		return Math.floor(Math.random() * (max - min + 1)) + min;
	};








	$scope.cards.doors = [
		{
			pack: 'doors',
			type: 'monster',
			title: 'Пиксельный квадрат',
			text: 'Всё что вокруг него превращается в пиксели',
			level: 5,
			treasure: 1,
			reward: 1,
			monsterGear: function(player) {
				if (player.class == 'none') {
					return 2;
				}
			},
			playerWeak: function(player) {
				if (player.sex == 'male') {
					return -2;
				}
			},
			badStuff: {

			}
		},
		{
			pack: 'doors',
			type: 'monster',
			title: 'Круглый треугольник',
			text: 'У него были проблемы с геометрией',
			level: 3,
			treasure: 1,
			reward: 1,
			monsterGear: function(player) {
				if (player.class == 'none') {
					return 2;
				}
			},
			playerWeak: function(player) {
				if (player.sex == 'male') {
					return -2;
				}
			},
			badStuff: {

			}
		},
		{
			pack: 'doors',
			type: 'curse',
			title: 'Интернет Зависимость',
			text: 'Ты теряешь 1 уровень',

			apply: function(player) {
				player.level--;
			}
		}
	];

	$scope.cards.treasures = [
		{
			pack: 'treasure',
			type: 'item',
			title: 'Тестовая шмотка',
			big: false,
			playerGear: function() {
					return 1;
			}
		},
		{
			pack: 'treasure',
			type: 'item',
			title: 'Тестовая шмотка2',
			big: false,
			playerGear: function() {
					return 2;
			}
		},
		{
			pack: 'treasure',
			type: 'item',
			title: 'Тестовая шмотка3',
			big: false,
			playerGear: function() {
				return 3;
			}
		},
		{
			pack: 'treasure',
			type: 'gearMonster',
			title: 'Оторванный',
			gearText: '-5 к монстру',
			text: 'Его вырвали из реальности и он не понимает, что с ним, и где его враг.',
			monsterWeak: -5
		}
	];


}