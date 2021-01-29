// @flow

import contains from './contains'

const notContains = (el: any, ls: string | any[]): bool =>
  !contains(el, ls)

export default notContains
