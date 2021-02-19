module.exports = {
  lintOnSave: false,
  pluginOptions: {
    electronBuilder: {
      preload: 'src/preload.js',
      // nodeIntegration: true
      builderOptions: {
        extraResources: ['src/db/local.db']
      }
    }
  }
}
