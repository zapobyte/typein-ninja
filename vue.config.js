const fs = require('fs');
require = require('esm')(module);
const SitemapPlugin = require('sitemap-webpack-plugin').default;
const packageJson = fs.readFileSync('./package.json');
const version = JSON.parse(packageJson).version || 0;
const webpack = require('webpack');
const routes  = require('./src/router/routes.js');
const paths = [];
let count = 0.1;
routes.forEach((route)=>{

    paths.push(`https://typein.ninja/${route.path}`)
    if(count+ 0.1 == 0.30000000000000004){
        count = 0.3
    } else {
        count+=0.1;

    }
})

module.exports = {
    pluginOptions: {
		sitemap: {
			urls: paths
		}
	},
    // enable/disable eslint error messages
    lintOnSave:false,
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