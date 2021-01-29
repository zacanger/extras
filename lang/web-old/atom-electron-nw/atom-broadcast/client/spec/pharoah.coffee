###
# To directly run the tests in this directory from Atom, press `cmd-alt-ctrl-p`.
#
# For more information:
#   - https://atom.io/docs/latest/creating-a-package#writing-tests
#   - https://atom.io/docs/latest/creating-a-package#running-tests
###

'use strict'

Pharoah = require '../lib/pharoah'

describe 'Pharoah', ->
  describe 'A suite', ->
    it 'should spec with an expectation', ->
      expect(Pharoah).not.toBeNull()
