# ![ninja](https://typein.ninja/ninja.gif)typein-ninja

[![Netlify Status](https://api.netlify.com/api/v1/badges/4be1260f-9039-4fe3-adee-fe3891d04499/deploy-status)](https://app.netlify.com/sites/typein-ninja/deploys)

[typein.ninja](https://typein.ninja) - A free online typing speed and accuracy test website. Test and train your typing accuracy and speed with a new gamify website.

Train hard and become a master keyboard ninja!

**Features**:

- 3 difficulty levels: `easy`,`normal`,`hard`.
- get experience on each test completed and grow your ninja to be the best
- search other players
- view yours and others best score
- view your game history

:video_game: **How to Play**:
- If you want to save your progress and get higher in level and benefit from all the features that the app has you would have to login with a google account via Google Signin.
- To play the user has to start typing in the text input field and as soon as the first key is struck the test has started.
- Each new word is counted when pressing `space`. 
- To reset a game press the `reset` button at any time.
- To change the difficulty, click the difficulty and select a new one.

## Used to make this project

- [NodeJS](https://nodejs.org) - NodeJS
- [VueJS](https://vuejs.org/) - Frontend Framework
- [ness.css](https://nostalgic-css.github.io/NES.css/) - NES.css is NES-style (8bit-like) CSS Framework.
- [Ninja Asset Pack](https://finalgatestudios.itch.io/ninja-asset-pack) - original assets used in the project

and many more. view `package.json` file for all other packages used.

### About the project

The project is open source and all that is being worked on can be view in [issues](https://github.com/zapobyte/typein-ninja/issues).

If you wish to help please open a [Pull Requset](https://github.com/zapobyte/typein-ninja/pulls) or issue.

If you like and enjoy this,might consider buying a coffee. Would be much appreciated <a href='https://ko-fi.com/Y8Y62AE28' target='_blank'><img height='36' style='border:0px;height:36px;' src='https://cdn.ko-fi.com/cdn/kofi5.png?v=2' border='0' alt='Buy Me a Coffee at ko-fi.com' /></a>.

:heart: Thank you for dropping by.

## Project setup

This is a serverless app the backend is firebase managed. To run the application a [Google Firebase](https://firebase.google.com/) account is needed.

The config is setup using env variables which are found in `.env` file. A sample config looks like:

```
VUE_APP_API_KEY=
VUE_APP_AUTH_DOMAIN=
VUE_APP_DB_URL=
VUE_APP_PROJECT_ID=
VUE_APP_STORAGE_BUCKET=
VUE_APP_MSG_ID=
VUE_APP_APP_ID=
VUE_APP_ANALYTICS_ID=
```

To generate this values, a firebase config must  be generate for your app. More information [here](https://firebase.google.com/docs/web/setup).

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
