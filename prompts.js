module.exports = [
  {
    type: 'confirm',
    name: 'jest',
    message: 'Do you want to include Jest (Unit testing)?',
    default: true
  },
  {
    type: 'confirm',
    name: 'cypress',
    message: 'Do you want to include Cypress (End to end testing)?',
    default: false
  },
  {
    type: 'confirm',
    name: 'quasar',
    message: 'Do you want to include Quasar Framework (UI components library)?',
    default: true
  },
  {
    type: 'confirm',
    name: 'cordova',
    message: 'Do you want to include Cordova (iOS and android builds)?',
    default: false
  },
  {
    type: 'confirm',
    name: 'gitlabci',
    message: 'Do you want to include GitLab CI config (automatic builds and deployments)?',
    default: false
  },
]