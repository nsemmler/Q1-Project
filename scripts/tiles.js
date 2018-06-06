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
