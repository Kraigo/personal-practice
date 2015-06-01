function Miner(size, mines) {
	var miner = this;
	miner.size = size || [10, 10];
	miner.arena = [];
	miner.mines = mines || 10;
	miner.status = 'init';
	miner.opened = 0;
	miner.flags = 0;
	miner.end = false;

	function init () {
		for (var i = 0; i < miner.size[0]; i++) {
			var row = [];
			for (var j = 0; j < miner.size[1]; j++) {
				var cell = {
					mine: false,
					flag: false,
					open: false,
					nearby: 0
				}
				row.push(cell);
			}
			miner.arena.push({'row': row});
		
		}

		var mines = miner.mines;
		while(mines > 0) {
			var x = miner.getRandom(miner.size[0]),
				y = miner.getRandom(miner.size[1]);

			if (miner.setMine(x, y)) {
				mines --;
			}
			
		}

		miner.status = 'game';

	};
	init();




};

Miner.prototype.getRandom = function(max, min) {
	min = min || 0;
	return (Math.random() * max) | 0;
}

Miner.prototype.getCell = function(x,y) {
	if (this.arena[y] && this.arena[y].row[x])
		return this.arena[y].row[x];
	else 
		return false;
};
Miner.prototype.setFlag = function(x,y) {
	var cell = this.getCell(x,y);

	if (!cell.open) {
		cell.flag ? this.flags -- : this.flags ++;
		cell.flag = !cell.flag
	}

}
Miner.prototype.openCell = function(x,y) {
	var cell = this.getCell(x,y);

	cell.open = true;
	cell.flag = false;

	this.opened ++;

	if (cell.mine) {
		this.status = 'lose';
		this.end = true;
		this.revealMines();
	}

	if (this.checkFinish()) {
		this.status = 'win';
		this.end = true;
		this.revealMines();
	}
	
	if (cell.nearby == 0) {
		this.checkNeighbors(x,y);
	}	
};

Miner.prototype.checkFinish = function() {
	var max = this.size[0] * this.size[1] - this.mines;
	return this.opened == max;
}

Miner.prototype.checkNeighbors = function(x,y) {
	
	if (!this.getCell(x, y)) { return;}

	var nearbyMines = 0;

	for(var i = -1; i <= 1; i ++) {
		for(var j = -1; j <= 1; j ++) {


			var _x = x + i,
				_y = y + j,
				cell = this.getCell(_x, _y);

				

			if (cell) {

				if (cell.mine) {
					nearbyMines ++;
				}
				else if (!cell.open && !cell.flag) {
				 	this.openCell(_x, _y);
				}
			}

				
		}
	}
};

Miner.prototype.setMine = function(x, y) {

	var cell = this.getCell(x, y);

	if (!cell.mine) {
		cell.mine = true;

		for(var i = -1; i <= 1; i ++) {
			for(var j = -1; j <= 1; j ++) {

				var _x = x + i,
					_y = y + j,
					cell = this.getCell(_x, _y);
				
				
				if (cell) {
					cell.nearby ++;
				}

			}
		}

		return true;
	} else {
		return false
	}
}

Miner.prototype.revealMines = function() {
	this.arena.map(function(row){
		row.row.map(function(cell) {
			if (cell.mine) {
				cell.open = true;
			}
			
		})
	})
};

