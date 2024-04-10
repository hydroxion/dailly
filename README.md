# Dailly

Mange tasks with privacy

## About

Privacy and simplicity. No trackers, no ADS and no databases.

## Built with

- [Javascript](https://developer.mozilla.org/en-US/docs/Web/JavaScript)
- [React](https://reactjs.org/)
- [React Native](https://reactnative.dev/)
- [React Navigation](https://github.com/react-navigation/react-navigation)
- [React Native Async Storage](https://github.com/react-native-async-storage/async-storage)
- [Expo](https://expo.io/)
- [Google Sign In](https://github.com/react-native-google-signin/google-signin)

## Installation

Use the package manager [Yarn](https://yarnpkg.com/getting-started/install) to install the dependencies.

```sh
yarn
```

Use the package manager APT to install Java or [Oracle JDK](https://www.oracle.com/java/technologies/javase-jdk16-downloads.html).

```sh
apt install openjdk-11-jdk
```

Set Java variables to path in _$HOME/.zshrc_ or _$HOME/.bashrc_.

```sh
export ANDROID_HOME=$HOME/Android/Sdk

export PATH=$PATH:$ANDROID_HOME/emulator

export PATH=$PATH:$ANDROID_HOME/tools

export PATH=$PATH:$ANDROID_HOME/tools/bin

export PATH=$PATH:$ANDROID_HOME/platform-tools
```

Use the IDE [Android Studio](https://developer.android.com/studio/install) to create a virtual device, using ADB, or connect your device via USB, in developer mode. Some APIs are only available in real devices.

Rename _.env.example_ to _.env_ and change the variables. Environment variables can't be `undefined` and everything that is already defined in the environment will be ignored, checl _babel.config.js_ to change this configuration.

## Usage

Generate a build.

```sh
yarn android
```

Start a server.

```sh
yarn start
```

Open the application using a virtual or real device.

> Check the [package](./package.json) for helper scripts and [React Native](https://reactnative.dev/docs/signed-apk-android) for ABB and APK build reference, aside from [Decoide](https://www.decoide.org/react-native/docs/signed-apk-android.html) for singing the build

## Contributing

Pull requests are welcome. Please, consider the following.

1. Make sure you code have quality, a.k.a standards
2. Make sure your code is secure
3. Make sure your code has no performance issues
4. Make sure your code is documented, if necessary
5. Describe the changes that were done

> No issue or PR template required, but be informative

## License

[MIT](./LICENSE.md)
