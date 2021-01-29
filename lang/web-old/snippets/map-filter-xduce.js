// map and filter transducers

const map = (f) =>
  (reducer) =>
    (acc, inp) =>
      reducer(acc, f(inp))

const filter = (pred) =>
  (reducer) =>
    (acc, inp) =>
      pred(inp)
        ? reducer(acc, inp)
        : acc

// example
const inc = map((a) => a + 1)
const lt3 = filter((a) => a < 3)
