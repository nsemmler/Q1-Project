const submit = document.querySelector('.create-grid')

// On Submit:
submit.addEventListener('click', (event) => {
  event.preventDefault()

  const color1 = document.querySelector('.color1')
  const color2 = document.querySelector('.color2')
  const color3 = document.querySelector('.color3')
  const color4 = document.querySelector('.color4')

  tl = hexToRgb(color1.value)
  tr = hexToRgb(color2.value)
  bl = hexToRgb(color3.value)
  br = hexToRgb(color4.value)

  const cornersInfo = {
    'tl': tl,
    'tr': tr,
    'bl': bl,
    'br': br
  }

  localStorage.setItem('4corners', JSON.stringify(cornersInfo))
  generateGrid(6, 10)
  setTimeout(() => {
    scrambleGrid()
  }, 2000)
})

// Convert HEX to RGB
function hexToRgb(hex) {
  var result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  const rVal = parseInt(result[1], 16)
  const gVal = parseInt(result[2], 16)
  const bVal = parseInt(result[3], 16)

  return result ? [rVal, gVal, bVal] : null
}

// Generates empty <divs> within the grid
createGrid()

// Swap colors of two tiles
let firstColor
let secondColor

setTimeout(() => {
  const allTiles = document.querySelectorAll('.tile')
  const tiles = Array.from(allTiles)

  tiles.forEach((tile) => {
    tile.addEventListener('click', (event) => {
      event.preventDefault()

      // Toggle 'selected' of same tile when clicked
      if (tile.classList.contains('selected')) {
        tile.classList.remove('selected')
      } else {
        tile.classList.add('selected')
      }

      const selectedTilesInfo = document.querySelectorAll('.selected')
      let selectedTiles = Array.from(selectedTilesInfo)

      if (selectedTiles.length === 2) {
        const firstTile = selectedTiles[0]
        const secondTile = selectedTiles[1]

        firstColor = firstTile.style.background
        secondColor = secondTile.style.background

        firstTile.style.background = secondColor
        secondTile.style.background = firstColor
        firstTile.classList.remove('selected')
        secondTile.classList.remove('selected')
      }
    })
  })
}, 250)

// Shuffle grid
let swapColorsObj = {}
let swappableIndexes = []

function scrambleGrid () {
  const allTiles = document.querySelectorAll('.tile')
  const tiles = Array.from(allTiles)

  tiles.forEach((tile) => {
    if (tile.classList.length === 1) { // don't swap the corners
      swapColorsObj[tile.id] = {'oldColor': tile.style.background, 'newColor': null }
    }
  })

  for (let index in swapColorsObj) { swappableIndexes.push(index) }

  swappableIndexes = shuffle(swappableIndexes)
  let swappedIndex = 0

  for (let index in swapColorsObj) {
    const otherTileID = parseInt(swappableIndexes[swappedIndex])
    const otherTileColor = swapColorsObj[otherTileID]['oldColor']
    swapColorsObj[index]['newColor'] = otherTileColor
    swappedIndex++
  }

  tiles.forEach((tile) => {
    if (tile.classList.length === 1) {
      tile.style.background = swapColorsObj[tile.id]['newColor']
    }
  })
}

// RGB Inputs
const r1Input = document.querySelector('.color1-r')
const g1Input = document.querySelector('.color1-g')
const b1Input = document.querySelector('.color1-b')
const r2Input = document.querySelector('.color2-r')
const g2Input = document.querySelector('.color2-g')
const b2Input = document.querySelector('.color2-b')
const r3Input = document.querySelector('.color3-r')
const g3Input = document.querySelector('.color3-g')
const b3Input = document.querySelector('.color3-b')
const r4Input = document.querySelector('.color4-r')
const g4Input = document.querySelector('.color4-g')
const b4Input = document.querySelector('.color4-b')

/* MAKE THIS OPTIONAL TO USER - ASK IF WANT TO RESTORE OLD SESSION */
var storedCornerInfo = localStorage.getItem('4corners')
if (storedCornerInfo) {
  let previousGame = JSON.parse(storedCornerInfo)

  r1Input.value = previousGame['bl'][0]
  g1Input.value = previousGame['bl'][1]
  b1Input.value = previousGame['bl'][2]
  r2Input.value = previousGame['br'][0]
  g2Input.value = previousGame['br'][1]
  b2Input.value = previousGame['br'][2]
  r3Input.value = previousGame['tl'][0]
  g3Input.value = previousGame['tl'][1]
  b3Input.value = previousGame['tl'][2]
  r4Input.value = previousGame['tr'][0]
  g4Input.value = previousGame['tr'][1]
  b4Input.value = previousGame['tr'][2]

  updateColorSample1()
  updateColorSample2()
  updateColorSample3()
  updateColorSample4()
}

// Add change event listeners to every RGB input field
r1Input.addEventListener('change', updateColorSample1)
g1Input.addEventListener('change', updateColorSample1)
b1Input.addEventListener('change', updateColorSample1)

r2Input.addEventListener('change', updateColorSample2)
g2Input.addEventListener('change', updateColorSample2)
b2Input.addEventListener('change', updateColorSample2)

r3Input.addEventListener('change', updateColorSample3)
g3Input.addEventListener('change', updateColorSample3)
b3Input.addEventListener('change', updateColorSample3)

r4Input.addEventListener('change', updateColorSample4)
g4Input.addEventListener('change', updateColorSample4)
b4Input.addEventListener('change', updateColorSample4)

// Update color swatch when change RGB values
function updateColorSample1 () {
  const rVal = r1Input.value
  const gVal = g1Input.value
  const bVal = b1Input.value
  const colorSample = document.querySelector('.sample1')
  colorSample.style.background = 'rgb(' + [rVal, gVal, bVal].join(',') + ')'
}

function updateColorSample2 () {
  const rVal = r2Input.value
  const gVal = g2Input.value
  const bVal = b2Input.value
  const colorSample = document.querySelector('.sample2')
  colorSample.style.background = 'rgb(' + [rVal, gVal, bVal].join(',') + ')'
}

function updateColorSample3 () {
  const rVal = r3Input.value
  const gVal = g3Input.value
  const bVal = b3Input.value
  const colorSample = document.querySelector('.sample3')
  colorSample.style.background = 'rgb(' + [rVal, gVal, bVal].join(',') + ')'
}

function updateColorSample4 () {
  const rVal = r4Input.value
  const gVal = g4Input.value
  const bVal = b4Input.value
  const colorSample = document.querySelector('.sample4')
  colorSample.style.background = 'rgb(' + [rVal, gVal, bVal].join(',') + ')'
}

// Fisher-Yates shuffle algorithm
function shuffle (array) {
  var j, x, i;
  for (i = array.length - 1; i > 0; i--) {
      j = Math.floor(Math.random() * (i + 1));
      x = array[i];
      array[i] = array[j];
      array[j] = x;
  }

  return array;
}

// Re-shuffle puzzle when click restart button
const restartBtn = document.querySelector('.fa-redo-alt')
restartBtn.addEventListener('click', (event) => {
  event.preventDefault()

  const submitBtn = document.querySelector('.create-grid')
  restartBtn.onclick = function() {
     submitBtn.click();
  };
})
