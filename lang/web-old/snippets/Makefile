#
# @file
# [Application] Makefile.
#
# @version 0.0.0
#
#

APP_NAME := myapp
DIR_GIT := .git
DIR_NODE_MODULES := node_modules
MAKEFILE := Makefile
GREP := grep --color --ignore-case --with-filename --line-number
VOWS := vows --spec

#
# Run JSHint static code analysis.
#
hint:
	@find \( -path './${DIR_NODE_MODULES}' -o -path './${DIR_GIT}' \) -prune -o -iname '*.js' -print0 | xargs -0 jshint

#
# Run JSLint static code analysis.
#
lint:
	@find \( -path './${DIR_NODE_MODULES}' -o -path './${DIR_GIT}' \) -prune -o -iname '*.js' -print0 | xargs -0 jslint --white

#
# Restart Node servers.
#
restart:
	@bash tools/restart.bash

#
# Show all fixmes.
#
fixme:
	@find \( -path './${DIR_NODE_MODULES}' -o -path './${DIR_GIT}' -o -name '${MAKEFILE}' \) -prune -o -type f -print0 | xargs -0 ${GREP} 'fixme\b' || true

#
# Show all todos.
#
todo:
	@find \( -path './${DIR_NODE_MODULES}' -o -path './${DIR_GIT}' -o -name '${MAKEFILE}' \) -prune -o -type f -print0 | xargs -0 ${GREP} 'todo\b' || true

#
# Show contents of directories in a tree-like format.
#
tree:
	@tree -aFI '${DIR_NODE_MODULES}|${DIR_GIT}'

#
# Compress scripts and styles for production.
#
production:
	find ${DIR_PRI}/js -type f -iname '*.js' -exec uglifyjs -nc {} \; > ${DIR_PUB}/js/${APP_NAME}.min.js
	lessc -x ${DIR_PRI}/less/${APP_NAME}.less > ${DIR_PUB}/css/${APP_NAME}.min.css

#
# Plain copy for development.
#
development:
	@find ${DIR_PRI}/js -type f -iname '*.js' -exec cat {} \; > ${DIR_PUB}/js/${APP_NAME}.min.js
	@lessc ${DIR_PRI}/less/${APP_NAME}.less > ${DIR_PUB}/css/${APP_NAME}.min.css

#
# Run test
#
test:
	@${VOWS} test/test.js

.PHONY: hint lint restart fixme todo tree test
