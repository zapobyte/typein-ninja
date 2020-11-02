const fs = require('fs')
const packageJson = fs.readFileSync('./package.json');
const version = JSON.parse(packageJson).version || 0;
const webpack = require('webpack');
module.exports = {
    // enable/disable eslint error messages
    lintOnSave:false,
    configureWebpack: {
        plugins: [
            new webpack.DefinePlugin({
                'process.env': {
                    VUE_APP_PACKAGE_VERSION: '"' + version + '"'
                }
            })
        ],
        output: {
            filename: '[name].[hash].js', // force all files to have the build number thus refresing on each new build
        },
    }, 
    //filenameHashing: false
}