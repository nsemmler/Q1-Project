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
})
