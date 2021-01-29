
all:
	coffee -cb ./

deploy:
	git push
	git checkout uso
	git merge master
	git push
	git checkout master -f

.PHONY: all deploy
