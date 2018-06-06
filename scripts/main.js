const submit = document.querySelector('.create-grid')
const mirror = document.querySelector('.mirror')
const hint = document.querySelector('.hint')

var storedCornerInfo = localStorage.getItem('4corners')
var originalGrid = {}
let corners = ''
if (storedCornerInfo) {
  corners = JSON.parse(storedCornerInfo)
  fillInColorsWithPreviousColors(corners)
}

// Click Submit button:
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

  createSolutionGrid(originalGrid)
  colorInSolutionGrid()
  toggleFixedTileIconColor()
  animateGridCountdownToShuffle()

  setTimeout(() => {
    scrambleGrid()
    mirror.style.display = 'block'
    hint.style.display = 'block'
  }, 3000)
})

// Click Mirror button:
mirror.addEventListener('click', (event) => {
  event.preventDefault()

  const solution = document.querySelector('.solution')
  if (solution.style.display === 'none') {
    solution.style.display = 'grid'
    mirror.textContent = 'Return to Game'
  } else {
    solution.style.display = 'none'
    mirror.textContent = 'Show Solution'
  }
})

// Click Hint button:
hint.addEventListener('click', (event) => {
  event.preventDefault()

  const progress = document.querySelector('.progress')
  if (progress.style.display === 'none') {
    progress.style.display = 'block'

    const alert = document.querySelector('.alert')
    if (alert.style.display === 'none') progress.style.marginTop = '15px'
  } else {
    progress.style.display = 'none'
  }
})

// Converters between HEX & RGB
function hexToRgb(hex) {
  var result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  const rVal = parseInt(result[1], 16)
  const gVal = parseInt(result[2], 16)
  const bVal = parseInt(result[3], 16)

  return result ? [rVal, gVal, bVal] : null
}

function componentToHex(c) {
  const hex = c.toString(16)
  return hex.length == 1 ? "0" + hex : hex
}

function rgbToHex(r, g, b) {
  return "#" + componentToHex(r) + componentToHex(g) + componentToHex(b)
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
    if (tile.classList.contains('fixedtile')) {
      removeCornerTilesFromGettingClickEvents(tiles, tile)
    }
  })

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

  updateHintValue(correctTilesObj)

  let correctSolution = [...new Set(Object.values(correctTilesObj))]
  if (correctSolution.length === 1 && correctSolution[0] === true) {
    const alert = document.querySelector('.alert-success')

    if (alert.style.display == 'none') {
      alert.style.display = 'flex'

      setTimeout(() => {
        alert.style.display = 'none'
      }, 2000)
    }
  }
}

function removeCornerTilesFromGettingClickEvents (array, element) {
  const index = array.indexOf(element)
  array.splice(index, 1)
}

function fillInColorsWithPreviousColors (corners) {
  const color1 = document.querySelector('.color1')
  const color2 = document.querySelector('.color2')
  const color3 = document.querySelector('.color3')
  const color4 = document.querySelector('.color4')

  const prevColor1 = rgbToHex(corners['tl'][0], corners['tl'][1], corners['tl'][2])
  const prevColor2 = rgbToHex(corners['tr'][0], corners['tr'][1], corners['tr'][2])
  const prevColor3 = rgbToHex(corners['bl'][0], corners['bl'][1], corners['bl'][2])
  const prevColor4 = rgbToHex(corners['br'][0], corners['br'][1], corners['br'][2])

  color1.value = prevColor1
  color2.value = prevColor2
  color3.value = prevColor3
  color4.value = prevColor4
}

function toggleFixedTileIconColor () {
  const fixedIcons = document.querySelectorAll('.fa-circle')
  const icons = Array.from(fixedIcons)

  icons.forEach((icon) => {
    icon.style.color = 'black'
  })
}

function animateGridCountdownToShuffle () {
  const grid = document.querySelector('.grid')

  grid.style.transform = 'scale(1.05)'
  setTimeout(() => {
    grid.style.transform = 'scale(1)'

    setTimeout(() => {
      grid.style.transform = 'scale(1.05)'

      setTimeout(() => {
        grid.style.transform = 'scale(1)'

        setTimeout(() => {
          grid.style.transform = 'scale(1.05)'

          setTimeout(() => {
            grid.style.transform = 'scale(1)'
          }, 500)
        }, 500)
      }, 500)
    }, 500)
  }, 500)
}

function colorInSolutionGrid () {
  const solutionTiles = document.querySelectorAll('.soln-tile')
  const solution = Array.from(solutionTiles)

  solution.forEach((solntile) => {
    const id = solntile.id.replace('S', '')
    solntile.style.background = originalGrid[id]
  })
}

function updateHintValue (correctTilesObj) {
  const progress = document.querySelector('.progress')
  const progressBar = document.querySelector('.progress-bar')

  const arrOfWhetherTileColorIsCorrect = Object.values(correctTilesObj)
  const numTiles = arrOfWhetherTileColorIsCorrect.length
  let numTrue = 0
  let numFalse = 0

  arrOfWhetherTileColorIsCorrect.forEach((bool) => {
    if (bool) {
      numTrue++
    } else {
      numFalse++
    }
  })

  const percentageOfTilesCorrect = Math.ceil((numTrue / numTiles) * 100)
  progressBar.style.width = `${percentageOfTilesCorrect}%`
  progressBar.style.ariaValuenow = `${percentageOfTilesCorrect}`
  progressBar.textContent = `${percentageOfTilesCorrect}%`
}
