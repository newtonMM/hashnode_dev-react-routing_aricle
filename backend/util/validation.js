function isValidText(value) {
  return value && value.trim().length > 0;
}

function isValidPrice(value) {
  return value && value.trim().length > 0;
}

exports.isValidText = isValidText;
exports.isValidPrice = isValidPrice;
