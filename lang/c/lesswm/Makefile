CFLAGS+= -Wall
LDADD+= -lX11
LDFLAGS=
EXEC=lesswm

PREFIX?= /usr/local
BINDIR?= $(PREFIX)/bin

CC=gcc

all: $(EXEC)

lesswm: $(EXEC).o
	$(CC) $(LDFLAGS) -Os -o $@ $+ $(LDADD)
.PHONY: lesswm

install: all
	install -Dm 755 $(EXEC) $(DESTDIR)$(BINDIR)/$(EXEC)

clean:
	rm -f $(EXEC) $(EXEC).o

run: $(EXEC)
	Xephyr :4 -ac -screen 800x600 &
	sleep 2
	DISPLAY=:4 ./lesswm &

stop:
	pkill -9 Xephyr

test:
	scan-build make
	cppcheck .
