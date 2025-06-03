const titleCase = (str) => {
  if (!str || typeof str !== 'string') {
    return '';
  }
  let normalizedStr = str.replace(/[-_]/g, ' ');
  normalizedStr = normalizedStr.replace(/[^\w\s]/g, '');
  normalizedStr = normalizedStr.split(' ')
    .map(word => {
      if (word.length === 0) return '';
      return word[0].toUpperCase() + word.slice(1).toLowerCase();
    })
    .join(' ');
  normalizedStr = normalizedStr.replace(/\s+/g, ' ').trim();
  return normalizedStr;
}

const shuffle = (array) => {
  for (var i = array.length - 1; i > 0; i--) {
    var j = Math.floor(Math.random() * (i + 1));
    var temp = array[i];
    array[i] = array[j];
    array[j] = temp;
  }
  return array
}
