function createGrid () {
  let array = Array.from(Array(60).keys())
  let acc = 1

  array.forEach((tile) => {
    const grid = document.querySelector('.grid')
    grid.innerHTML += gridTemplate(acc)
    acc++
  })
}

// function createSolutionGrid () {
//   let array = Array.from(Array(60).keys())
//   let acc = 1
//
//   array.forEach((tile) => {
//     const grid = document.querySelector('.grid-solution')
//     grid.innerHTML += gridTemplate(acc)
//     acc++
//   })
// }
