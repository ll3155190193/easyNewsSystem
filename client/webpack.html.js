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
    new HtmlWebpackPlugin({
        //设置生成的html主文件的模板地址。
        //在模板文件中插入对新生成的js文件的引用。
        template: './src/manage/login.html',
        //生成的文件名，默认是index.html
        filename: 'manage/login.html',
        chunks: ['login']
    }),
    new HtmlWebpackPlugin({
        //设置生成的html主文件的模板地址。
        //在模板文件中插入对新生成的js文件的引用。
        template: './src/manage/index.html',
        //生成的文件名，默认是index.html
        filename: 'manage/index.html',
        chunks: ['index']
    }),
    new HtmlWebpackPlugin({
        //设置生成的html主文件的模板地址。
        //在模板文件中插入对新生成的js文件的引用。
        template: './src/manage/modifyPwd.html',
        //生成的文件名，默认是index.html
        filename: 'manage/modifyPwd.html',
        chunks: ['modifyPwd']
    }),
]

const entry = {
    reg: './src/manage/reg.js',
    login: './src/manage/login.js',
    index: './src/manage/index.js',
    modifyPwd: './src/manage/modifyPwd.js',
}

module.exports = { arrHTML, entry }