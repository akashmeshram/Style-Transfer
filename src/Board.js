import {EventEmitter} from 'events';
import { contentImageId, styleImages, styleStrengthId, uploadImageId, scrollBoxId } from './config';

const styleImage = (name) => {
  const img = document.createElement('img');
  img.src = `./img/${name}.jpg`;
  img.alt = `${name} style image`;
  img.id = `style-${name}`;
  
  const cell = document.createElement('button');
  cell.appendChild(img);
  return cell;
} 

class Board extends EventEmitter {
  constructor() {
    super();
    this.container = document.getElementById(scrollBoxId);
    this.uploadImage = document.getElementById(uploadImageId);
    this.strengthBar = document.getElementById(styleStrengthId);
    this.content = document.getElementById(contentImageId);

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
      image.addEventListener('click', () => { this.emit('style', `style-${name}`);});
      this.container.appendChild(image);
    })    
  }

  set contentImage(src) {
    this.content.setAttribute('src', src);
  }

}

export default Board;