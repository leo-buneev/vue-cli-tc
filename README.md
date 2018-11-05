# vue-cli-tc

## Description

Tyrecheck preset for vue-cli. Allows you to set up a project with libraries and settings exactly the same way as Tyrecheck does for its projects.

## Usage

1. Make sure you have `@vue/cli` installed.

```
npm install -g @vue/cli
# or
yarn global add @vue/cli 
```

2. Navigate in your terminal to the folder that you want to create project in, for example `C:/Work`

3. Create a project with: 

```
vue create --preset leo-buneev/vue-cli-tc my-project-name
```

And you're done! :tada: :fire:

## What's included

### Default features

- [Vue.js](https://vuejs.org/v2/guide/)
- Babel set up to support most major browsers
- ESlint + prettier with tyrecheck config
- Unit testing with [jest](https://jestjs.io/docs/en/getting-started) and [vue-test-utils](https://vue-test-utils.vuejs.org/guides/getting-started.html)
- [vuex](https://vuex.vuejs.org/guide/), [vue-router](https://router.vuejs.org/guide/)
- [Stylus](http://stylus-lang.com/)
- VSCode workspace settings and recommended extensions

### Opt-in features

- [Quasar](https://quasar-framework.org/guide/)
- [Pug](https://pugjs.org/language/attributes.html)
- E2E testing with [Cypress](https://docs.cypress.io/guides/getting-started/writing-your-first-test.html#Write-a-simple-test)
