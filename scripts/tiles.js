function createGrid () {
  let array = Array.from(Array(60).keys())
  let acc = 1

  array.forEach((tile) => {
    const grid = document.querySelector('.grid')
    grid.innerHTML += gridTemplate(acc)
    acc++
  })
}

function createSolutionGrid (originalGrid) {
  const solution = document.querySelector('.solution')
  let array = Array.from(Array(60).keys())
  let acc = 1

  if (solution.innerHTML.includes('fixedtile')) solution.innerHTML = ''

  array.forEach((tile) => {
    solution.innerHTML += solutionTemplate(acc)
    acc++
  })
}

// Shuffle around tiles
let swapColorsObj = {}
let swappableIndexes = []

function scrambleGrid () {
  const allTiles = document.querySelectorAll('.tile')
  const tiles = Array.from(allTiles)

  fetchAndShuffleNonFixedTiles(tiles)
  applyShuffledGridColors(tiles)
}

function fetchAndShuffleNonFixedTiles (tiles) {
  tiles.forEach((tile) => {
    if (tile.classList.length === 1) {
      swapColorsObj[tile.id] = {'oldColor': tile.style.background, 'newColor': null }
    }
  })

  for (let index in swapColorsObj) { swappableIndexes.push(index) }
  swappableIndexes = shuffle(swappableIndexes)
}

function applyShuffledGridColors(tiles) {
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

// Swap colors of two tiles
let firstColor
let secondColor
let correctTilesObj = {}

function addClickEventsToTiles () {
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

      if (tile.classList.contains('selected')) {
        tile.classList.remove('selected')
      } else {
        tile.classList.add('selected')
      }

      swapTileColorsIfMultipleTilesSelected(tile)
    })
  })
}

function swapTileColorsIfMultipleTilesSelected (tile) {
  const selectedTilesInfo = document.querySelectorAll('.selected')
  let selectedTiles = Array.from(selectedTilesInfo)

  if (selectedTiles.length === 2) {
    const firstTile = selectedTiles[0]
    const secondTile = selectedTiles[1]

    firstColor = firstTile.style.background
    secondColor = secondTile.style.background
    firstTile.style.background = secondColor
    secondTile.style.background = firstColor

    // animateTileSwap(firstTile, secondTile)

    firstTile.classList.remove('selected')
    secondTile.classList.remove('selected')

    checkUserAnswer(correctTilesObj)
  }
}

// Compares two tiles
function compareTileColors (tiles, originalIndex) {
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
}

function toggleFixedTileIconColor () {
  const fixedIcons = document.querySelectorAll('.fa-circle')
  const icons = Array.from(fixedIcons)

  icons.forEach((icon) => {
    icon.style.color = 'black'
  })
}

function removeCornerTilesFromGettingClickEvents (array, element) {
  const index = array.indexOf(element)
  array.splice(index, 1)
}
