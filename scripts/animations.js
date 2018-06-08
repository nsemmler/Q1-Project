// Pulses the grid before shuffling
function animateGridCountdownToShuffle () {
  const grid = document.querySelector('.grid')

  grid.style.transform = 'scale(1.05)'
  setTimeout(() => {
    grid.style.transform = 'scale(1)'

    setTimeout(() => {
      grid.style.transform = 'scale(1.05)'

      setTimeout(() => {
        grid.style.transform = 'scale(1)'

        setTimeout(() => {
          grid.style.transform = 'scale(1.05)'

          setTimeout(() => {
            grid.style.transform = 'scale(1)'
          }, 500)
        }, 500)
      }, 500)
    }, 500)
  }, 500)
}

// Overlay banner if won
function displayBannerIfWon (correctTilesObj) {
  let correctSolution = [...new Set(Object.values(correctTilesObj))]
  if (correctSolution.length === 1 && correctSolution[0] === true) {
    const alert = document.querySelector('.winner-alert')

    if (alert.style.display == 'none') {
      alert.style.display = 'flex'

      setTimeout(() => {
        alert.style.display = 'none'
      }, 5000)
    }
  }
}
