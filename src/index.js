import Machine from './Machine';
import Board from './Board';
import { transfer, uploadContentId, uploadStyleId, canvasId } from './config';

const tranferButton = document.getElementById(transfer);
const uploadContent = document.getElementById(uploadContentId);
const uploadStyle = document.getElementById(uploadStyleId);
const canvas = document.getElementById(canvasId);

const board = new Board();
const machine  = new Machine();
machine.loadModels();

uploadContent.addEventListener('input', function() {
  if (this.files && this.files[0]) {
    const reader = new FileReader();
    reader.onload = function (e) {
      board.contentImage =  e.target.result;
    };
    reader.readAsDataURL(this.files[0]);
  }
});

uploadStyle.addEventListener('input', function() {
  if (this.files && this.files[0]) {
    const reader = new FileReader();
    reader.onload = function (e) {
      board.styleImage =  e.target.result;
    };
    reader.readAsDataURL(this.files[0]);
  }
});

tranferButton.addEventListener('click', () => {
  machine.applyStyle();
})  

canvas.addEventListener('click', () => {
  const image = canvas.toDataURL("image/png", 1.0).replace("image/png", "image/octet-stream");
  const link = document.createElement('a');
  link.download = "styled.png";
  link.href = image;
  link.click();
})  

board.on('strength', (val) => {
  machine.styleStrength = val;
  board.statusCode = 0;
});


machine.on('style-loading', () => {
  board.statusCode = 1;
})


machine.on('style-complete', () => {
  board.statusCode = 3;
})
