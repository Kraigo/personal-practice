function MunchPlayer() {

	this.name = 'Player';
	this.level = 5;
	this.race = 'human';
	this.class = 'none';
	this.sex = 'male';
	this.status = 'outdoor';
	this.items = [];
	this.hand = [];

	this.total = function() {
		return this.level + this.gear();
	};
	this.addLevel = function() {
		this.level++;
		console.log('Ты получил уровень. Теперь ты %s', this.level);
	};
	this.removeLevel = function() {
		if (this.level > 1) {
			this.level--;
		}
		console.log('Ты потерял уровень. Теперь ты %s', this.level);
	};
	this.addGear = function() {
		this.gear++;
	};
	this.removeGear = function() {
		this.gear--;
	};
	this.changeSex = function() {
		if (this.sex == 'male') {
			this.sex = 'woman'
		} else {
			this.sex = 'male'
		}
	};
	this.wearItem = function(item) {
		this.push(item);
	};
	this.toString = function() {
		return this.name + ' [' + this.level + ']';
	};
}