createSquares(16);

function createSquares(num) {
  let squareSize = `${100 / num}%`;
  
  const mainPad = document.querySelector('#main-pad');
  const rangeValue = document.querySelector('#rangeValue');
  rangeValue.textContent = `Grid size: ${num} x ${num}`;

  for (let i = 0; i < num * num; i++) {
    const createSquares = document.createElement('div');
    createSquares.classList.add('square');
    createSquares.style.width = squareSize;
    mainPad.appendChild(createSquares);
  }

}
