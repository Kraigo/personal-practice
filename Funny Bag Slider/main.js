var collection = [];

function init() {
  var groups = document.querySelectorAll('div');
  [].forEach.call(groups, function(group) {
    var bug = group.querySelector('input');
    bug.addEventListener('change', bugHandler);
    collection.push(bug);
  });
}

function bugHandler() {
  var activeCount = collection.filter(e => !e.checked).length;

  if (activeCount === 0) {

    var newBug = addBug(this);
    if ( Math.random() > 0.8) {
      addBug(newBug);
    }
  }
}

function addBug(current) {
  var copy = collection.concat([]);
  if (current) {
    copy.splice(copy.indexOf(current), 1);
  }
  var next = copy[getRandomInt(0, copy.length)];
  next.checked = false;
  return next;
}

function getRandomInt(min, max) {
  return Math.floor(Math.random() * (max - min)) + min;
}

init();


setTimeout(function() {
  collection.forEach(function(c) {
    c.checked = Math.random() > 0.6;
  });
}, 300)