/* const fs = require('fs');
const packageJson = fs.readFileSync('./package.json');
const version = JSON.parse(packageJson).version || 0; */
module.exports = {
    lintOnSave:false,
/*     chainWebpack: config => {
        config
          .plugin('define')
            .tap(args => {
              let v = JSON.stringify(require('./package.json').version)
              args[0]['process.env']['VERSION'] = v
              return args
            })
      } */

}