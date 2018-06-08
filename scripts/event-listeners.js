const instructionsdiv = document.querySelector('.rules-header-and-icon')
const rules = document.querySelector('.rules')
const rulesbtn = document.querySelector('.instructionsbtn')
const rulesicon = document.querySelector('.rulesicon')
const mirror = document.querySelector('.mirror')
const hint = document.querySelector('.hint')
const submit = document.querySelector('.create-grid')
let mirrorAcc = 0

// Click Submit button:
submit.addEventListener('click', (event) => {
  event.preventDefault()

  cornersInfo = fetchCornersInfo()
  localStorage.setItem('4corners', JSON.stringify(cornersInfo))
  originalGrid = generateGrid(6, 10)

  reclickShowSolutionBtnIfSolutionShown ()
  createSolutionGrid(originalGrid)
  colorInSolutionGrid()
  toggleFixedTileIconColor()
  animateGridCountdownToShuffle()

  setTimeout(() => {
    scrambleGrid()
    addClickEventsToTiles()
    mirror.style.display = 'block'
    hint.style.display = 'block'
  }, 3000)
})

// Click Mirror button:
mirror.addEventListener('click', (event) => {
  event.preventDefault()

  mirrorAcc++
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
  if (progress.style.opacity === '0') {
    progress.style.opacity = '1'
  } else {
    progress.style.opacity = '0'
  }
})

// Click Show Instructions (button or icon next to it):
if (document.documentElement.clientWidth >= 700) {
  rulesbtn.textContent = 'Instructions'
  rulesbtn.classList = 'instructionsbtn'
  instructionsdiv.removeChild(rulesicon)
  rules.classList = 'rules'
} else {
  rulesbtnOnClick()
  rulesiconOnClick()
}

function rulesbtnOnClick () {
  rulesbtn.addEventListener('click', (event) => {
    event.preventDefault()

    if (rules.classList.contains('show')) {
      rulesbtn.textContent = 'View Instructions'
      rulesicon.className = 'fas fa-angle-down rulesicon'
    } else {
      rulesbtn.textContent = 'Hide Instructions'
      rulesicon.className = 'fas fa-angle-up rulesicon'
    }
  })
}

function rulesiconOnClick () {
  rulesicon.addEventListener('click', (event) => {
    event.preventDefault()

    if (rules.classList.contains('show')) {
      rulesbtn.textContent = 'View Instructions'
      rulesicon.className = 'fas fa-angle-down rulesicon'
    } else {
      rulesbtn.textContent = 'Hide Instructions'
      rulesicon.className = 'fas fa-angle-up rulesicon'
    }
  })
}

function fetchCornersInfo () {
  const color1 = document.querySelector('.color1')
  const color2 = document.querySelector('.color2')
  const color3 = document.querySelector('.color3')
  const color4 = document.querySelector('.color4')

  const cornersInfo = {
    'tl': hexToRgb(color1.value),
    'tr': hexToRgb(color2.value),
    'bl': hexToRgb(color3.value),
    'br': hexToRgb(color4.value)
  }

  return cornersInfo
}

function reclickShowSolutionBtnIfSolutionShown () {
  if (mirrorAcc % 2 === 1 && mirrorAcc > 0) {
    mirror.click()
  }
}
