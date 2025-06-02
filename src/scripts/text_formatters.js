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
