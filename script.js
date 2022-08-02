const accessColorDiv = document.querySelectorAll('.color > div');
console.log(accessColorDiv);
const accessBoardPixels = document.querySelector('#pixel-board');
console.log(accessBoardPixels);


const getColor = event => {
  let savedColor;
  savedColor = getComputedStyle(event.target).backgroundColor;
  sessionStorage.setItem('color', JSON.stringify(savedColor));
}


const receiveColor = event => {
  let changeColor = JSON.parse(sessionStorage.getItem('color'));
  event.target.style.backgroundColor = changeColor;
}

for (let i of accessColorDiv) {
  i.addEventListener('click', getColor);
}

// Cria a Board Pixels
let boardSize = 15;
for (let rows = 0; rows < boardSize; rows += 1) {
  const createDiv = document.createElement('div');
  accessBoardPixels.insertBefore(createDiv, accessBoardPixels.lastElementChild);
  createDiv.classList.add('row');
  for (let boxes = 0; boxes < boardSize; boxes += 1) {
    const createDiv = document.createElement('div');
    const accessRows = document.querySelectorAll('.row')
    let toAddEventInPixels = accessRows[rows].appendChild(createDiv);
    toAddEventInPixels.addEventListener('click', receiveColor);
    createDiv.classList.add('pixel');
  }
}

