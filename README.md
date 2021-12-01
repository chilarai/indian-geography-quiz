# indian-geography-quiz v4

## Android (Windows) for testing and releasing

```
cd project/android

// To Generate .apk file
.\gradlew assembleRelease  // (or assembleDebug). installDebug/installRelease is deprecated

// From Aug 2021, in play store we need to upload .aab file
.\gradlew bundleRelease
```

The the apk should be inside `Project\android\app\build\outputs\apk\release\app-release.apk`

Before that ensure you have Android-sdk installed and set in your environment
