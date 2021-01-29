// nested recursive
const mc91a = (n) =>
  n > 100
    ? n - 10
    : mc91a(mc91a(n + 11))

// tail recusive
const mc91b = (n) =>
  mc91x(n, 1)

const mc91x = (n, c) =>
  c !== 0
    ? n > 100
      ? mc91x(n - 10, c - 1)
      : mc91x(n + 11, c + 1)
    : n
