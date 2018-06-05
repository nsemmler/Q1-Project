var storedCornerInfo = localStorage.getItem('4corners')
let sample = ''
if (storedCornerInfo) sample = JSON.parse(storedCornerInfo)

main()

function main () {

  colorCorners()

  const tiles = document.querySelectorAll('.tile')
  let tilesArr = Array.from(tiles)
  let coloredIndexesArr = []
  let toprowAcc = 1
  let lowrowAcc = 1
  let firstcolAcc = 1
  let lastcolAcc = 1

  tilesArr.forEach((tile) => {
    if (tile.id == '2' || tile.id == '3') {
      colorTopRow(tile, toprowAcc)
      toprowAcc++
    } else if (tile.id == '14' || tile.id == '15') {
      colorBottomRow(tile, lowrowAcc)
      lowrowAcc++
    } else if (tile.id == '5' || tile.id == '9') {
      colorFirstColumn(tile, firstcolAcc)
      firstcolAcc++
    } else if (tile.id == '8' || tile.id == '12') {
      colorLastColumn(tile, lastcolAcc)
      lastcolAcc++
    }
  })

  colorRemainingTiles(tilesArr) // by row AND column
}

function colorCorners() {
  for (let key in sample) {
    switch (key) {
      case 'tl':
        const topleft = document.querySelector('.tl')
        topleft.style.background = 'rgb(' + [sample[`${key}`][0], sample[`${key}`][1], sample[`${key}`][2]].join(',') + ')'
        break
      case 'tr':
        const topright = document.querySelector('.tr')
        topright.style.background = 'rgb(' + [sample[`${key}`][0], sample[`${key}`][1], sample[`${key}`][2]].join(',') + ')'
        break
      case 'bl':
        const bottomleft = document.querySelector('.bl')
        bottomleft.style.background = 'rgb(' + [sample[`${key}`][0], sample[`${key}`][1], sample[`${key}`][2]].join(',') + ')'
        break
      case 'br':
        const bottomright = document.querySelector('.br')
        bottomright.style.background = 'rgb(' + [sample[`${key}`][0], sample[`${key}`][1], sample[`${key}`][2]].join(',') + ')'
        break
      default:
        //
    }
  }
}

function colorTopRow (tile, toprowAcc) {
  const startR = sample['tl'][0]
  const startG = sample['tl'][1]
  const startB = sample['tl'][2]
  const endR = sample['tr'][0]
  const endG = sample['tr'][1]
  const endB = sample['tr'][2]

  const rStep = Math.round((endR - startR) / 3)
  const gStep = Math.round((endG - startG) / 3)
  const bStep = Math.round((endB - startB) / 3)

  const tileRColor = startR + (toprowAcc * rStep)
  const tileGColor = startG + (toprowAcc * gStep)
  const tileBColor = startB + (toprowAcc * bStep)

  tile.style.background = 'rgb(' + [tileRColor, tileGColor, tileBColor].join(',') + ')'
}

function colorBottomRow (tile, lowrowAcc) {
  const startR = sample['bl'][0]
  const startG = sample['bl'][1]
  const startB = sample['bl'][2]
  const endR = sample['br'][0]
  const endG = sample['br'][1]
  const endB = sample['br'][2]

  const rStep = Math.round((endR - startR) / 3)
  const gStep = Math.round((endG - startG) / 3)
  const bStep = Math.round((endB - startB) / 3)

  const tileRColor = startR + (lowrowAcc * rStep)
  const tileGColor = startG + (lowrowAcc * gStep)
  const tileBColor = startB + (lowrowAcc * bStep)

  tile.style.background = 'rgb(' + [tileRColor, tileGColor, tileBColor].join(',') + ')'
}

function colorFirstColumn (tile, firstcolAcc) {
  const startR = sample['tl'][0]
  const startG = sample['tl'][1]
  const startB = sample['tl'][2]
  const endR = sample['bl'][0]
  const endG = sample['bl'][1]
  const endB = sample['bl'][2]

  const rStep = Math.round((endR - startR) / 3)
  const gStep = Math.round((endG - startG) / 3)
  const bStep = Math.round((endB - startB) / 3)

  const tileRColor = startR + (firstcolAcc * rStep)
  const tileGColor = startG + (firstcolAcc * gStep)
  const tileBColor = startB + (firstcolAcc * bStep)

  tile.style.background = 'rgb(' + [tileRColor, tileGColor, tileBColor].join(',') + ')'
}

function colorLastColumn (tile, lastcolAcc) {
  const startR = sample['tr'][0]
  const startG = sample['tr'][1]
  const startB = sample['tr'][2]
  const endR = sample['br'][0]
  const endG = sample['br'][1]
  const endB = sample['br'][2]

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
