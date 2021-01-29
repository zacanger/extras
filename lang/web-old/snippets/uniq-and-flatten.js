// @flow

import flatten from './flatten'
import uniq from './uniq'

const uniqAndFlatten = (arr: any[]): any[] =>
  flatten(uniq(arr))

export default uniqAndFlatten
