# Welcome to your Expo app 👋

This is an [Expo](https://expo.dev) project created with [`create-expo-app`](https://www.npmjs.com/package/create-expo-app).

## Get started

1. Install dependencies

    ```bash
    npm install
    ```

2. Start the app

    ```bash
    npx expo start
    ```

In the output, you'll find options to open the app in a

- [development build](https://docs.expo.dev/develop/development-builds/introduction/)
- [Android emulator](https://docs.expo.dev/workflow/android-studio-emulator/)
- [iOS simulator](https://docs.expo.dev/workflow/ios-simulator/)
- [Expo Go](https://expo.dev/go), a limited sandbox for trying out app development with Expo

You can start developing by editing the files inside the **app** directory. This project uses [file-based routing](https://docs.expo.dev/router/introduction).

### Local iOS builds

Use `npm run ios:build` to build and install the native iOS app. The script
installs CocoaPods dependencies using the macOS
SDK bundled with the selected Xcode, without changing the SDK used for the iOS
build. Additional Expo options can be passed with `npm run ios:build -- --device`.

Use `npm run ios` to start Metro without rebuilding. After changing native
configuration in `app.json`, run `npx expo prebuild --platform ios --no-install`
before rebuilding.

If Xcode reports that an iOS platform is not installed, install the requested
version once in **Xcode > Settings > Components**, then retry the build.
Expo Go does not display the custom native iOS splash screen.

The native splash uses the same white background and centered
`assets/images/splash-art.png` image on iOS and Android, configured by the
`expo-splash-screen` plugin in `app.json`. The native image is constrained by the
platform splash layout; the fullscreen artwork is rendered in-app.
On both platforms, `SplashArtwork` displays
`assets/images/splash-art.png` fullscreen while authentication and fonts load,
then fades out. This in-app artwork works in Expo Go as well and does not require
a native rebuild. The native splash is hidden once the artwork is displayed.

## Get a fresh project

When you're ready, run:

```bash
npm run reset-project
```

This command will move the starter code to the **app-example** directory and create a blank **app** directory where you can start developing.

### Other setup steps

- To set up ESLint for linting, run `npx expo lint`, or follow our guide on ["Using ESLint and Prettier"](https://docs.expo.dev/guides/using-eslint/)
- If you'd like to set up unit testing, follow our guide on ["Unit Testing with Jest"](https://docs.expo.dev/develop/unit-testing/)
- Learn more about the TypeScript setup in this template in our guide on ["Using TypeScript"](https://docs.expo.dev/guides/typescript/)

## Learn more

To learn more about developing your project with Expo, look at the following resources:

- [Expo documentation](https://docs.expo.dev/): Learn fundamentals, or go into advanced topics with our [guides](https://docs.expo.dev/guides).
- [Learn Expo tutorial](https://docs.expo.dev/tutorial/introduction/): Follow a step-by-step tutorial where you'll create a project that runs on Android, iOS, and the web.

## Join the community

Join our community of developers creating universal apps.

- [Expo on GitHub](https://github.com/expo/expo): View our open source platform and contribute.
- [Discord community](https://chat.expo.dev): Chat with Expo users and ask questions.
