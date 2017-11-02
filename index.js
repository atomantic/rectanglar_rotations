var xAngle = 0, yAngle = 0;
document.addEventListener('keydown', function(e) {
  switch(e.keyCode) {

    case 37: // left
      yAngle -= 90;
      break;

    case 38: // up
      xAngle += 90;
      break;

    case 39: // right
      yAngle += 90;
      break;

    case 40: // down
      xAngle -= 90;
      break;
  };

  document.querySelector('.rect').style.transform = "rotateX("+xAngle+"deg) rotateY("+yAngle+"deg)";
}, false);

var $canvas = document.getElementById('canvas');
var $center = document.querySelector('#canvas > .row > .instance');
var $row = document.querySelector('#canvas > .row');
var centerLeft = 2400;
var centerTop = 1400;
var space = 250;
var deg = 22.5;
rowHTML = '';
canvasHTML = '';

// turn to the right
for(i=1;i<11;i++){
  var $clone = $center.cloneNode(true);
  $clone.style.left = (centerLeft + (space*i));
  $rect = $clone.childNodes[1];
  $rect.style.transform = "rotateY("+(deg*i)+"deg)";
  rowHTML += $clone.outerHTML;
}
// // turn to the left
for(i=1;i<10;i++){
  var $clone = $center.cloneNode(true);
  $clone.style.left = (centerLeft - (space*i));
  $rect = $clone.childNodes[1];
  $rect.style.transform = "rotateY("+(-deg*i)+"deg)";
  rowHTML += $clone.outerHTML;
}
$row.insertAdjacentHTML('beforeend', rowHTML);
// // row up
for(i=1;i<6;i++){
  var $clone = $row.cloneNode(true);
  $clone.style.top = (centerTop - (space*i));
  var $instances = $clone.childNodes;
  transform = "rotateX("+(deg*i)+"deg)";
  Array.prototype.forEach.call($instances, function(el, i){
    if(el.className!=='instance'){
      return;
    }
    var rect = el.childNodes[1];
    rect.style.transform = rect.style.transform + ' ' + transform;
  });
  canvasHTML += $clone.outerHTML;
}
// // row down
for(i=1;i<6;i++){
  var $clone = $row.cloneNode(true);
  $clone.style.top = (centerTop + (space*i));
  var $instances = $clone.childNodes;
  transform = "rotateX("+(-deg*i)+"deg)";
  Array.prototype.forEach.call($instances, function(el, i){
    if(el.className!=='instance'){
      return;
    }
    var rect = el.childNodes[1];
    rect.style.transform = rect.style.transform + ' ' + transform;
  });
  canvasHTML += $clone.outerHTML;
}
$canvas.insertAdjacentHTML('beforeend', canvasHTML);


//.style.transform = "rotateX("+xAngle+"deg) rotateY("+yAngle+"deg)";


// controls
var sheet = document.styleSheets[1];
var rules = sheet.cssRules||sheet.rules;
var $perspective = document.getElementById('perspective');
$perspective.addEventListener('change', function(e, l){
  console.log(e.target.value)
  rules[0].style.perspective = e.target.value+'px';
})
var $canvasZoom = document.getElementById('zoom');
$canvasZoom.addEventListener('change', function(e, l){
  console.log(e.target.value)
  rules[1].style.zoom = e.target.value;
})
