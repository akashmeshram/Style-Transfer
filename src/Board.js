import { EventEmitter } from "events";
import {
  stylesList,
  contentsList,
  contentImageId,
  styleStrengthId,
  styleImageId,
  styleGalleryId,
  contentGalleryId,
  statusId,
  uploadContentId,
  uploadStyleId,
  canvasId,
} from "./config";

const addImage = (name, folder) => {
  const img = document.createElement("img");
  img.src = `./img/${folder}/${name}.webp`;
  img.alt = `${name} style image`;
  img.id = `style-${name}`;
  return img;
};

function uploadFile(button, target) {
  button.addEventListener("input", function () {
    if (this.files && this.files[0]) {
      const reader = new FileReader();
      reader.onload = function (e) {
        target.setAttribute("src", e.target.result);
      };
      reader.readAsDataURL(this.files[0]);
    }
  });
}

class Board extends EventEmitter {
  constructor() {
    super();

    this.uploadContent = document.getElementById(uploadContentId);
    this.uploadStyle = document.getElementById(uploadStyleId);
    this.canvas = document.getElementById(canvasId);

    this.styleGallery = document.getElementById(styleGalleryId);
    this.contentGallery = document.getElementById(contentGalleryId);

    this.style = document.getElementById(styleImageId);
    this.strengthBar = document.getElementById(styleStrengthId);
    this.content = document.getElementById(contentImageId);
    this.status = document.getElementById(statusId);
    this.statusMessages = [
      { color: "black", message: "Click transfer to apply strength" },
      { color: "#f44336ff", message: "Style Processing ...." },
      { color: "red", message: "Style Applying ...." },
      { color: "green", message: "Stylize Complete !!!" },
    ];

    this.loadStrengthBar();
    this.loadUploadContent();
    this.loadUploadStyle();
    this.loadStyles();
    this.loadContent();
    this.setUpCanvas();
  }

  loadStrengthBar() {
    this.strengthBar.addEventListener("input", (e) => {
      this.emit("strength", e.target.value / 100);
    });
  }

  loadUploadContent() {
    uploadFile(this.uploadContent, this.content);
  }

  loadUploadStyle() {
    uploadFile(this.uploadStyle, this.style);
  }

  loadStyles() {
    stylesList
      .sort(() => 0.5 - Math.random())
      .map((name) => {
        const image = addImage(name, "styles");
        const cell = document.createElement("button");
        cell.appendChild(image);
        cell.addEventListener("click", () => {
          this.style.src = image.src;
        });
        this.styleGallery.appendChild(cell);
      });
  }

  loadContent() {
    contentsList
      .sort(() => 0.5 - Math.random())
      .map((name) => {
        const image = addImage(name, "contents");
        const cell = document.createElement("button");
        cell.appendChild(image);
        cell.addEventListener("click", () => {
          this.content.src = image.src;
        });
        this.contentGallery.appendChild(cell);
      });
  }

  setUpCanvas() {
    this.canvas.addEventListener("click", () => {
      const image = this.canvas
        .toDataURL("image/png")
        .replace("image/png", "image/octet-stream");
      const link = document.createElement("a");
      link.download = "styled.png";
      link.href = image;
      link.click();
    });
  }

  set contentImage(src) {
    this.content.setAttribute("src", src);
  }

  set styleImage(src) {
    this.style.setAttribute("src", src);
  }

  set statusCode(value) {
    this.status.innerHTML = this.statusMessages[value]["message"];
  }
}

export default Board;
