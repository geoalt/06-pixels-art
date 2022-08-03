const selectPalette = document.querySelector('#color-palette');
const selectBoard = document.querySelector('#pixel-board');
const selectCleannerButton = document.querySelector('#clear-board');
const selectNewBoardButton = document.querySelector('#generate-board');
const selectInput = document.querySelector('#board-size');


const numberOfColorOptions = 4;
let numberOfPixels;
let selectedColor;

/*---------------------------------------
Inicio: criando o elemento Color Palette
-----------------------------------------*/
// Funcao que cria uma cor aleatoria
const generateRandColor = () => {
  let setRed = Math.floor(Math.random() * 255);
  let setGreen = Math.floor(Math.random() * 255);
  let setBlue = Math.floor(Math.random() * 255);

  return `rgb(${setRed}, ${setGreen}, ${setBlue})`;
};


// Funcao que pega a cor da paleta selecionada
const getColor = () => {
  const selectClass = document.querySelector('.selected');
  selectedColor = getComputedStyle(selectClass).backgroundColor;
};

// Funcao que alterna a classe 'selected'
const toggleClass = (e) => {
  for (let element of selectPalette.children) {
    element.classList.remove('selected');
  }
  e.target.classList.add('selected');

};

// Funcao que gera as cores da paleta
const generatePalette = () => {
  for (let i = 0; i < numberOfColorOptions; i += 1) {
    const createDiv = document.createElement('DIV');
    createDiv.classList.add('color');
    createDiv.style.backgroundColor = generateRandColor();
    createDiv.addEventListener('click', toggleClass);
    createDiv.addEventListener('click', getColor);
    selectPalette.insertBefore(createDiv, selectPalette.lastElementChild);

    // Atribui classe 'selected', e define que o elemento tenha sempre a cor preta
    if (i === 0) {
      createDiv.classList.add('selected');
      createDiv.style.backgroundColor = 'black';
    }
  }
};

/*-------------------------------------
Inicio: criando o elemento Pixel Board
---------------------------------------*/
const receiveColor = (e) => {
  e.target.style.backgroundColor = selectedColor;
};

// Funcao que gera o Pixel Board
const boardSettings = (numberOfPixels) => {
  // Cria as linhas
  for (let rows = 0; rows < numberOfPixels; rows += 1) {
    const createDiv = document.createElement('DIV');
    let rowNum = `number-${rows + 1}`;
    createDiv.classList.add('row', rowNum, 'clearfix');
    selectBoard.insertBefore(createDiv, selectBoard.lastElementChild);
    // Cria os pixels
    for (let cols = 0; cols < numberOfPixels; cols += 1) {
      const selectBoardRows = document.querySelectorAll('.row')
      const createDiv = document.createElement('DIV');
      let pixelNum = `pixel-${cols + 1}`;
      createDiv.classList.add('pixel', pixelNum);
      createDiv.addEventListener('click', receiveColor)
      selectBoardRows[rows].appendChild(createDiv);
    }
  }
};

/*---------------------------------------------
Inicio: configurando o elemento Board Configuration
-----------------------------------------------*/
// Botao Limpar Pixel Board
selectCleannerButton.addEventListener('click', () => {
  const selectPixels = document.querySelectorAll('.pixel');
  for (let pixel of selectPixels) {
    pixel.style.backgroundColor = 'white';
  }
});


// sessionStorage.setItem('boardSize', JSON.stringify(selectInput.value));
selectNewBoardButton.addEventListener('click', () => {
  sessionStorage.setItem(
    'numberOfPixelsStoraged',
    JSON.stringify(selectInput.value)
  );

  window.location.reload();
});

// Botao VQV para criar uma nova board
const generateBoard = () => {
  if (sessionStorage.length < 1) {
    numberOfPixels = 5;
  } else {
    numberOfPixels = JSON.parse(
      sessionStorage.getItem('numberOfPixelsStoraged')
    );
  }
  selectInput.value = numberOfPixels;
  boardSettings(numberOfPixels);
};











// Executa funcoes no carregamento da pagina
window.onload = () => {
  generatePalette();
  generateBoard();
  getColor();
}