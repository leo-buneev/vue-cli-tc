module.exports = [
  {
    type: 'confirm',
    name: 'quasar',
    message: 'Do you want to include Quasar Framework (UI components library)?',
    default: true
  },
  {
    type: 'confirm',
    name: 'pug',
    message: 'Do you want to use Pug (language that compiles to HTML)?',
    default: false
  },
  {
    type: 'confirm',
    name: 'cypress',
    message: 'Do you want to include Cypress (End to end testing)?',
    default: false
  },
]