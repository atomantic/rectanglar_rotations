var $canvas = document.getElementById('canvas');
var $center = document.querySelector('#canvas > .row > .instance');
var $row = document.querySelector('#canvas > .row');
var centerLeft = 2200;
var centerTop = 1900;
var space = 250;
var deg = 22.5;
var right = 7;
var left = 8;
var rowsUp = 7;
var rowsDown = 7;
var i = 0;
var num = 1;
var $clone;
var $instances;
rowHTML = '';
canvasHTML = '';

// debugging
// right = 1;
// left = 1;
// rowsUp = 1;
// rowsDown = 1;
// centerLeft = 500;

function render(relative){

  // turn to the right
  for(i=0;i<right;i++){
    num = i+1;
    $clone = $center.cloneNode(true);
    $clone.style.left = (centerLeft + (space*num));
    $clone.className = 'instance clone';
    $rect = $clone.childNodes[1].childNodes[1];
    $rect.style.transform = "rotateY("+(deg*num)+"deg)";
    rowHTML += $clone.outerHTML;
  }
  // // turn to the left
  for(i=0;i<left;i++){
    num = i+1;
    $clone = $center.cloneNode(true);
    $clone.className = 'instance clone';
    $clone.style.left = (centerLeft - (space*num));
    $rect = $clone.childNodes[1].childNodes[1];
    $rect.style.transform = "rotateY("+(-deg*num)+"deg)";
    rowHTML += $clone.outerHTML;
  }
  $row.insertAdjacentHTML('beforeend', rowHTML);
  // // row up
  for(i=0;i<rowsUp;i++){
    num = i+1;
    $clone = $row.cloneNode(true);
    $clone.className = 'row clone';
    $clone.style.top = (centerTop - (space*num));
    $instances = $clone.childNodes;
    transform = "rotateX("+(deg*num)+"deg)";
    Array.prototype.forEach.call($instances, function(el, i){
      if(el.className!=='instance'){
        return;
      }
      var rectWrap = el.childNodes[1];
      var rect = rectWrap.childNodes[1];
      if(relative){
        rect.style.transform = rect.style.transform + ' ' + transform;
      }else{
        rectWrap.style.transform = transform;
      }
    });
    canvasHTML += $clone.outerHTML;
  }
  // // row down
  for(i=0;i<rowsDown;i++){
    num = i+1;
    $clone = $row.cloneNode(true);
    $clone.className = 'row clone';
    $clone.style.top = (centerTop + (space*num));
    $instances = $clone.childNodes;
    transform = "rotateX("+(-deg*num)+"deg)";
    Array.prototype.forEach.call($instances, function(el){
      if(el.className!=='instance'){
        return;
      }
      var rectWrap = el.childNodes[1];
      var rect = rectWrap.childNodes[1];
      if(relative){
        rect.style.transform = rect.style.transform + ' ' + transform;
      }else{
        rectWrap.style.transform = transform;
      }
    });
    canvasHTML += $clone.outerHTML;
  }
  $canvas.insertAdjacentHTML('beforeend', canvasHTML);
}

// controls
var sheet = document.styleSheets[1];
var rules = sheet.cssRules||sheet.rules;
var $perspective = document.getElementById('perspective');
$perspective.addEventListener('change', function(e, l){
  console.log('perspective', e.target.value);
  rules[0].style.perspective = e.target.value+'px';
})
var $canvasZoom = document.getElementById('zoom');
$canvasZoom.addEventListener('change', function(e, l){
  console.log('zoom', e.target.value);
  rules[1].style.zoom = e.target.value;
});
var $relativeTilt = document.getElementById('relative');
$relativeTilt.addEventListener('change', function(e, l){
  $clones = document.querySelectorAll('.clone');
  Array.prototype.forEach.call($clones, function(el){
    el.parentNode.removeChild(el);
  });
  console.log('relative', e.target.checked);
  render(e.target.checked);
});


render(true);
