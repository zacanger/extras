lisp:
	cc -std=c99 -Wall lisp.c -ledit -lm -o lisp

clean:
	rm -f lisp core

test: lisp
	./lisp test.lisp

.PHONY: lisp clean
