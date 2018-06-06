function gridTemplate (acc) {
  let answer = ''

  if (acc === 1) {
    answer = `<div class="tile tl fixedtile" id="${acc}"><i class="fas fa-circle"></i></div>`
  } else if (acc === 6) {
    answer = `<div class="tile tr fixedtile" id="${acc}"><i class="fas fa-circle"></i></div>`
  } else if (acc === 55) {
    answer = `<div class="tile bl fixedtile" id="${acc}"><i class="fas fa-circle"></i></div>`
  } else if (acc === 60) {
    answer = `<div class="tile br fixedtile" id="${acc}"><i class="fas fa-circle"></i></div>`
  } else {
    answer = `<div class="tile" id="${acc}"></div>`
  }

  return answer
}

function solutionTemplate (acc) {
  let answer = ''

  if (acc === 1) {
    answer = `<div class="soln-tile tl fixedtile" id="S${acc}"><i class="fas fa-circle"></i></div>`
  } else if (acc === 6) {
    answer = `<div class="soln-tile tr fixedtile" id="S${acc}"><i class="fas fa-circle"></i></div>`
  } else if (acc === 55) {
    answer = `<div class="soln-tile bl fixedtile" id="S${acc}"><i class="fas fa-circle"></i></div>`
  } else if (acc === 60) {
    answer = `<div class="soln-tile br fixedtile" id="S${acc}"><i class="fas fa-circle"></i></div>`
  } else {
    answer = `<div class="soln-tile" id="S${acc}"></div>`
  }

  return answer
}
