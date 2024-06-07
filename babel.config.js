module.exports = function (api) {
  api.cache(true);
  return {
    presets: ["babel-preset-expo", "@babel/preset-typescript"],
    plugins: [
      [
        "module-resolver",
        {
          root: ".",
          alias: {
            assets: "./assets",
            svg: "./assets/svg",
            lottie: "./assets/lottie",
            png: "./assets/png",
            src: "./src",
            api: "./src/api",
            components: "./src/components",
            hooks: "./src/hooks",
            lib: "./src/lib",
            modules: "./src/modules",
            navigation: ".src/navigation",
            providers: ".src/providers",
            store: "./src/store",
          },
        },
      ],
      "react-native-reanimated/plugin",
    ],
  };
};
