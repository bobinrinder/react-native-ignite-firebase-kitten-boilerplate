# React Native Ignite Firebase Kitten Boilerplate

This is a basic boilerplate aimed to show a simple setup of Firebase Auth in React Native. After following the setup steps this app provides email sign up, login and password forgot functionality.
The underlying setup and structure comes from [Ignite](https://github.com/infinitered/ignite) with the [Bowser Template](https://github.com/infinitered/ignite-bowser).

Currently included:

- React Native
- React Navigation
- MobX State Tree
- TypeScript
- Firebase Auth
- React Native UI Kitten
- And more!

## Setup

Before getting started, make surer you are setup for React Native, Yarn and that you have an active Firebase project. If you do not meet these prerequisites, follow the links below:

- [Getting started with React Native](https://facebook.github.io/react-native/docs/getting-started.html)
- [Create a new Firebase project](https://console.firebase.google.com/)

### Step 1 - Download and Install

Clone this repo with `git clone git@github.com:bobinrinder/react-native-ignite-firebase-kitten-boilerplate.git`
Run `cd react-native-ignite-firebase-kitten-boilerplate && yarn` to enter root project folder and install required modules

### Step 2 - Enable Email Signup

Ensure the "Email" sign-in provider is enabled on the [Firebase Console](https://console.firebase.google.com/project/_/authentication/providers).

### Step 3 - Android Credentials

On the Firebase console, add a new Android application and enter your projects details. The "Android package name" must match your local projects package name which can be found inside of the manifest tag within the `/android/app/src/main/AndroidManifest.xml` file within your project.

_Optional:
The debug signing certificate is optional to use Firebase with your app, but is required for Dynamic Links, Invites and Phone Authentication. To generate a certificate run `cd android && ./gradlew signingReport` and copy the SHA1 from the `debug` key. This generates two variant keys. You can copy the 'SHA1' that belongs to the `debugAndroidTest` variant key option._

Download the `google-services.json` file and place it inside of your project at the following location: `/android/app/google-services.json`.

### Step 4 - iOS Credentials

Follow **_step 2 and 3_** of this setup guide here: [https://firebase.google.com/docs/ios/setup](https://firebase.google.com/docs/ios/setup).

### Step 5 - Run the app

Run with `yarn ios` or `yarn android`.

## Licence

MIT
