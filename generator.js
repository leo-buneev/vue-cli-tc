const { spawnSync, execSync } = require('child_process')
const path = require('path')
const fs = require('fs')
const { EOL } = require('os')

let hasYarn = false

try {
  execSync('yarnpkg --version', { stdio: 'ignore' })
  hasYarn = true
} catch (e) {
  hasYarn = false
}

function spawn(cmd, cwd) {
  const [command, ...args] = cmd.split(' ')
  return spawnSync(command, args, {
    cwd,
    stdio: [process.stdin, process.stdout, process.stderr],
    shell: true
  })
}

function toTitleCase(str) {
  return str.replace(
      /\w\S*/g,
      function(txt) {
          return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
      }
  );
}

function injectImport(filePath, importStr) {
  const contentMain = fs.readFileSync(filePath, { encoding: 'utf-8' })
  const editedContentMain = `${importStr}${EOL}${contentMain}`
  fs.writeFileSync(filePath, editedContentMain, { encoding: 'utf-8' })
}

function injectWebpackPlugin(filePath, pluginStr) {
  const contentMain = fs.readFileSync(filePath, { encoding: 'utf-8' })
  const editedContentMain = contentMain.replace('plugins: [', 'plugins: [' + pluginStr + ',\n')
  fs.writeFileSync(filePath, editedContentMain, { encoding: 'utf-8' })
}

function fixUnnecessaryRegexEscapeCharacters(filePath) {
  const contentMain = fs.readFileSync(filePath, { encoding: 'utf-8' })
  const editedContentMain = contentMain.replace(/\\\\\\/gi, '\\\\')
  fs.writeFileSync(filePath, editedContentMain, { encoding: 'utf-8' })
}

module.exports = (api, options, rootOptions) => {
  api.render('./template/common')

  const { projectName } = rootOptions
  
  let scripts = {
    "dev": "yarn serve",
    "lint-fix": "yarn lint --fix"
  }
  let devDependencies = {
    "eslint-plugin-tyrecheck": "https://tycgitlab.tyrecheck.com/leonid.buneev/eslint-plugin-tyrecheck.git",
  }
  let dependencies = {
    "lodash": "^4.17.11",
    'uuid': '^3.3.2',
  }
  const vue = {
    configureWebpack: {
      devtool: 'source-map', // For VSCode debugger
      plugins: []
    }
  }
  if(options.cordova) {
    scripts = { 
      ...scripts, 
      "cordova-build-android": "node ./scripts/cordovaBuild android",
      "cordova-build-ios": "node ./scripts/cordovaBuild ios",
      "cordova-run-android": "node ./scripts/cordovaRun android",
      "cordova-run-ios": "node ./scripts/cordovaRun ios",
    }
    devDependencies = {
      ...devDependencies,
      "fs-extra": "^7.0.0",
    }
    api.render('./template/cordova')
  }

  if(options.gitlabci) {
    devDependencies = { ...devDependencies, "klaw-sync": "^6.0.0", "azure-storage": "^2.10.2" }
    scripts = { ...scripts, "deploy": "node ./scripts/deploy.js" }
    api.render('./template/gitlabci')
  }

  api.extendPackage({ scripts, devDependencies, dependencies, vue })

  const cwd = api.generator.context
  api.onCreateComplete(() => {
    if(options.cypress) {
      spawn('vue add @vue/e2e-cypress@alpha', cwd)
    }
    if(options.jest) {
      spawn('vue add @vue/unit-jest@alpha', cwd)
    }
    if(options.quasar) {
      spawn('vue add quasar', cwd)
    }
    if(options.cordova) {
      const appId = projectName.toLowerCase().replace(/[\ \-]/gi, '.')
      const appName = toTitleCase(appId.replace(/[\. -]/gi, ' ').replace())
      spawn(`cordova create src-cordova "${appId}" "${appName}"`, cwd)

      const cordovaSrcPath = path.join(cwd, 'src-cordova')
      spawn('cordova platform add android', cordovaSrcPath)
      spawn('cordova platform add ios', cordovaSrcPath)
      spawn(`cordova plugin add cordova-plugin-splashscreen`, cordovaSrcPath)
      spawn(`cordova plugin add cordova-plugin-wkwebview-engine`, cordovaSrcPath)
      fs.copyFileSync(
        path.join(__dirname, './templateOnCreateComplete/src-cordova/build.json'), 
        path.join(cordovaSrcPath, 'build.json')
      )
      fs.copyFileSync(
        path.join(__dirname, './templateOnCreateComplete/src-cordova/www/.gitkeep'), 
        path.join(cordovaSrcPath, 'www/.gitkeep')
      )
    }

    injectImport(path.join(cwd, api.entryFile), `import '@/mixins/globalMixins/globalMixins'`)
    injectImport(path.join(cwd, 'vue.config.js'), `const webpack = require('webpack')`)
    injectWebpackPlugin(path.join(cwd, 'vue.config.js'), `new webpack.ProvidePlugin({ _: 'lodash', createGuid: 'uuid/v4' })`)
    fixUnnecessaryRegexEscapeCharacters(path.join(cwd, 'vue.config.js'))

    spawn(`yarn lint-fix`, cwd)
  })
}