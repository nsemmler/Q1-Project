const submit = document.querySelector('.create-grid')

submit.addEventListener('click', (event) => {
  event.preventDefault()

  const r1Val = document.querySelector('.color1-r').value
  const g1Val = document.querySelector('.color1-g').value
  const b1Val = document.querySelector('.color1-b').value
  const r2Val = document.querySelector('.color2-r').value
  const g2Val = document.querySelector('.color2-g').value
  const b2Val = document.querySelector('.color2-b').value
  const r3Val = document.querySelector('.color3-r').value
  const g3Val = document.querySelector('.color3-g').value
  const b3Val = document.querySelector('.color3-b').value
  const r4Val = document.querySelector('.color4-r').value
  const g4Val = document.querySelector('.color4-g').value
  const b4Val = document.querySelector('.color4-b').value


  console.log(`RGB1: (${r1Val},${g1Val},${b1Val})`)
  console.log(`RGB2: (${r2Val},${g2Val},${b2Val})`)
  console.log(`RGB3: (${r3Val},${g3Val},${b3Val})`)
  console.log(`RGB4: (${r4Val},${g4Val},${b4Val})`)
})
