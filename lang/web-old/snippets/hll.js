const pow_2_32 = 0xFFFFFFFF + 1

const log2 = (a) =>
  Math.log(a) / Math.LN2

const rank = (hash, max) => {
  let r = 1
  while ((hash & 1) == 0 && r <= max) {
    ++r
    hash >>>= 1
  }
  return r
}


const hyperLogLog (stdError) {
  let m = 1.04 / stdError
  const k = Math.ceil(log2(m * m)), k_comp = 32 - k
  m = Math.pow(2, k)

  const alphaM = m == 16 ? 0.673
    : m == 32 ? 0.697
    : m == 64 ? 0.709
    : 0.7213 / (1 + 1.079 / m)

  let M = []
  for (let i = 0; i < m; ++i) {
    M[i] = 0
  }

  const merge = (other) => {
    for (let i = 0; i < m; i++) {
      M[i] = Math.max(M[i], other.buckets[i])
    }
  }

  const count = (hash) => {
    if (hash !== undefined) {
      const j = hash >>> k_comp
      M[j] = Math.max(M[j], rank(hash, k_comp))
    } else {
      let c = 0.0
      for (let i = 0; i < m; ++i) {
        c += 1 / Math.pow(2, M[i])
      }
      let E = alphaM * m * m / c

      if (E <= 5/2 * m) {
        let V = 0
        for (let i = 0; i < m; ++i) {
          if (M[i] == 0) {
            ++V
          }
        }
        if (V > 0) {
          E = m * Math.log(m / V)
        }
      } else if (E > 1/30 * pow_2_32) {
        E = -pow_2_32 * Math.log(1 - E / pow_2_32)
      }

      return E
    }
  }

  return { count, merge, buckets: M }
}
