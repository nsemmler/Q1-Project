function hexToRgb(hex) {
  var result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  const rVal = parseInt(result[1], 16)
  const gVal = parseInt(result[2], 16)
  const bVal = parseInt(result[3], 16)

  return result ? [rVal, gVal, bVal] : null
}

function componentToHex(c) {
  const hex = c.toString(16)
  return hex.length == 1 ? "0" + hex : hex
}

function rgbToHex(r, g, b) {
  return "#" + componentToHex(r) + componentToHex(g) + componentToHex(b)
}
