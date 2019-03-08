let inputImg;
let statusMsg;
let transferBtn;
let style1;


function setup() {
  noCanvas();
  statusMsg = select('#statusMsg');

  inputImg = select('#inputImg');

  transferBtn = select('#transferBtn')
  transferBtn.mousePressed(transferImages);
  loadStyle();
}


function loadStyle() {
  for(let i = 1 ; i <= 9; i++){
    $("#" + i).click(function() {
      let path = './models/' + i;
      style1 = ml5.styleTransfer(path, modelLoaded);
    });
  }
}

function modelLoaded() {
  if(style1.ready){
    $('#statusMsg').text('Model Loaded!')
  }
}

function transferImages() {

  $('#statusMsg').text('Applying Style Transfer...!');
  
  style1.transfer(inputImg, function(err, result) {
    $("#result").attr("src", result.src);
  });

  $('#statusMsg').text('Done!');
  
  loadStyle();

}