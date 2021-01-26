var source = document.getElementById('source');
var output = document.getElementById('output');

var maxWidth = 250;

draw(output, source.value)

source.addEventListener('change', function() {
  draw(output, this.value)
});

function draw(output, source) {
  var maxWidth = output.offsetWidth;
  var ruleSpan = document.createElement('span');
  var solved = '';

  source = source.split(' ');

  output.innerHTML = '';
  output.style.whiteSpace = 'nowrap';
  output.appendChild(ruleSpan);

  for (var i = 0; i < source.length; i++) {

    ruleSpan.innerHTML = solved + " " + source[i];

    if (ruleSpan.offsetWidth < maxWidth) {
      solved += " " + source[i]
    }

    if (ruleSpan.offsetWidth > maxWidth) {
      var line = document.createElement('span');
      line.innerHTML = solved;
      output.appendChild(line);
      solved = source[i]
    }

  }
  var line = document.createElement('span');
  line.innerHTML = solved;
  output.appendChild(line);
  output.removeChild(ruleSpan)

  var divs = document.querySelectorAll('#output > span');
  for (var i = 0, element; i < divs.length; ++i) {
    element = divs[i];
    element.style.fontSize = window.getComputedStyle(divs[i]).getPropertyValue('font-size');

    while (element.offsetWidth < maxWidth - 1) {
      element.style.fontSize = (parseFloat(element.style.fontSize) + 0.1) + 'px';
    }

    element.style.display = 'block';

  }
}