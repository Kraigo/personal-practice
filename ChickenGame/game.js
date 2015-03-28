function Game() {

	var game = this;
	var param = {
		time: 1000,
		money: 0,
		moneyTarget: document.getElementById('moneyVal'),
		profitTarget: document.getElementById('profitVal')

	}
	var dataTarget = document.getElementById('dataVal');

	game.click = function() {
		param.money += game.factories.clicker.moneyClick();
		game.update();
	}

	game.factories = {
		clicker: {
			title: 'Курочка',
			level: 1,
			moneyClick: function() {
				return this.level;
			},
			cost: function() {
				return this.level*20;
			}
		},
		chicken: {
			title: 'Несушка',
			level: 0,
			money: function() {
				return this.level;
			},
			cost: function() {
				return (this.level+1)*10;
			}
		},
		petushok: {
			title: 'Петушок',
			level: 0,
			money: function() {
				return this.level*15;
			},
			cost: function() {
				return (this.level+1)*300;
			}
		},
		farmer: {
			title: 'Фермер',
			level: 0,
			money: function() {
				return this.level*50;
			},
			cost: function() {
				return (this.level+1)*2000;
			}
		},
		fabrika: {
			title: 'Куриная фабрика',
			level: 0,
			money: function() {
				return this.level*15;
			},
			cost: function() {
				return (this.level+1)*250;
			}
		},
		maginhat: {
			title: 'Волшебная шляпа',
			level: 0,
			money: function() {
				return this.level*50;
			},
			cost: function() {
				return (this.level+1)*1000;
			}
		}
	};

	game.checkFactories = function() {

		var totalMoney = 0;

		for (var f in game.factories) {
			if (game.factories[f].money) {
				totalMoney += game.factories[f].money();
			}			
		}
		return totalMoney;

	}

	game.update = function() {
		param.profitTarget.innerHTML = game.checkFactories();
		param.moneyTarget.innerHTML = param.money;

		for (var f in game.factories) {
			if (param.money >= game.factories[f].cost()) {
				game.factories[f].target.className = 'factory';
			} else {
				game.factories[f].target.className = 'factory deactive';
			}
		}
	}
	
	game.interval = function() {
		var dataStart = Date.now();

		param.money += game.checkFactories();
		game.update();

		var dataEnd = Date.now();
		dataTarget.innerHTML = dataEnd - dataStart;
		setTimeout(game.interval, param.time);
	}

	function find(obj, childrenClass) {
		for (var i = 0; i < obj.childNodes.length; i++) {
		    if (obj.childNodes[i].className == childrenClass) {
		      return obj.childNodes[i];
		      break;
		    }        
		}
		return null;
	}
	function factoryUpgrade(factory) {
		if (param.money >= factory.cost() ) {
			param.money -= factory.cost();
			factory.level++;

			param.moneyTarget.innerHTML = param.money;
			if (factory.money) {
				factory.moneyTarget.innerHTML = factory.money();
			}
			if (factory.moneyClick) {
				factory.moneyClickTarget.innerHTML = factory.moneyClick();
			}
			
			factory.costTarget.innerHTML = factory.cost();
			//factory.levelTarget.innerHTML = factory.level();

			game.update();
		}		
	}

	function init() {
		for (var f in game.factories) {
			var factory = game.factories[f],
				container = document.createElement('div'),
				elm = document.createElement('p').cloneNode(true);

			container.id = f;
			container.className = 'factory deactive';

			elm.className = 'factory-title';
			elm.innerHTML = game.factories[f].title;
			factory.titleTarget = elm.cloneNode(true);
			container.appendChild(factory.titleTarget);

			if (factory.money) {
				elm.className = 'factory-money';
				elm.innerHTML = game.factories[f].money();
				factory.moneyTarget = elm.cloneNode(true);
				container.appendChild(factory.moneyTarget);
			}
			if (factory.moneyClick) {
				elm.className = 'factory-money money-click';
				elm.innerHTML = game.factories[f].moneyClick();
				factory.moneyClickTarget = elm.cloneNode(true);
				container.appendChild(factory.moneyClickTarget);
			}


			elm.className = 'factory-cost';
			elm.innerHTML = game.factories[f].cost();
			factory.costTarget = elm.cloneNode(true);
			container.appendChild(factory.costTarget);


			// if (game.factories[f].money) {
			// 	elm_money.className = 'factory-money';
			// 	elm_money.innerHTML = game.factories[f].money();
			// }

			// if (game.factories[f].moneyClick) {
			// 	elm_money.className = 'factory-money';
			// 	elm_money.innerHTML = game.factories[f].moneyClick();
			// }


			

			// elm_cost.className = 'factory-cost';
			// elm_cost.innerHTML = game.factories[f].cost();



			container.onclick = function() {
				factoryUpgrade(game.factories[this.id]);
			}

			factory.target = container;

			document.getElementById('factoriesContainer').appendChild(container);
		}

		game.interval();
	}
	return init();
}
