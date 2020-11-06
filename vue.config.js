const fs = require('fs')
const packageJson = fs.readFileSync('./package.json');
const version = JSON.parse(packageJson).version || 0;
const webpack = require('webpack');
module.exports = {
    // enable/disable eslint error messages
    lintOnSave:true,
    css: {
        loaderOptions: {
            sass: {
                additionalData: `
                @import "~@/scss/variables.scss"
                `
            },
            scss: {
                additionalData: `@import "~@/scss/variables.scss";`
            },
        }
    },
    configureWebpack: {
        plugins: [
            new webpack.DefinePlugin({
                'process.env': {
                    VUE_APP_PACKAGE_VERSION: '"' + version + '"'
                }
            })
        ]
    }
    //filenameHashing: false
}