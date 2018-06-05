const submit = document.querySelector('.create-grid')

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

// On Submit:
submit.addEventListener('click', (event) => {
  event.preventDefault()

  const r1Val = parseInt(r1Input.value)
  const g1Val = parseInt(g1Input.value)
  const b1Val = parseInt(b1Input.value)
  const r2Val = parseInt(r2Input.value)
  const g2Val = parseInt(g2Input.value)
  const b2Val = parseInt(b2Input.value)
  const r3Val = parseInt(r3Input.value)
  const g3Val = parseInt(g3Input.value)
  const b3Val = parseInt(b3Input.value)
  const r4Val = parseInt(r4Input.value)
  const g4Val = parseInt(g4Input.value)
  const b4Val = parseInt(b4Input.value)

  const cornersInfo = {
    'tl': [r1Val, g1Val, b1Val],
    'tr': [r2Val, g2Val, b2Val],
    'bl': [r3Val, g3Val, b3Val],
    'br': [r4Val, g4Val, b4Val]
  }

  localStorage.setItem('4corners', JSON.stringify(cornersInfo))
  generateGrid()
})

////////////////////////////////////////////////////////////////////////////////

function generateGrid () {
  var storedCornerInfo = localStorage.getItem('4corners')
  let corners = ''
  if (storedCornerInfo) corners = JSON.parse(storedCornerInfo)

  colorCorners(corners)

  const tiles = document.querySelectorAll('.tile')
  let tilesArr = Array.from(tiles)
  let coloredIndexesArr = []
  let toprowAcc = 1
  let lowrowAcc = 1
  let firstcolAcc = 1
  let lastcolAcc = 1

  tilesArr.forEach((tile) => {
    if (tile.id == '2' || tile.id == '3') {
      colorTopRow(tile, toprowAcc, corners)
      toprowAcc++
    } else if (tile.id == '14' || tile.id == '15') {
      colorBottomRow(tile, lowrowAcc, corners)
      lowrowAcc++
    } else if (tile.id == '5' || tile.id == '9') {
      colorFirstColumn(tile, firstcolAcc, corners)
      firstcolAcc++
    } else if (tile.id == '8' || tile.id == '12') {
      colorLastColumn(tile, lastcolAcc, corners)
      lastcolAcc++
    }
  })

  colorRemainingTiles(tilesArr) // by row AND column
}

function colorCorners(corners) {
  for (let key in corners) {
    switch (key) {
      case 'tl':
        const topleft = document.querySelector('.tl')
        topleft.style.background = 'rgb(' + [corners[`${key}`][0], corners[`${key}`][1], corners[`${key}`][2]].join(',') + ')'
        break
      case 'tr':
        const topright = document.querySelector('.tr')
        topright.style.background = 'rgb(' + [corners[`${key}`][0], corners[`${key}`][1], corners[`${key}`][2]].join(',') + ')'
        break
      case 'bl':
        const bottomleft = document.querySelector('.bl')
        bottomleft.style.background = 'rgb(' + [corners[`${key}`][0], corners[`${key}`][1], corners[`${key}`][2]].join(',') + ')'
        break
      case 'br':
        const bottomright = document.querySelector('.br')
        bottomright.style.background = 'rgb(' + [corners[`${key}`][0], corners[`${key}`][1], corners[`${key}`][2]].join(',') + ')'
        break
      default:
        //
    }
  }
}

function colorTopRow (tile, toprowAcc, corners) {
  const startR = corners['tl'][0]
  const startG = corners['tl'][1]
  const startB = corners['tl'][2]
  const endR = corners['tr'][0]
  const endG = corners['tr'][1]
  const endB = corners['tr'][2]

  const rStep = Math.round((endR - startR) / 3)
  const gStep = Math.round((endG - startG) / 3)
  const bStep = Math.round((endB - startB) / 3)

  const tileRColor = startR + (toprowAcc * rStep)
  const tileGColor = startG + (toprowAcc * gStep)
  const tileBColor = startB + (toprowAcc * bStep)

  tile.style.background = 'rgb(' + [tileRColor, tileGColor, tileBColor].join(',') + ')'
}

function colorBottomRow (tile, lowrowAcc, corners) {
  const startR = corners['bl'][0]
  const startG = corners['bl'][1]
  const startB = corners['bl'][2]
  const endR = corners['br'][0]
  const endG = corners['br'][1]
  const endB = corners['br'][2]

  const rStep = Math.round((endR - startR) / 3)
  const gStep = Math.round((endG - startG) / 3)
  const bStep = Math.round((endB - startB) / 3)

  const tileRColor = startR + (lowrowAcc * rStep)
  const tileGColor = startG + (lowrowAcc * gStep)
  const tileBColor = startB + (lowrowAcc * bStep)

  tile.style.background = 'rgb(' + [tileRColor, tileGColor, tileBColor].join(',') + ')'
}

function colorFirstColumn (tile, firstcolAcc, corners) {
  const startR = corners['tl'][0]
  const startG = corners['tl'][1]
  const startB = corners['tl'][2]
  const endR = corners['bl'][0]
  const endG = corners['bl'][1]
  const endB = corners['bl'][2]

  const rStep = Math.round((endR - startR) / 3)
  const gStep = Math.round((endG - startG) / 3)
  const bStep = Math.round((endB - startB) / 3)

  const tileRColor = startR + (firstcolAcc * rStep)
  const tileGColor = startG + (firstcolAcc * gStep)
  const tileBColor = startB + (firstcolAcc * bStep)

  tile.style.background = 'rgb(' + [tileRColor, tileGColor, tileBColor].join(',') + ')'
}

function colorLastColumn (tile, lastcolAcc, corners) {
  const startR = corners['tr'][0]
  const startG = corners['tr'][1]
  const startB = corners['tr'][2]
  const endR = corners['br'][0]
  const endG = corners['br'][1]
  const endB = corners['br'][2]

  const rStep = Math.round((endR - startR) / 3)
  const gStep = Math.round((endG - startG) / 3)
  const bStep = Math.round((endB - startB) / 3)

  const tileRColor = startR + (lastcolAcc * rStep)
  const tileGColor = startG + (lastcolAcc * gStep)
  const tileBColor = startB + (lastcolAcc * bStep)

  tile.style.background = 'rgb(' + [tileRColor, tileGColor, tileBColor].join(',') + ')'
}

function colorRemainingTiles (tilesArr) {
  let tileColors = {}
  let rowAcc1 = 1
  let rowAcc2 = 1
  let colAcc1 = 1
  let colAcc2 = 1

  // by row
  tilesArr.forEach((tile) => {
    if (tile.id == '6' || tile.id == '7') {
      const startR = parseInt(tilesArr[4].style.background.replace(/ /g, '').replace('rgb(', '').replace(')', '').split(',')[0])
      const startG = parseInt(tilesArr[4].style.background.replace(/ /g, '').replace('rgb(', '').replace(')', '').split(',')[1])
      const startB = parseInt(tilesArr[4].style.background.replace(/ /g, '').replace('rgb(', '').replace(')', '').split(',')[2])
      const endR = parseInt(tilesArr[7].style.background.replace(/ /g, '').replace('rgb(', '').replace(')', '').split(',')[0])
      const endG = parseInt(tilesArr[7].style.background.replace(/ /g, '').replace('rgb(', '').replace(')', '').split(',')[1])
      const endB = parseInt(tilesArr[7].style.background.replace(/ /g, '').replace('rgb(', '').replace(')', '').split(',')[2])

      const rStep = Math.round((endR - startR) / 3)
      const gStep = Math.round((endG - startG) / 3)
      const bStep = Math.round((endB - startB) / 3)

      const tileRColor = startR + (rowAcc1 * rStep)
      const tileGColor = startG + (rowAcc1 * gStep)
      const tileBColor = startB + (rowAcc1 * bStep)

      if (tileColors[tile.id]) {
        tileColors[tile.id][1] = [tileRColor, tileGColor, tileBColor]
      } else {
        tileColors[tile.id] = [[tileRColor, tileGColor, tileBColor], ]
      }

      rowAcc1++
    }

    if (tile.id == '10' || tile.id == '11') {
      const startR = parseInt(tilesArr[8].style.background.replace(/ /g, '').replace('rgb(', '').replace(')', '').split(',')[0])
      const startG = parseInt(tilesArr[8].style.background.replace(/ /g, '').replace('rgb(', '').replace(')', '').split(',')[1])
      const startB = parseInt(tilesArr[8].style.background.replace(/ /g, '').replace('rgb(', '').replace(')', '').split(',')[2])
      const endR = parseInt(tilesArr[11].style.background.replace(/ /g, '').replace('rgb(', '').replace(')', '').split(',')[0])
      const endG = parseInt(tilesArr[11].style.background.replace(/ /g, '').replace('rgb(', '').replace(')', '').split(',')[1])
      const endB = parseInt(tilesArr[11].style.background.replace(/ /g, '').replace('rgb(', '').replace(')', '').split(',')[2])

      const rStep = Math.round((endR - startR) / 3)
      const gStep = Math.round((endG - startG) / 3)
      const bStep = Math.round((endB - startB) / 3)

      const tileRColor = startR + (rowAcc2 * rStep)
      const tileGColor = startG + (rowAcc2 * gStep)
      const tileBColor = startB + (rowAcc2 * bStep)

      if (tileColors[tile.id]) {
        tileColors[tile.id][1] = [tileRColor, tileGColor, tileBColor]
      } else {
        tileColors[tile.id] = [[tileRColor, tileGColor, tileBColor], ]
      }
      rowAcc2++
    }
  })

  // by column
  tilesArr.forEach((tile) => {
    if (tile.id == '6' || tile.id == '10') {
      const startR = parseInt(tilesArr[1].style.background.replace(/ /g, '').replace('rgb(', '').replace(')', '').split(',')[0])
      const startG = parseInt(tilesArr[1].style.background.replace(/ /g, '').replace('rgb(', '').replace(')', '').split(',')[1])
      const startB = parseInt(tilesArr[1].style.background.replace(/ /g, '').replace('rgb(', '').replace(')', '').split(',')[2])
      const endR = parseInt(tilesArr[13].style.background.replace(/ /g, '').replace('rgb(', '').replace(')', '').split(',')[0])
      const endG = parseInt(tilesArr[13].style.background.replace(/ /g, '').replace('rgb(', '').replace(')', '').split(',')[1])
      const endB = parseInt(tilesArr[13].style.background.replace(/ /g, '').replace('rgb(', '').replace(')', '').split(',')[2])

      const rStep = Math.round((endR - startR) / 3)
      const gStep = Math.round((endG - startG) / 3)
      const bStep = Math.round((endB - startB) / 3)

      const tileRColor = startR + (colAcc1 * rStep)
      const tileGColor = startG + (colAcc1 * gStep)
      const tileBColor = startB + (colAcc1 * bStep)

      if (tileColors[tile.id]) {
        tileColors[tile.id][1] = [tileRColor, tileGColor, tileBColor]
      } else {
        tileColors[tile.id] = [[tileRColor, tileGColor, tileBColor], ]
      }
      colAcc1++
    }

    if (tile.id == '7' || tile.id == '11') {
      const startR = parseInt(tilesArr[2].style.background.replace(/ /g, '').replace('rgb(', '').replace(')', '').split(',')[0])
      const startG = parseInt(tilesArr[2].style.background.replace(/ /g, '').replace('rgb(', '').replace(')', '').split(',')[1])
      const startB = parseInt(tilesArr[2].style.background.replace(/ /g, '').replace('rgb(', '').replace(')', '').split(',')[2])
      const endR = parseInt(tilesArr[14].style.background.replace(/ /g, '').replace('rgb(', '').replace(')', '').split(',')[0])
      const endG = parseInt(tilesArr[14].style.background.replace(/ /g, '').replace('rgb(', '').replace(')', '').split(',')[1])
      const endB = parseInt(tilesArr[14].style.background.replace(/ /g, '').replace('rgb(', '').replace(')', '').split(',')[2])

      const rStep = Math.round((endR - startR) / 3)
      const gStep = Math.round((endG - startG) / 3)
      const bStep = Math.round((endB - startB) / 3)

      const tileRColor = startR + (colAcc2 * rStep)
      const tileGColor = startG + (colAcc2 * gStep)
      const tileBColor = startB + (colAcc2 * bStep)

      if (tileColors[tile.id]) {
        tileColors[tile.id][1] = [tileRColor, tileGColor, tileBColor]
      } else {
        tileColors[tile.id] = [[tileRColor, tileGColor, tileBColor], ]
      }
      colAcc2++
    }
  })

  for (let id in tileColors) {
    const arrOfRGBs = tileColors[id]
    const rVal = Math.round(arrOfRGBs[0][0] + arrOfRGBs[1][0] / 2)
    const gVal = Math.round(arrOfRGBs[0][1] + arrOfRGBs[1][1] / 2)
    const bVal = Math.round(arrOfRGBs[0][2] + arrOfRGBs[1][2] / 2)
    const tile = document.getElementById(id)
    tile.style.background = 'rgb(' + [rVal, gVal, bVal].join(',') + ')'
  }
}
