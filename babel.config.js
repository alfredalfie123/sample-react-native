module.exports = function (api) {
  api.cache(true);
  return {
    presets: ['babel-preset-expo', 'module:metro-react-native-babel-preset'],
    plugins: [
      [
        'module-resolver',
        {
          root: ['./src'],
          extensions: ['.ios.js', '.android.js', '.js', '.ts', '.tsx', '.json'],
          alias: {
            component: ['./src/component'],
            layout: ['./src/layout'],
            action: ['./src/redux/action'],
            reducer: ['./src/redux/reducer'],
            store: ['./src/redux/store'],
            navigation: ['./src/navigation'],
            theme: ['./src/theme'],
            screen: ['./src/screen'],
            constant: ['./src/shared/constant'],
            util: ['./src/shared/util'],
            type: ['./src/shared/type'],
            resource: ['./resource'],
            model: ['./src/model'],
          },
        },
      ],
    ],
    // env: {
    //   development: {
    //     plugins: [
    //       [
    //         "module-resolver",
    //         {
    //           root: ["./src"],
    //           extensions: [
    //             ".ios.js",
    //             ".android.js",
    //             ".js",
    //             ".ts",
    //             ".tsx",
    //             ".json",
    //           ],
    //           alias: {
    //             "component": ["./src/component"],
    //             "layout": ["./src/layout"],
    //             "action": ["./src/redux/action"],
    //             "reducer": ["./src/redux/reducer"],
    //             "store": ["./src/redux/store"],
    //             "navigation": ["./src/navigation"],
    //             "theme": ["./src/theme"],
    //             "screen": ["./src/screen"],
    //             "constant": ["./src/shared/constant"],
    //             "util": ["./src/shared/util"],
    //             "type": ["./src/shared/type"],
    //             "resource": ["./resource"],
    //             "model/*": ["./src/model"],
    //           },
    //         },
    //       ],
    //     ],
    //   },
    //   development: {
    //     plugins: [
    //       [
    //         "module-resolver",
    //         {
    //           root: ["./src"],
    //           extensions: [
    //             ".ios.js",
    //             ".android.js",
    //             ".js",
    //             ".ts",
    //             ".tsx",
    //             ".json",
    //           ],
    //           alias: {
    //             "component": ["./src/component"],
    //             "layout": ["./src/layout"],
    //             "action": ["./src/redux/action"],
    //             "reducer": ["./src/redux/reducer"],
    //             "store": ["./src/redux/store"],
    //             "navigation": ["./src/navigation"],
    //             "theme": ["./src/theme"],
    //             "screen": ["./src/screen"],
    //             "constant": ["./src/shared/constant"],
    //             "util": ["./src/shared/util"],
    //             "type": ["./src/shared/type"],
    //             "resource": ["./resource"],
    //             "model/*": ["./src/model"],
    //           },
    //         },
    //       ],
    //     ],
    //   },
    // },
  };
};
