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
# create in directory "my-project-name"
vue create --preset leo-buneev/vue-cli-tc my-project-name

# create in current directory (project name will be deduced from directory name)
vue create --preset leo-buneev/vue-cli-tc .
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

There is nearly free hosting option on Azure. If you want to use it:

1. Create Azure account (if you don't have one already)
2. Create Storage account
    - Standard
    - Pick closest Region (but it doesn't matter too much)
    - Hot
3. Copy Storage Account name and key into `/scripts/deploy.js`
4. Turn on "static website" in Azure Storage Account => settings => Static Website
    - Put "index.html" as default page
    - Copy "Primary endpoint" sugested by azure. This will be url of your website.
6. `yarn build` and `yarn deploy`

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
