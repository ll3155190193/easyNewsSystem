const HtmlWebpackPlugin = require('html-webpack-plugin');

const arrHTML = [
    new HtmlWebpackPlugin({
        //设置生成的html主文件的模板地址。
        //在模板文件中插入对新生成的js文件的引用。
        template: './src/manage/reg.html',
        //生成的文件名，默认是index.html
        filename: 'manage/reg.html',
        chunks: ['reg']
    }),
]

const entry = {
    reg: './src/manage/reg.js'
}

module.exports = { arrHTML, entry }