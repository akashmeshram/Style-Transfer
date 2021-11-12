import {EventEmitter} from 'events';
import { 
  stylesList,
  contentsList,
  contentImageId, 
  styleStrengthId, 
  styleImageId, 
  styleGalleryId,
  contentGalleryId,
  statusId 
} from './config';

const styleImage = (name, folder) => {
  const img = document.createElement('img');
  img.src = `./img/${folder}/${name}.webp`;
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
    stylesList.sort(() => 0.5 - Math.random()).map(name => {
      const image = styleImage(name, 'styles');
      const cell = document.createElement('button');
      cell.appendChild(image);
      cell.addEventListener('click', () => { this.style.src =  image.src;});
      this.styleGallery.appendChild(cell);
    })    
  }

  loadContent() {
    contentsList.sort(() => 0.5 - Math.random()).map(name => {
      const image = styleImage(name, 'contents');
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
  }

}

export default Board;