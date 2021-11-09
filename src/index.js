import Machine from './Machine';
import Board from './Board';
import { transfer, uploadContentId, uploadStyleId } from './config';

const board = new Board();
const tranferButton = document.getElementById(transfer);
const uploadContent = document.getElementById(uploadContentId);
const uploadStyle = document.getElementById(uploadStyleId);
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

board.on('strength', (val) => {
  machine.styleStrength = val;
});

