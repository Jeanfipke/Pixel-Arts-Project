function pickColor() {
  const selected = document.getElementsByClassName('selected')[0];
  selected.className = 'color';
  window.event.target.className = 'color selected';
}

const box = document.getElementsByClassName('color');
const colorPaletteDiv = document.getElementById('color-palette');
colorPaletteDiv.addEventListener('click', pickColor);

function randomColor() {
  const possibleOptions = '0123456789ABCDEF';
  let color = '#';

  for (let i = 0; i < 6; i += 1) {
    color += possibleOptions[Math.floor(Math.random() * 16)];
  }
  return color;
}

const canva = document.getElementById('pixel-board');
const colorPalette = [];

function paintingThePalette() {
  for (let i = 0; i < 4; i += 1) {
    if (i === 0) {
      box[0].style = 'background-color: rgb(0, 0, 0)';
      colorPalette[0] = box[0].style.backgroundColor;
      localStorage.setItem('colorPalette', JSON.stringify(colorPalette));
    } else {
      box[i].style.backgroundColor = randomColor();
      colorPalette[i] = box[i].style.backgroundColor;
      localStorage.setItem('colorPalette', JSON.stringify(colorPalette));
    }
  }
}

const randomColorButton = document.getElementById('button-random-color');
randomColorButton.addEventListener('click', paintingThePalette);

function restoreColors() {
  const colorRestored = JSON.parse(localStorage.getItem('colorPalette'));
  if (localStorage.getItem('colorPalette') === null) {
    paintingThePalette();
  } else {
    for (let i = 0; i < 4; i += 1) {
      box[i].style = `background-color: ${colorRestored[i]}`;
    }
  }
}

function deleteCanva() {
  while (canva.firstChild) {
    canva.removeChild(canva.firstChild);
  }
}

function makeCanva(val) {
  deleteCanva();
  for (let i = 0; i < val * val; i += 1) {
    const pixel = document.createElement('section');
    pixel.className = 'pixel';
    canva.appendChild(pixel);
    pixel.style.backgroundColor = 'white';
    localStorage.setItem('boardSize', JSON.stringify(val));
  }
  canva.style = `grid-template-columns: repeat(${val}, 40px`;
}

function getValue(val) {
  let newVal = 0;
  if (val < 5 && val >= 1) {
    newVal = 5;
  } else if (val >= 50) {
    newVal = 50;
  } else {
    newVal = val;
  }
  makeCanva(newVal);
}

function initialCanva() {
  const boardSize = localStorage.getItem('boardSize');
  if (boardSize === null) {
    for (let i = 0; i < 25; i += 1) {
      const pixel = document.createElement('section');
      pixel.className = 'pixel';
      canva.appendChild(pixel);
      pixel.style.backgroundColor = 'white';
    }
    canva.style = 'grid-template-columns: repeat(5, 40px)';
  } else if (boardSize !== '') {
    getValue(JSON.parse(boardSize));
  }
}
initialCanva();

const input = document.getElementById('board-size');

function inputBox() {
  let val = 0;
  val = input.value;
  if (input.value === '' || input.value === 0) {
    alert('Board inválido!');
  } else {
    getValue(val);
  }
}

const vqvButton = document.getElementById('generate-board');
vqvButton.addEventListener('click', inputBox);

function saveDrawing() {
  const myDrawing = [];
  const pixel = document.getElementsByClassName('pixel');
  for (let i = 0; i < pixel.length; i += 1) {
    const drawing = pixel[i].style.backgroundColor;
    myDrawing.push(drawing);
  }
  localStorage.setItem('pixelBoard', JSON.stringify(myDrawing));
}

function paint() {
  const selected = document.getElementsByClassName('selected')[0];
  const pixelPaint = window.event.target;
  if (pixelPaint.className === 'pixel') {
    pixelPaint.style.backgroundColor = selected.style.backgroundColor;
    saveDrawing();
  }
}
canva.addEventListener('click', paint);

const clearButton = document.getElementById('clear-board');

function clearPaint() {
  const pixel = document.getElementsByClassName('pixel');
  for (let i = 0; i < pixel.length; i += 1) {
    pixel[i].style = 'background-color: rgb(255, 255, 255)';
    saveDrawing();
  }
}
clearButton.addEventListener('click', clearPaint);

function restoreDrawing() {
  const pixel = document.getElementsByClassName('pixel');
  const drawingRestored = JSON.parse(localStorage.getItem('pixelBoard'));

  for (let i = 0; i < pixel.length; i += 1) {
    if (drawingRestored === null) {
      pixel[i].style = 'background-color: white';
    } else {
      pixel[i].style = `background-color: ${drawingRestored[i]}`;
    }
  }
}

restoreDrawing();
restoreColors();
