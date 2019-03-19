# Biolab Activity Conf
The default configuration for all Biolab activities. This project expects to be included in a Biolab activity as a submodule in `<appRootDir>/conf`.

See the [Biolab Activity Template](https://github.com/CMUEberlyCenter/biolab-activity-template)
for practical details on use.

## Configuration Notes

All these configuration files can be extended or overridden with their corresponding configuration files included in the Biolab activity template. Generally speaking, configuration files in activities based on the Biolab activity template dynamically source their defaults here and then extend or override as required. The notable exception is `package.json`, which must be merged with this `package-base.json` using `npm run build:conf` in the activity app root. Thus, configuration that is specific to a particular activity should go in the configuration files for that activity (and new activities should start with the activity template) and configuration that should apply to all Biolab activities belongs here.

### npm

[npm](https://github.com/npm/npm) is used for dependency management and build scripts.

Scripts are described in the activity template [README.md](https://github.com/CMUEberlyCenter/biolab-activity-template/blob/master/README.md). 

Required utility packages not otherwise discussed:

* cash-mv, rimraf: Cross-platform file/directory move and remove. You're welcome, Zach.
* package-json-merge: Allow Biolab activities to gracefully add to and override the contents of `package-base.json`.

###  Babel
[Babel](https://github.com/babel/babel) is used for transpiling JS.

The module-resolver plugin sources an `alias.config.js` shared with the webpack configuration. The alias configuration is to resolve p5.* libraries at the @cmu-eberly-center scope.

### ESLint
[ESLint](https://github.com/eslint/eslint) is used to enforce style and analyze code for potential errors.

Ignores `p5_*` variables that appear unused, so use variables like that for containing sketches. e.g.:

```
const p5_sketch = new P5(Sketch,'beaker');
```

### Jest

[Jest](https://github.com/facebook/jest) is used as the testing framework.

The Jest configuration, along with the rest of the submodule, expects to be in a subdirectory in the app root. Update `moduleDirectories` to look for the `node_modules` directory one level up.

Use `jest-canvas-mock` to simulate the canvas, and that plugin must be in `setupFiles`.

Source files within `node_modules` are ignored when performing transformations by default. That leads to p5.beaker's p5 import not resolving properly when p5.beaker is included in tests, so remove `node_modules` from the `transformIgnorePatterns` array.

### JSDoc

[JSDoc](https://github.com/jsdoc3/jsdoc) is used to generate documentation.

Nothing particularly special in this configuration.

### webpack

[webpack](https://github.com/webpack/webpack) is used to bundle assets.

The build scripts, discussed in the activity template repo, generate a bundle in `<appRootDir>/dist`. Images, style, and transpiled js is included in the bundle. Linting is performed during build and a linting error when using the production config (e.g. during `npm run build`) will stop the bundling process.

The htmlWebpackPlugin updates `<appRootDir>/src/index.html` to source the bundled assets and places the updated file in `dist` as discussed above.

url loader is used in place of the image loader due to issues with bundling images with `node_modules` libraries like p5.beaker.

webpack sources a common `alias.config.js` file it shares with Babel, for reasons discussed in the Babel configuration section above.

Three default configuration files exist for webpack. One has the majority of the configuration sourced by the other two. The other two are have environment-specific options for production and development.

## Authors

* **Meg Richards** - *Initial work* - [merichar](https://github.com/merichar)

See also the list of [contributors](https://github.com/CMUEberlyCenter/biolab-config/contributors) who participated in this project.
