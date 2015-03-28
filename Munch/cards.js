munchkin.cards.doors = [
	{
		card: 'doors',
		type: 'monster',
		name: 'Пиксельный квадрат',
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
		card: 'doors',
		type: 'monster',
		name: 'Круглый треугольник',
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
		name: 'Интернет Зависимость',
		text: 'Ты теряешь 1 уровень',

		apply: function(player) {
			player.level--;
		}
	}
];

munchkin.cards.treasures = [
	{
		pack: 'treasure',
		type: 'item',
		name: 'Тестовая шмотка',
		big: false,
		playerGear: function() {
				return 1;
		}
	},
	{
		pack: 'treasure',
		type: 'item',
		name: 'Тестовая шмотка2',
		big: false,
		playerGear: function() {
				return 2;
		}
	},
	{
		pack: 'treasure',
		type: 'item',
		name: 'Тестовая шмотка3',
		big: false,
		playerGear: function() {
			return 3;
		}
	},
	{
		pack: 'treasure',
		type: 'gearMonster',
		name: 'Оторванный',
		text: 'Его вырвали из реальности и он не понимает, что с ним, и где его враг.',
		monsterWeak: -5
	}
];