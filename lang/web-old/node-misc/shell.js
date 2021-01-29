const readline = require('readline')
const { execSync } = require('child_process')

const rl = readline.createInterface(process.stdin, process.stdout)
rl.setPrompt('$ ')

const execute = (cmd) => {
  execSync(cmd, {
    cwd: process.cwd(),
    env: { ...process.env },
    stdio: 'inherit',
  })
}

rl.on('line', (line) => {
  const l = line.trim()
  if (l === 'exit') {
    process.exit(0)
  } else if (l.split(' ')[0] === 'cd') {
    const nextDir = l.split(' ')[1]
    process.chdir(nextDir)
  } else if (l.length) {
    execute(l)
  }

  rl.prompt()
})

rl.prompt()
