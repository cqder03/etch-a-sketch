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
        console.log('toggleEraser');
      break;
    case 'rainbowMode':
      console.log('rainbowMode');
      break;
    case 'toggleShading':
      console.log('toggleShading');;
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

//Main Pad //

mainPad.addEventListener('onmousedown' && 'mouseover', (event) => {
  event.target.style.backgroundColor = `${penColor}`;
  console.log(`Clicked square with id:${event.target.id}`);
});