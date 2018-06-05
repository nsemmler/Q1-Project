function gridTemplate (acc) {
  let answer = ''

  if (acc === 1) {
    answer = `<div class="tile tl" id="${acc}"></div>`
  } else if (acc === 6) {
    answer = `<div class="tile tr" id="${acc}"></div>`
  } else if (acc === 55) {
    answer = `<div class="tile bl" id="${acc}"></div>`
  } else if (acc === 60) {
    answer = `<div class="tile br" id="${acc}"></div>`
  } else {
    answer = `<div class="tile" id="${acc}"></div>`
  }

  return answer
}
