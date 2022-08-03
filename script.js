const accessPalette = document.querySelector('#color-palette');
const accessBoardPixels = document.querySelector('#pixel-board');
const accessInput = document.querySelector('input');
const accessVQV = document.getElementById('generate-board');
const accessReset = document.getElementById('clear-board');

accessInput.value = JSON.parse(sessionStorage.getItem('boardSize'))

// Functions
// Gera uma criar aleatoria
const generateRandomColor = () => {
  let randColor = Math.floor(Math.random() * 16777215).toString(16); // Watched in CSS-Tricks: https://css-tricks.com/snippets/javascript/random-hex-color/#:~:text=var%20randomColor%20%3D%20Math.,random()*16777215)

  return `#${randColor}`;
}

// Remove as classes
const removeClass = (element) => {
  for (let i of accessColor) {
    i.classList.remove('selected')

  }
};

// Guarda a cor da paleta, e altera a classe 'selected' dos elementos
const getColor = (event) => {
  let savedColor = '';
  let settledClass = event.target.classList;
  savedColor = getComputedStyle(event.target).backgroundColor;
  sessionStorage.setItem('color', JSON.stringify(savedColor))
  removeClass(settledClass);
  event.target.classList.add('selected');
};

const receiveColor = (event) => {
  let changeColor = JSON.parse(sessionStorage.getItem('color'));
  event.target.style.backgroundColor = changeColor;

};


// Cria paleta de cores
let numOfColors = 4;
const createColor = document.createElement('div');

for (let i = 0; i < numOfColors; i += 1) {
  const createDiv = document.createElement('div');
  if (i === 0) {
    accessPalette.insertBefore(createDiv, accessPalette.lastElementChild)
    createDiv.addEventListener('click', getColor);
    createDiv.classList.add('color', 'selected');
    createDiv.style.backgroundColor = 'black';
  } else {
    accessPalette.insertBefore(createDiv, accessPalette.lastElementChild)
    createDiv.addEventListener('click', getColor);
    createDiv.classList.add('color');
    createDiv.style.backgroundColor = generateRandomColor();
  }
}

// Espera evento para disparar funcao que guarda a cor
const accessColor = document.querySelectorAll('.color');
for (let i of accessColor) {
  i.addEventListener('click', getColor);
}

// Cria a Board Pixels
const generateBoard = (size) => {
  for (let rows = 0; rows < size; rows += 1) {
    const createDiv = document.createElement('div');
    accessBoardPixels.insertBefore(createDiv, accessBoardPixels.lastElementChild);
    createDiv.classList.add('row', 'clearfix');
    for (let boxes = 0; boxes < size; boxes += 1) {
      const createDiv = document.createElement('div');
      const accessRows = document.querySelectorAll('.row')
      let toAddEventInPixels = accessRows[rows].appendChild(createDiv);
      toAddEventInPixels.addEventListener('click', receiveColor);
      createDiv.classList.add('pixel');
      createDiv.style.backgroundColor = 'white';
    }
  }
}

// Muda tamanho do Quadro de Pixel
accessVQV.addEventListener('click', () => {
  sessionStorage.setItem('boardSize', JSON.stringify(accessInput.value));
  window.location.reload();
});

// Limpa as cores do Quadro de Pixel
accessReset.addEventListener('click', () => {
  const accessPixels = document.querySelectorAll('.pixel');
  for (let i of accessPixels) {
    i.style.backgroundColor = 'white'
  }
});


// Loads padroes
window.onload = () => {
  generateBoard(JSON.parse(sessionStorage.getItem('boardSize')));
  sessionStorage.setItem('color', JSON.stringify('black'));
}