const { spawnSync } = require('child_process')
const fs = require('fs-extra')
process.env.NODE_ENV = 'development'

function spawn(cmd, cwd) {
  const [command, ...args] = cmd.split(' ')
  return spawnSync(command, args, {
    cwd,
    stdio: [process.stdin, process.stdout, process.stderr],
    shell: true
  })
}
const platform = process.argv[2]

async function build() {
  try {
    await spawn(`cordova prepare ${platform}`, 'src-cordova')
    await spawn(`cordova run ${platform}`, 'src-cordova')
  } catch (e) {
    console.error(e)
  } 
}

build()
