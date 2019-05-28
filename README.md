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
- [vuex](https://vuex.vuejs.org/guide/), [vue-router](https://router.vuejs.org/guide/)
- [Stylus](http://stylus-lang.com/)
- VSCode workspace settings and recommended extensions


### Opt-in features

- [Quasar](https://quasar-framework.org/guide/)
- Unit testing with [jest](https://jestjs.io/docs/en/getting-started) and [vue-test-utils](https://vue-test-utils.vuejs.org/guides/getting-started.html)
- E2E testing with [Cypress](https://docs.cypress.io/guides/getting-started/writing-your-first-test.html#Write-a-simple-test)
- [GitLab CI](https://docs.gitlab.com/ee/ci/) configuration
- [Cordova](https://cordova.apache.org/docs/en/latest/) project scaffolding and build commands
- [Azure Blob Storage](https://azure.microsoft.com/en-us/services/storage/blobs/) deployment

#### Azure configuration

To be able to deploy to azure, after project is created you must provide your credentials in `/scripts/deploy.js`.
To test deployment, run `yarn deploy` in your command line.

#### Cordova configuration

1. You will need to register your app in Apple and Google stores to be able to build production version of the app.
2. During development, it's recommended to have real phone connected to your computer. Emulators don't work properly.
3. Please check `/src-cordova/cordova.xml` and fix fields `id`, `name`, `description` and `author`.
4. Often additional cordova plugins don't work properly - see `Incenter 2.0` `config.xml` for list of supported plugins.

Command line Commands:

```
yarn cordova-build-android
yarn cordova-build-ios
yarn cordova-dev-android
yarn cordova-dev-ios
```