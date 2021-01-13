const functions = require('firebase-functions');
const admin = require('firebase-admin');

// Replace BUCKET_NAME
const region = 'europe-west2';

admin.initializeApp();

/**
 * @req - NodeJS Express framework req object
 * @res - NodeJS Express framework res object
 * Function checks for valid pull request and that PR is closed so it can sync and increment the app version value to the oen stored in real time database
 */
exports.githubHook = functions.region(region).https.onRequest(async (req, res) => {
  try {
    // check if PR is closed
    const payload = JSON.parse(req.body.payload);
    const prClosed = payload.action == 'closed' && payload.pull_request.state == 'closed';
    // get title of the PR
    const title = payload.pull_request.title;
    // check if the PR title contains version in the name
    const versionPR = title.includes('version');
    // validate if the closed PR is for versioning
    if (prClosed && versionPR) {
      // get the version number from title
      const version = title.split('/')[1];
      // update realtime database version
      await admin.database().ref('version').set(version);
      console.log(`new version created with number ${version}`);
      return res.send(`new version created ${version}`);
    } else {
      console.log('no update');
      return res.send('no update');
    }
  } catch (error) {
    console.log(error);
    return res.send(error.message);
  }
});
