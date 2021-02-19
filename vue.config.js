module.exports = {
  lintOnSave: false,

  pluginOptions: {
    electronBuilder: {
      preload: 'src/preload.js',
      // nodeIntegration: true
      builderOptions: {
        extraResources: ['db/local.db']
      }
    }
  },

  transpileDependencies: [
    'vuetify'
  ]
}
