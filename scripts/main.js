const submit = document.querySelector('.create-grid')
var originalGrid = {}

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
  originalGrid = generateGrid(6, 10)

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
let correctTilesObj = {}

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

        checkUserAnswer(correctTilesObj)
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

function checkUserAnswer (correctTilesObj) {
  const allTiles = document.querySelectorAll('.tile')
  const tiles = Array.from(allTiles)
  let originalIndex = 1

  tiles.forEach((tile) => {
    const originalTileColor = originalGrid[originalIndex]
    const currentTileColor = tile.style.background

    if (currentTileColor == originalTileColor) {
      correctTilesObj[originalIndex] = true
    } else {
      correctTilesObj[originalIndex] = false
    }

    originalIndex++
  })

  let correctSolution = [...new Set(Object.values(correctTilesObj))] // returns unique array of correctTilesObj values
  if (correctSolution.length === 1 && correctSolution[0] === true) {
    console.log('You did it!! You won!')
  }
}
