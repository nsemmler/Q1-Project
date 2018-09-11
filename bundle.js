(function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){
// if localStorage exists, fill in User colors with previous
var storedCornerInfo = localStorage.getItem('4corners')
var originalGrid = {}
let corners = ''
if (storedCornerInfo) {
  corners = JSON.parse(storedCornerInfo)
  fillInColorsWithPreviousColors(corners)
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

// Generates empty <divs> within the grid
createGrid()

// Checks if user won after every tile swap
function checkUserAnswer (correctTilesObj) {
  const allTiles = document.querySelectorAll('.tile')
  const tiles = Array.from(allTiles)
  let originalIndex = 1

  compareTileColors(tiles, originalIndex)
  updateHintValue(correctTilesObj)
  displayBannerIfWon(correctTilesObj)
}

// Updates % of tiles in correct place after every swap
function updateHintValue (correctTilesObj) {
  const progress = document.querySelector('.progress')
  const progressBar = document.querySelector('.progress-bar')

  const arrOfWhetherTileColorIsCorrect = Object.values(correctTilesObj)
  const numTiles = arrOfWhetherTileColorIsCorrect.length
  let numTrue = 0
  let numFalse = 0

  arrOfWhetherTileColorIsCorrect.forEach((bool) => {
    if (bool) { numTrue++ } else { numFalse++ }
  })

  const percentageOfTilesCorrect = Math.ceil((numTrue / numTiles) * 100)
  progressBar.style.width = `${percentageOfTilesCorrect}%`
  progressBar.style.ariaValuenow = `${percentageOfTilesCorrect}`
}

// function animateTileSwap (firstTile, secondTile) {
// }

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

},{}]},{},[1]);
