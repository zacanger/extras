# vim: ft=sh

# If not running interactively, don't do anything
case $- in
    *i*) ;;
      *) return;;
esac

# don't kill bg jobs on exit
shopt -u huponexit

# check size, one line, etc
shopt -s cmdhist
shopt -s checkwinsize

# "**" in pathname matches all files & 0 or more dirs/subdirs; also, ".foo"
if [[ `uname` == 'Linux' ]]; then
  shopt -s globstar
  shopt -s dotglob
fi

# see lesspipe(1)
if [ -x /usr/bin/lesspipe.sh ]; then
  eval "$(SHELL=/bin/sh lesspipe.sh)"
elif hash lesspipe 2>/dev/null; then
  eval "$(lesspipe)"
fi

export LESSOPEN="| $(which highlight) %s --out-format xterm256 --line-numbers --quiet --force --style solarized-light"
export LESS=" -R"

# forward history search with ctrl-s
stty stop ""

# colored GCC warnings and errors
export GCC_COLORS='error=01;31:warning=01;35:note=01;36:caret=01;32:locus=01:quote=01'

# history stuff
shopt -s histappend # append
HISTCONTROL='erasedups:ignoreboth' # ignore lines with spaces, and duplicates
HISTIGNORE="ls:l:la:lo:lS:lv:a:k:cd:h:history:q:exit:c:clear:erm:clc:cerm"
HISTIGNORE="$HISTIGNORE:..:...:.:cs:co:ni:ns:vi:reload:gst:edrc:edal:fs:dbst:dbup:dbdn"
HISTIGNORE="$HISTIGNORE:ncu:gf:gd:g:v:nu:cla:shhh:todo:poweroff:tn:ncdu:startx"
if [[ `uname` == 'Darwin' ]]; then
  HISTSIZE=10000 # length
  HISTFILESIZE=10000 # size
else
  HISTSIZE=1000 # length
  HISTFILESIZE=1000 # size
fi
HISTTIMEFORMAT='%F %T  ' # timestamp
PROMPT_COMMAND="${PROMPT_COMMAND:+$PROMPT_COMMAND ;} history -a"

# completions
bind 'set completion-query-items 100'                       # ask if over N possible completions
complete -d cd rmdir                                        # on cd, just show dirs
complete -A builtin builtin                                 # bash builtins
complete -A setopt set                                      # bash options
complete -A command command complete coproc exec hash type  # commands
complete -A directory cd pushd mkdir rmdir                  # dirs
complete -A function function                               # bash functions
complete -A helptopic help                                  # halp
complete -A job disown fg jobs                              # jobspecs
complete -A stopped bg                                      # maor jobs
complete -A binding bind                                    # readline
complete -A shopt shopt                                     # sh... opt...
complete -A signal trap                                     # signals
complete -A variable declare export readonly typeset        # variables
complete -A function -A variable unset                      # more vars

# autocorrect spelling on some things
shopt -s cdspell
if [[ `uname` == 'Linux' ]]; then
  shopt -s dirspell
fi

# dynamic title
case $TERM in
  xterm*)
    PROMPT_COMMAND='echo -ne "\033]0;${USER}@${HOSTNAME}: ${PWD}\007"'
    ;;
  *)
    ;;
esac

export GOPATH=$HOME/.go
if [[ `uname` == 'Darwin' ]]; then
  export PATH="$HOME/bin:$HOME/.gem/global/bin:$HOME/.cabal/bin:$HOME/Library/Haskell/bin:/usr/local/opt/coreutils/libexec/gnubin:/opt/local/bin:/opt/local/sbin:$GOPATH/bin:/usr/local/sbin:$HOME/.local/bin:/usr/local/opt/gettext/bin::$HOME/.cargo/bin:$PATH"
else
  export PATH="$HOME/.local/bin:$HOME/bin:$HOME/bin/x:$HOME/.cargo/bin:$HOME/.gem/ruby/2.5.0/bin/:$GOPATH/bin:$PATH"
fi
export VISUAL=nvim
export EDITOR=nvim
export TERMINAL=st
export PYTHONSTARTUP=$HOME/.config/startup.py
export BROWSER=firefox

if [[ `uname` == 'Darwin' ]]; then
  # i'm at work
  export MANPATH=/usr/local/opt/coreutils/libexec/gnuman:$MANPATH
  ulimit -n 10240
fi

export GPG_TTY=$(tty)

# get core dumps
ulimit -c unlimited

export JOBS=max

XDG_CONFIG_HOME=$HOME/.config

tabs -2

# color ls
if hash dircolors 2>/dev/null; then
  test -r $HOME/.dircolors && eval "$(dircolors -b $HOME/.dircolors)" || eval "$(dircolors -b)"
fi

# pacman -S bash-completion or apt-get install bash-completion
[[ $PS1 && -f /usr/share/bash-completion/bash_completion ]] && . /usr/share/bash-completion/bash_completion

# brew's bash completion
if [[ `uname` == 'Darwin' ]] ; then
  if [ -f $(brew --prefix)/etc/bash_completion ]; then
    . $(brew --prefix)/etc/bash_completion
  fi
fi

# aws completion
if hash aws_completer 2>/dev/null ; then
  complete -C aws_completer aws
fi

# aliases, functions, prompt, in their own files
if [ -d $HOME/.bash ]; then
  if [ -f $HOME/.bash/aliases.sh ]; then
    . $HOME/.bash/aliases.sh
  fi
  if [ -d $HOME/.bash/functions ]; then
    for file in $HOME/.bash/functions/*; do
      . "$file"
    done
  fi
  # git and alias completion helpers
  if [ -f $HOME/.bash/completion.sh ]; then
    . $HOME/.bash/completion.sh
  fi
  # finally, load the fancy prompt
  if [ -f $HOME/.bash/prompt.sh ]; then
    . $HOME/.bash/prompt.sh
  fi
fi

if [[ `uname` == 'Darwin' ]]; then
  # Macs yell at you if you don't use bash, because Macs are bad
  export BASH_SILENCE_DEPRECATION_WARNING=1
  # On Linux, I manage multiple terminal sessions with the window manager
  # On Mac, that's painful, so start tmux on a new shell.
  [ -z "$TMUX" ] && { tmux attach || exec tmux new-session; }
fi
