const asciiToBinary = (s = '') =>
  Array.from(s).map((c) =>
    c.charCodeAt(0).toString(2)
  ).join(' ')
