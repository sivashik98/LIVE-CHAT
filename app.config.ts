const config = {
  expo: {
    name: "live-chat",
    slug: "live-chat",
    version: "1.0.0",
    orientation: "portrait",
    icon: "./assets/icon.png",
    userInterfaceStyle: "light",
    splash: {
      image: "./assets/splash.png",
      resizeMode: "contain",
      backgroundColor: "#ffffff"
    },
    assetBundlePatterns: [
      "**/*"
    ],
    ios: {
      supportsTablet: true,
      infoPlist: {
        NSMotionUsageDescription: "Allow $(PRODUCT_NAME) to access your device motion."
      },
      bitcode: false,
      bundleIdentifier: "com.sivashik98.livechat",
    },
    android: {
      adaptiveIcon: {
        foregroundImage: "./assets/adaptive-icon.png",
        backgroundColor: "#ffffff"
      },
      package: "com.sivashik98.livechat",
      permissions: [
        "android.permission.POST_NOTIFICATIONS",
        "android.permission.FOREGROUND_SERVICE",
        "android.permission.FOREGROUND_SERVICE_MICROPHONE",
        "android.permission.BLUETOOTH",
        "android.permission.BLUETOOTH_CONNECT",
        "android.permission.BLUETOOTH_ADMIN",
        "android.permission.ACCESS_NETWORK_STATE",
        "android.permission.CAMERA",
        "android.permission.INTERNET",
        "android.permission.MODIFY_AUDIO_SETTINGS",
        "android.permission.RECORD_AUDIO",
        "android.permission.SYSTEM_ALERT_WINDOW",
        "android.permission.WAKE_LOCK"
      ]
    },
    web: {
      favicon: "./assets/favicon.png"
    },
    plugins: [
      "@stream-io/video-react-native-sdk",
      [
        "expo-build-properties",
        {
          android: {
            networkInspector: true,
            usesCleartextTraffic: true,
            minSdkVersion: 24,
            compileSdkVersion: 34,
            targetSdkVersion: 33,
          },
          ios: {
            useFrameworks: "static"
          }
        }
      ],
      [
        "@config-plugins/react-native-webrtc",
        {
          cameraPermission: "Allow $(PRODUCT_NAME) to access your camera",
          microphonePermission: "Allow $(PRODUCT_NAME) to access your microphone"
        }
      ],
      [
        "expo-sensors",
        {
          motionPermission: "Allow $(PRODUCT_NAME) to access your device motion."
        }
      ],
      [
        "expo-location",
        {
          locationAlwaysAndWhenInUsePermission: "Allow $(PRODUCT_NAME) to use your location."
        }
      ],
    ],
    extra: {
      eas: {
        projectId: "2f76e342-a45f-4e0e-92ed-fdc5db9590d1"
      }
    }
  }
}

export default config
