import {EventEmitter} from 'events';
import { 
  contentImageId, 
  styleImages, 
  styleStrengthId, 
  styleImageId, 
  scrollBoxId,
  statusId 
} from './config';

const styleImage = (name) => {
  const img = document.createElement('img');
  img.src = `./img/${name}.jpg`;
  img.alt = `${name} style image`;
  img.id = `style-${name}`;
  return img;
} 

class Board extends EventEmitter {
  constructor() {
    super();
    this.container = document.getElementById(scrollBoxId);
    this.style = document.getElementById(styleImageId);
    this.strengthBar = document.getElementById(styleStrengthId);
    this.content = document.getElementById(contentImageId);
    this.status = document.getElementById(statusId);
    this.loadStyles();
    this.loadStrengthBar();
  }

  loadStrengthBar() {
    this.strengthBar.addEventListener('input', (e) => {
      this.emit('strength',  e.target.value/100.);
    })
  }

  loadStyles() {
    styleImages.map(name => {
      const image = styleImage(name);
      const cell = document.createElement('button');
      cell.appendChild(image);
      cell.addEventListener('click', () => { this.style.src =  image.src;});
      this.container.appendChild(cell);
    })    
  }

  set contentImage(src) {
    this.content.setAttribute('src', src);
  }

  set styleImage(src) {
    this.style.setAttribute('src', src);
  }

  set statusText(value) {
    this.status.innerHTML = value;
  }

}

export default Board;