function Munch() {
	var munch = this,
		battleboard = document.getElementById('battleboard'),
		control = document.getElementById('control');


	munch.checkItemsGear = function (player) {
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

	munch.giveChoice = function (player) {
		console.log('Дан выбор. Состояние игрока: %s', player.status);
		if (player.status == 'outdoor') {
			var button = document.createElement('span');
			button.className = 'button';
			button.onclick = function() {
				control.innerHTML = '';
				this.onclick = null;
				munch.kickDoor(player);
				
			}
			button.innerHTML = 'Выбить дверь';
			control.appendChild(button);
			battleboard.appendChild(control);
		}

		if (player.status == 'endturn') {
			var button = document.createElement('span');
			button.className = 'button';
			button.onclick = function() {
				control.innerHTML = '';
				this.onclick = null;
				munch.endTurn(player);
			}
			button.innerHTML = 'Закончить ход';
			control.appendChild(button);
			battleboard.appendChild(control);
		}

		if (player.status == 'loser') {
			var button = document.createElement('span');
			button.className = 'button';
			button.onclick = function() {
				control.innerHTML = '';
				this.onclick = null;
				munch.endTurn(player);
			}
			button.innerHTML = 'Бежать';
			control.appendChild(button);
			battleboard.appendChild(control);
		}
		
	}


	munch.fight = function (player, monster) { 
			var outcome = {
				win: false,
				over: 0
			}

			var _playerTotal = 0;
			var _monsterTotal = 0;

			_monsterTotal += monster.level;

			_playerTotal += munch.checkItemsGear(player);
			_playerTotal += player.level;

			// Бонусы и Штрафы карт в игре
			for (var card in munch.cards.inGame) {
				if ( munch.cards.inGame[card].monsterGear ) {
					_monsterTotal += munch.cards.inGame[card].monsterGear(player)
				}
				if ( munch.cards.inGame[card].monsterWeak ) {
					_monsterTotal += munch.cards.inGame[card].monsterWeak(player)
				}
				if ( munch.cards.inGame[card].playerGear ) {
					_monsterTotal += munch.cards.inGame[card].playerGear(player)
				}
				if ( munch.cards.inGame[card].playerWeak ) {
					_monsterTotal += munch.cards.inGame[card].playerWeak(player)
				}

			}



			if (_playerTotal > _monsterTotal) {
				outcome.win = true;
				outcome.over = _playerTotal - _monsterTotal;
			} else {
				outcome.win = false;
				outcome.over = _monsterTotal - _playerTotal;
			}


			munch.log('Игрок ОУ[%s] - %s ОУ[%s]', _playerTotal, monster.name, _monsterTotal);

			if (outcome.win) {
				munch.log('Вы победили монстра. Награда за него %s сокровище и %s уровень', monster.treasure, monster.reward);
				player.addLevel();
				for (var i=0; i< monster.reward; i++) {
					munch.takeTreasure(player);
				}						
				console.groupEnd();

				munch.dropRound();
			} else {
				munch.log('Вы проигрываете монстру %s с перевесом в %s очков. Что будете делать?', monster.name, outcome.over);
				player.status = 'loser';
				munch.giveChoise(player);
			}
			return outcome;
		},

	munch.run = function (player) {
		var _runGear = 0;

		for (var card in munch.cards.inGame) {
				if ( munch.cards.inGame[card].runGear ) {
					_runGear += munch.cards.inGame[card].runGear();
				}
				if ( munch.cards.inGame[card].runWeak ) {
					_runGear -= munch.cards.inGame[card].runWeak();
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

	munch.endTurn = function (player) {
		for (var card in munch.cards.inGame) {
			if (munch.cards.inGame[card].card == 'doors') {
				munch.moveCard( munch.cards.inGame[card], munch.cards.inGame, munch.cards.doorsFold );
			}
			else if (munch.cards.inGame[card].card == 'treasures') {
				munch.moveCard( munch.cards.inGame[card], munch.cards.inGame, munch.cards.treasuresFold );
			}
		}
		player.status = 'outdoor';
		munch.log('Ты справился с трудностями предыдущей комнаты.')
		munch.giveChoice(player);
	}


	munch.kickDoor = function (player) {
		var rnd = getRandom(0, munch.cards.doors.length-1);
		var card = munch.cards.doors[rnd];

		munch.moveCard(card, munch.cards.doors, munch.cards.inGame);

		if (card.type == 'monster') {
			munch.log('За дверь оказался монстр <b>%s [%s ур.]</b>.<br><i>%s.</i>', card.name, card.level, card.text)
			munch.fight( player, card);
		} else if (card.type == 'curse') {
			console.log( card );
			munch.log('За дверью оказалось проклятие <b>%s</b>, которое тут же действует на тебя.<br><i>%s.</i>', card.name, card.text);
			card.apply(player);
			player.status = 'endturn';
			munch.giveChoice( player );
		}
	};
	munch.takeTreasure = function(player, num) {
		var rnd = num || getRandom(0, munch.cards.treasures.length-1);
		var card = munch.cards.treasures[rnd];

		munch.moveCard(card, munch.cards.treasures, player.hand);

		console.log('Ты получил сокровище: '+ card.name);

	};
	munch.wearItem = function(player, card) {
		munch.moveCard(card, player.hand, player.items);
		console.log('Ты сыграл карту: ' + card.name)
	};

	munch.playCard = function(card, monster) {
		card.apply(monster);
		console.log('Ты сыграл карту:' + card.name)
		munch.fight(munch.player, monster)
	}
	munch.moveCard = function(card, from, to) {
		var cardIndex = from.indexOf(card);
		to.push(card);
		from.splice(cardIndex, 1);
	}

	munch.cards = {
		doors: [],
		treasures: [],
		doorsFold: [],
		treasuresFold: [],
		inGame: []
	};

	munch.log = function (msg) {
		var obj = document.createElement('p');

		for(var i=1; i<arguments.length; i++) { 
			msg = msg.replace('%s', arguments[i]);
		}

		obj.innerHTML = msg;
		battleboard.appendChild( obj );
	}

	function getRandom (min, max) {
		return Math.floor(Math.random() * (max - min + 1)) + min;
	};


}