const fs = require('fs-extra')
const { spawnSync } = require('child_process')

process.env.NODE_ENV = 'production'

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
    await spawn(`cordova build ${platform} --device --release --buildConfig=build.json`, 'src-cordova')
    fs.ensureDirSync('./distApps')
    fs.emptyDirSync('./distApps')
    if (platform === 'android') {
      fs.renameSync(
        `./cordova/platforms/android/app/build/outputs/apk/release/app-release.apk`,
        `./dist/apps/android.apk`,
      )
    } else if (platform === 'ios') {
      const files = await fs.readdir(`./cordova/platforms/ios/build/device`)
      const file = files.find(f => f.endsWith('.ipa'))
      if (!file)
        throw new Error(`Can't find build artifact with extension .ipa in directory cordova/platforms/ios/build/device`)
      fs.renameSync(
        `./cordova/platforms/ios/build/device/${file}`,
        `./dist/apps/ios.ipa`,
      )
    }
  } catch (e) {
    console.error(e)
  } 
}

build()
