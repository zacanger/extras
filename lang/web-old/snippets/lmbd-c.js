// some stuff in just lambda calculus

// boolean logic
const ID = (a) => a
const TRUE = (a) => (b) => a
const FALSE = (a) => (b) => b
const AND = (p) => (q) => p(q)(p)
const OR = (p) => (q) => p(p)(q)
const NOT = (p) => (a) => (b) => p(b)(a)
const IF = (p) => (a) => (b) => p(a)(b)
const NAND = (p) => (q) => NOT(AND(p)(q))

// math
const N0 = (f) => (x) => x
const N1 = (f) => (x) => f(x)
const N2 = (f) => (x) => f(f(x))
const N3 = (f) => (x) => f(f(f(x)))
const N4 = (f) => (x) => f(f(f(f(x))))
const SUCC = (n) => (f) => (x) => f(n(f)(x))
const PLUS = (m) => (n) => (f) => (x) => m(f)(n(f)(x))
const MULT = (m) => (n) => (f) => m(n(f))
const POW = (b) => (e) => e(b)
const SUB = (m) => (n) => n(PRED)(m)
const IS_ZERO = (n) => n((a) => FALSE)(TRUE)
const LEQ = (m) => (n) => IS_ZERO(SUB(m)(n))

// data structures
const BUILD_3TUPLE = (a) => (b) => (c) => (f) => f(a)(b)(c)
const GET_A = (t) => t((a) => (b) => (c) => a)
const GET_B = (t) => t((a) => (b) => (c) => b)
const GET_C = (t) => t((a) => (b) => (c) => c)
const PAIR = (a) => (b) => (f) => f(a)(b)
const FIRST = (p) => p((a) => (b) => a)
const SECOND = (p) => p((a) => (b) => b)
const PHI = (p) => PAIR(SECOND(p))(SUCC(SECOND(p)))
const PRED = (n) => FIRST(n(PHI)(PAIR(N0)(N0)))
