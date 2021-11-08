import Machine from './Machine';
import Board from './Board';
import { transfer, uploadImageId } from './config';

const board = new Board();
const tranferButton = document.getElementById(transfer);
const uploadImage = document.getElementById(uploadImageId);
const machine  = new Machine();
machine.loadModels();


uploadImage.addEventListener('input', function() {
  console.log('button clicked')
  if (this.files && this.files[0]) {
    const reader = new FileReader();
    reader.onload = function (e) {
      board.contentImage =  e.target.result;
    };
    reader.readAsDataURL(this.files[0]);
  }
});

tranferButton.addEventListener('click', () => {
  machine.applyStyle();
})  

board.on('style', (val) => {
  machine.styleImage = val;
})

board.on('strength', (val) => {
  machine.styleStrength = val;
});

