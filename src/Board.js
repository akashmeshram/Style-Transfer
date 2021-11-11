import {EventEmitter} from 'events';
import { 
  contentImageId, 
  styleImages, 
  styleStrengthId, 
  styleImageId, 
  styleGalleryId,
  contentGalleryId,
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
    this.styleGallery = document.getElementById(styleGalleryId);
    this.contentGallery = document.getElementById(contentGalleryId);

    this.style = document.getElementById(styleImageId);
    this.strengthBar = document.getElementById(styleStrengthId);
    this.content = document.getElementById(contentImageId);
    this.status = document.getElementById(statusId);

    this.statusMessages = [
      {color: 'black', message: 'Click transfer to apply strength'},
      {color: '#f44336ff', message: 'Style Processing ....'},
      {color: 'red', message: 'Style Applying ....'},
      {color: 'green', message: 'Stylize Complete !!!'}
    ];

    this.loadStyles();
    this.loadContent();
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
      this.styleGallery.appendChild(cell);
    })    
  }

  loadContent() {
    styleImages.map(name => {
      const image = styleImage(name);
      const cell = document.createElement('button');
      cell.appendChild(image);
      cell.addEventListener('click', () => { this.content.src =  image.src;});
      this.contentGallery.appendChild(cell);
    })    
  }

  set contentImage(src) {
    this.content.setAttribute('src', src);
  }

  set styleImage(src) {
    this.style.setAttribute('src', src);
  }

  set statusCode(value) {
    this.status.innerHTML = this.statusMessages[value]['message'];
    this.status.style.color = this.statusMessages[value]['color'];
  }

}

export default Board;