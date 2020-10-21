# ![ninja](http://typein.ninja/favico.ico)typein-ninja

[typein.ninja](http://typein.ninja) - Test your typing skills. Train your typing accuracy and speed with a new gameify web app and become like a master ninja on a keyboard.

**Features**:
- 3 difficulty levels: `easy`,`normal`,`hard`.
- get experience on each test completed and grow your ninja to be the best
- search other players
- view yours and others best score
- view your game history


## Used to make this project
- [NodeJS](https://nodejs.org) - NodeJS
- [VueJS](https://vuejs.org/) - Frontend Framework
- [ness.css](https://nostalgic-css.github.io/NES.css/) - NES.css is NES-style (8bit-like) CSS Framework.
- [Ninja Asset Pack](https://finalgatestudios.itch.io/ninja-asset-pack) - original assets used in the project

and many more. view `package.json` file for all other packages used.

### About the project

Since the project is open source all that is being worked on can be view in [issues](https://github.com/zapobyte/typein-ninja/issues) and [project](https://github.com/zapobyte/typein-ninja/projects). If you wish to help please open a [Pull Requset](https://github.com/zapobyte/typein-ninja/pulls) or issue.

Thank you and hope you enjoy this project.

## Project setup
Since this is a serverless app the backend is firebase managed. To run the application a [Google Firebase](https://firebase.google.com/) account is needed.
The config is setup using env variables which are found in `.env` file. A sample config looks like:
```
VUE_APP_API_KEY=A
VUE_APP_AUTH_DOMAIN=
VUE_APP_DB_URL=
VUE_APP_PROJECT_ID=
VUE_APP_STORAGE_BUCKET=
VUE_APP_MSG_ID=
VUE_APP_APP_ID=
VUE_APP_ANALYTICS_ID=
```
To generate this values you will need to generate a firebase config for your app. More information [here](https://firebase.google.com/docs/web/setup).

### Install
```
npm install
```

### Compiles and hot-reloads for development
```
npm run serve
```

### Compiles and minifies for production
```
npm run build
```

### Lints and fixes files
```
npm run lint
```

### Customize configuration
See [Configuration Reference](https://cli.vuejs.org/config/).

