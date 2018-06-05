function generateGrid (gridWidth, gridHeight) {
  const numTiles = gridWidth * gridHeight
  const allTilesArr = [...Array(numTiles).keys()].map(x => x+1)
  const toprowArr = [...Array(gridWidth).keys()].map(x => x+1)
  toprowArr.pop()
  toprowArr.shift()
  const minIDLowRow = numTiles - gridWidth + 1

  let topRowIDs = []
  let lowRowIDs = []
  let firstColIDs = []
  let lastColIDs = []

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
    const tileID = parseInt(tile.id)
    if (toprowArr.includes(tileID)) {
      colorTopRow(tile, toprowAcc, corners, gridWidth)
      topRowIDs.push(tileID)
      toprowAcc++
    } else if (tileID > minIDLowRow && tileID != numTiles) {
      colorBottomRow(tile, lowrowAcc, corners, gridWidth)
      lowRowIDs.push(tileID)
      lowrowAcc++
    } else if (tileID % gridWidth == 1 && tileID != 1 && tileID != minIDLowRow) {
      colorFirstColumn(tile, firstcolAcc, corners, gridHeight)
      firstColIDs.push(tileID)
      firstcolAcc++
    } else if (tileID % gridWidth == 0 && tileID != gridWidth && tileID != numTiles) {
      colorLastColumn(tile, lastcolAcc, corners, gridHeight)
      lastColIDs.push(tileID)
      lastcolAcc++
    }
  })

  colorRemainingTiles(tilesArr, topRowIDs, lowRowIDs, firstColIDs, lastColIDs, numTiles, gridWidth, gridHeight)
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

function colorTopRow (tile, toprowAcc, corners, rowSteps) {
  const startR = corners['tl'][0]
  const startG = corners['tl'][1]
  const startB = corners['tl'][2]

  const endR = corners['tr'][0]
  const endG = corners['tr'][1]
  const endB = corners['tr'][2]

  const rStep = Math.round((endR - startR) / rowSteps)
  const gStep = Math.round((endG - startG) / rowSteps)
  const bStep = Math.round((endB - startB) / rowSteps)

  const tileRColor = startR + (toprowAcc * rStep)
  const tileGColor = startG + (toprowAcc * gStep)
  const tileBColor = startB + (toprowAcc * bStep)

  tile.style.background = 'rgb(' + [tileRColor, tileGColor, tileBColor].join(',') + ')'
}

function colorBottomRow (tile, lowrowAcc, corners, rowSteps) {
  const startR = corners['bl'][0]
  const startG = corners['bl'][1]
  const startB = corners['bl'][2]

  const endR = corners['br'][0]
  const endG = corners['br'][1]
  const endB = corners['br'][2]

  const rStep = Math.round((endR - startR) / rowSteps)
  const gStep = Math.round((endG - startG) / rowSteps)
  const bStep = Math.round((endB - startB) / rowSteps)

  const tileRColor = startR + (lowrowAcc * rStep)
  const tileGColor = startG + (lowrowAcc * gStep)
  const tileBColor = startB + (lowrowAcc * bStep)

  tile.style.background = 'rgb(' + [tileRColor, tileGColor, tileBColor].join(',') + ')'
}

function colorFirstColumn (tile, firstcolAcc, corners, colSteps) {
  const startR = corners['tl'][0]
  const startG = corners['tl'][1]
  const startB = corners['tl'][2]

  const endR = corners['bl'][0]
  const endG = corners['bl'][1]
  const endB = corners['bl'][2]

  const rStep = Math.round((endR - startR) / colSteps)
  const gStep = Math.round((endG - startG) / colSteps)
  const bStep = Math.round((endB - startB) / colSteps)

  const tileRColor = startR + (firstcolAcc * rStep)
  const tileGColor = startG + (firstcolAcc * gStep)
  const tileBColor = startB + (firstcolAcc * bStep)

  tile.style.background = 'rgb(' + [tileRColor, tileGColor, tileBColor].join(',') + ')'
}

function colorLastColumn (tile, lastcolAcc, corners, colSteps) {
  const startR = corners['tr'][0]
  const startG = corners['tr'][1]
  const startB = corners['tr'][2]

  const endR = corners['br'][0]
  const endG = corners['br'][1]
  const endB = corners['br'][2]

  const rStep = Math.round((endR - startR) / colSteps)
  const gStep = Math.round((endG - startG) / colSteps)
  const bStep = Math.round((endB - startB) / colSteps)

  const tileRColor = startR + (lastcolAcc * rStep)
  const tileGColor = startG + (lastcolAcc * gStep)
  const tileBColor = startB + (lastcolAcc * bStep)

  tile.style.background = 'rgb(' + [tileRColor, tileGColor, tileBColor].join(',') + ')'
}

function colorRemainingTiles (tilesArr, topRowIDs, lowRowIDs, firstColIDs, lastColIDs, numTiles, rowSteps, colSteps) {
  let tileColors = {}
  let rowindex = 0
  let colindex = 0
  let rowAcc = 1
  let colAcc = 1
  let modulusVal = 2

  // by row
  tilesArr.forEach((tile) => {
    const tileID = parseInt(tile.id)
    const startRowID = firstColIDs[rowindex]
    const endRowID =  lastColIDs[rowindex]

    if (tileID > startRowID && tileID < endRowID) {
      const startTile = document.getElementById(startRowID)
      const endTile = document.getElementById(endRowID)

      const startR = parseInt(startTile.style.background.replace(/ /g, '').replace('rgb(', '').replace(')', '').split(',')[0])
      const startG = parseInt(startTile.style.background.replace(/ /g, '').replace('rgb(', '').replace(')', '').split(',')[1])
      const startB = parseInt(startTile.style.background.replace(/ /g, '').replace('rgb(', '').replace(')', '').split(',')[2])

      const endR = parseInt(endTile.style.background.replace(/ /g, '').replace('rgb(', '').replace(')', '').split(',')[0])
      const endG = parseInt(endTile.style.background.replace(/ /g, '').replace('rgb(', '').replace(')', '').split(',')[1])
      const endB = parseInt(endTile.style.background.replace(/ /g, '').replace('rgb(', '').replace(')', '').split(',')[2])

      const rStep = Math.round((endR - startR) / rowSteps)
      const gStep = Math.round((endG - startG) / rowSteps)
      const bStep = Math.round((endB - startB) / rowSteps)

      const tileRColor = startR + (rowAcc * rStep)
      const tileGColor = startG + (rowAcc * gStep)
      const tileBColor = startB + (rowAcc * bStep)

      if (tileColors[tileID]) {
        tileColors[tileID][1] = [tileRColor, tileGColor, tileBColor]
      } else {
        tileColors[tileID] = [[tileRColor, tileGColor, tileBColor], null]
      }
      rowAcc++
    }

    if (tileID % rowSteps === 0 && tileID > rowSteps) {
      rowindex++
      rowAcc = 1
    }
  })

  const numOfCols = [...Array(rowSteps - 2).keys()].map(x => x+1) // [1, 2, 3, 4]
  const arrOfEmptyColTiles = [...Array(colSteps - 2).keys()].map(x => x+1) // [1, 2, 3, 4, 5, 6, 7, 8]
  const arrLength = arrOfEmptyColTiles.length // 8

  numOfCols.forEach((column) => {
    arrOfEmptyColTiles.forEach((index) => {
      const tileID = 6 * index + modulusVal
      const tile = document.getElementById(tileID)
      const startTile = document.getElementById(modulusVal)
      const endTile = document.getElementById(6 * (arrLength + 1) + modulusVal)

      const startR = parseInt(startTile.style.background.replace(/ /g, '').replace('rgb(', '').replace(')', '').split(',')[0])
      const startG = parseInt(startTile.style.background.replace(/ /g, '').replace('rgb(', '').replace(')', '').split(',')[1])
      const startB = parseInt(startTile.style.background.replace(/ /g, '').replace('rgb(', '').replace(')', '').split(',')[2])

      const endR = parseInt(endTile.style.background.replace(/ /g, '').replace('rgb(', '').replace(')', '').split(',')[0])
      const endG = parseInt(endTile.style.background.replace(/ /g, '').replace('rgb(', '').replace(')', '').split(',')[1])
      const endB = parseInt(endTile.style.background.replace(/ /g, '').replace('rgb(', '').replace(')', '').split(',')[2])

      const rStep = Math.round((endR - startR) / colSteps)
      const gStep = Math.round((endG - startG) / colSteps)
      const bStep = Math.round((endB - startB) / colSteps)

      const tileRColor = startR + (index * rStep)
      const tileGColor = startG + (index * gStep)
      const tileBColor = startB + (index * bStep)

      if (tileColors[tileID]) {
        tileColors[tileID][1] = [tileRColor, tileGColor, tileBColor]
      } else {
        tileColors[tileID] = [[tileRColor, tileGColor, tileBColor], ]
      }
      index++
    })

    index = 1
    modulusVal++ // increase value of X % 6
  })

  topRowIDs.forEach((id) => { if (tileColors[id]) delete tileColors[id] })
  lowRowIDs.forEach((id) => { if (tileColors[id]) delete tileColors[id] })
  firstColIDs.forEach((id) => { if (tileColors[id]) delete tileColors[id] })
  lastColIDs.forEach((id) => { if (tileColors[id]) delete tileColors[id] })

  for (let id in tileColors) {
    const arrOfRGBs = tileColors[id]
    // if (arrOfRGBs[0] === undefined || arrOfRGBs[1] === undefined) console.log(tileColors)
    const rVal = Math.round(arrOfRGBs[0][0] + arrOfRGBs[1][0] / 2)
    const gVal = Math.round(arrOfRGBs[0][1] + arrOfRGBs[1][1] / 2)
    const bVal = Math.round(arrOfRGBs[0][2] + arrOfRGBs[1][2] / 2)
    const tile = document.getElementById(id)
    tile.style.background = 'rgb(' + [rVal, gVal, bVal].join(',') + ')'
  }
}
