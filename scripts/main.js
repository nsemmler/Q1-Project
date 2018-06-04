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

  // localstorage save color info
  // do grid stuff
  // swap hidden div attributes (I think that's how I'll do it)
  // display grid
})
