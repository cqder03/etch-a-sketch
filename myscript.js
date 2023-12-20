const mainPad = document.querySelector('#main-pad');
const rangeValue = document.querySelector('#rangeValue');
let penColor = document.querySelector('#color-picker').value;

createSquares(16);

function createSquares(num) {
  let squareSize = `${100 / num}%`;
  rangeValue.textContent = `Grid size: ${num} x ${num}`;

  for (let i = 0; i < num * num; i++) {
    const createSquares = document.createElement('div');
    createSquares.classList.add('square');
    createSquares.style.width = squareSize;
    createSquares.style.borderColor = 'black';
    mainPad.appendChild(createSquares);
  }
}

const controls = document.querySelector('#controls');

function returnRandom(num) {
  return Math.floor(Math.random() * num);
}

// Toggle controls //
controls.addEventListener('click', (event) => {
  let elementId = event.target.id;
  let squareSelectorAll = document.querySelectorAll('.square');
  let squareSelector = document.querySelector('.square');
  switch(elementId) {
    case 'clearButton':
      for (let square of squareSelectorAll) {
        square.style.backgroundColor = 'white';
      }
      break;
    case 'toggleEraser':
      if (penColor != '#FFFFFF') {
        penColor = '#FFFFFF';
        document.querySelector('#toggleEraser').classList.add('active', 'eraserActive');
      } else {
        penColor = document.querySelector('#color-picker').value;
        document.querySelector('#toggleEraser').classList.remove('active', 'eraserActive');
      }
    break;
    case 'rainbowMode':
      if (document.querySelector('#rainbowMode').getAttribute('class').includes('active', 'rainbowActive')) {
        document.querySelector('#rainbowMode').classList.remove('active', 'rainbowActive');
        penColor = document.querySelector('#color-picker').value;
      } else {
        document.querySelector('#rainbowMode').classList.add('active', 'rainbowActive');
        penColor = `rgb(${returnRandom(255)}, ${returnRandom(255)}, ${returnRandom(255)})`
      }
      break;
    case 'toggleShading':
      if (document.querySelector('#toggleShading').getAttribute('class').includes('active', 'shadingActive')) {
        document.querySelector('#toggleShading').classList.remove('active', 'shadingActive');
      } else {
        document.querySelector('#toggleShading').classList.add('active', 'shadingActive');
      }
      break;
    case 'toggleBorder':
    if (squareSelector.getAttribute('style').includes('border-color: black')) {
      for (let square of squareSelectorAll) {
        square.style.borderColor = 'transparent';
      }
    } else {
      for (let square of squareSelectorAll) {
        square.style.borderColor = 'black';
      }
    }
      break; 
}});

// Onchange controls //
controls.addEventListener('change', (event) => {
  let elementId = event.target.id;
  let squareSelectorAll = document.querySelectorAll('.square');

  switch(elementId) {
    case 'color-picker':
      penColor = document.querySelector('#color-picker').value;
      break;
    case 'squareSize':
      let newValue = document.getElementById('squareSize').value;
      rangeValue.textContent = `Grid size: ${newValue} x ${newValue}`;
      for (let square of squareSelectorAll) {
        mainPad.removeChild(square);
      }
      createSquares(newValue)
      break;
  }
})

// Main pad //

mainPad.addEventListener('mouseover', (event) => {
  event.target.style.backgroundColor = `${penColor}`;
  if (document.querySelector('#rainbowMode').getAttribute('class').includes('active', 'rainbowActive')) {
    event.target.style.backgroundColor = `rgb(${returnRandom(255)}, ${returnRandom(255)}, ${returnRandom(255)})`;
  } else if (document.querySelector('#toggleShading').getAttribute('class').includes('active', 'shadingActive')) {
    let currentColor = event.target.style.backgroundColor;
    penColor = currentColor - 25;
    console.log(currentColor);

  }
});