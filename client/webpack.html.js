const HtmlWebpackPlugin = require('html-webpack-plugin');
const arr = require('./module');

const arrHTML = [];
const entry = {};

arr.forEach((item) => {
    arrHTML.push(
        new HtmlWebpackPlugin({
            //设置生成的html主文件的模板地址。
            //在模板文件中插入对新生成的js文件的引用。
            template: `./src/manage/${item}.html`,
            //生成的文件名，默认是index.html
            filename: `manage/${item}.html`,
            chunks: [item]
        }),
    );
    entry[item] = `./src/manage/${item}.js`
})


module.exports = { arrHTML, entry }