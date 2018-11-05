const { spawnSync } = require('child_process')

module.exports = (api, options, rootOptions) => {
  // modify package.json fields
  api.extendPackage({
    scripts: {
      "dev": "yarn serve",
      "lint-fix": "yarn lint --fix"
    },
    devDependencies: {
      "eslint-plugin-tyrecheck": "https://tycgitlab.tyrecheck.com/leonid.buneev/eslint-plugin-tyrecheck.git",
    },
    dependencies: {
      "lodash": "^4.17.10",
    }
  })

  const cwd = api.generator.context

  api.render('./template/common')

  api.onCreateComplete(() => {
    if(options.cypress) {
      spawnSync('vue', [
        'add',
        '@vue/e2e-cypress'
      ], {
        cwd,
        stdio: [process.stdin, process.stdout, process.stderr],
        shell: true
      })
    }
    if(options.pug) {
      spawnSync('vue', [
        'add',
        'pug'
      ], {
        cwd,
        stdio: [process.stdin, process.stdout, process.stderr],
        shell: true
      })
    }
    if(options.quasar) {
      spawnSync('vue', [
        'add',
        'quasar'
      ], {
        cwd,
        stdio: [process.stdin, process.stdout, process.stderr],
        shell: true
      })
    }
  })
}