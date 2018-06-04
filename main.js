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

  const color1Sample = document.querySelector('.sample1')
  const color2Sample = document.querySelector('.sample2')
  const color3Sample = document.querySelector('.sample3')
  const color4Sample = document.querySelector('.sample4')

  color1Sample.style.background = 'rgb(' + [r1Val, g1Val, b1Val].join(',') + ')'
  color2Sample.style.background = 'rgb(' + [r2Val, g2Val, b2Val].join(',') + ')'
  color3Sample.style.background = 'rgb(' + [r3Val, g3Val, b3Val].join(',') + ')'
  color4Sample.style.background = 'rgb(' + [r4Val, g4Val, b4Val].join(',') + ')'
})
