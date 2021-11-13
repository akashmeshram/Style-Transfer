import Machine from './Machine';
import Board from './Board';
import { transfer, canvasId } from './config';

const tranferButton = document.getElementById(transfer);

const board = new Board();
const machine  = new Machine();
machine.loadModels();

tranferButton.addEventListener('click', () => {
  machine.applyStyle();
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
