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
    // let currentColor = colorValues(event.target.style.backgroundColor);
    // let toHex = returnLowerColorInHex(currentColor)
    // event.target.style.backgroundColor = toHex;
  }
});

function colorValues(color)
{
    if (color === '')
        return;
    if (color === 'transparent')
        return [0, 0, 0, 0];
    if (color[0] === '#')
    {
        if (color.length < 7)
        {
            // convert #RGB and #RGBA to #RRGGBB and #RRGGBBAA
            color = '#' + color[1] + color[1] + color[2] + color[2] + color[3] + color[3] + (color.length > 4 ? color[4] + color[4] : '');
        }
        return [parseInt(color.substr(1, 2), 16),
            parseInt(color.substr(3, 2), 16),
            parseInt(color.substr(5, 2), 16),
            color.length > 7 ? parseInt(color.substr(7, 2), 16)/255 : 1];
    }
    if (color.indexOf('rgb') === -1)
    {
        // convert named colors
        var temp_elem = document.body.appendChild(document.createElement('fictum')); // intentionally use unknown tag to lower chances of css rule override with !important
        var flag = 'rgb(1, 2, 3)'; // this flag tested on chrome 59, ff 53, ie9, ie10, ie11, edge 14
        temp_elem.style.color = flag;
        if (temp_elem.style.color !== flag)
            return; // color set failed - some monstrous css rule is probably taking over the color of our object
        temp_elem.style.color = color;
        if (temp_elem.style.color === flag || temp_elem.style.color === '')
            return; // color parse failed
        color = getComputedStyle(temp_elem).color;
        document.body.removeChild(temp_elem);
    }
    if (color.indexOf('rgb') === 0)
    {
        if (color.indexOf('rgba') === -1)
            color += ',1'; // convert 'rgb(R,G,B)' to 'rgb(R,G,B)A' which looks awful but will pass the regxep below
        return color.match(/[\.\d]+/g).map(function (a)
        {
            return +a
        });
    }
}
function componentToHex(c) {
  const hex = c.toString(16);
  return hex.length == 1 ? "0" + hex : hex;
}

function rgbToHex(r, g, b) {
  return "#" + componentToHex(r) + componentToHex(g) + componentToHex(b);
}

function returnLowerColorInHex(arr) {
  let r = arr[0];
  let b = arr[1];
  let g = arr[2];
  console.log(r, g, b);
  if (r < 10) {
    r -= r; 
  } else {
    r -= 10;
  }

  if (b < 10) {
    b -= b; 
  } else {
    b -= 10;
  }

  if (g < 10) {
    g -= g; 
  } else {
    g -= 10;
  }

console.log(r, g ,b);
let toHex = rgbToHex(r, g, b);
return toHex;

}