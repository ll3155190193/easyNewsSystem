const path = require('path');

const CopyWebpackPlugin = require('copy-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin');
const devServer = require('./webpack.devserver');
const { arrHTML, entry } = require('./webpack.html');

module.exports = {
    //mode是打包模式：development|production|none
    // development  开发模式
    // production   生产模式
    mode: 'development',//开发模式
    // entry:'./src/index.js',//默认地址
    entry,
    output: {
        path: path.resolve(__dirname, "dist"),
        filename: 'js/[id]_bundle.js',
        clean: true,//每次编译前，先清空输入文件夹
    },
    module: {
        rules: [
            {
                test: /\.(css|sass|less|scss)$/,
                //从后往前
                use: [
                    MiniCssExtractPlugin.loader,
                    {
                        loader: 'css-loader',
                        options: {
                            //表示当css-loader遇到import一个scss文件时，可以向前多使用一级loader来处理
                            importLoaders: 1,
                        }
                    },
                    {
                        loader: 'postcss-loader',
                        options: {
                            postcssOptions: {
                                plugins: [
                                    [
                                        'postcss-preset-env'
                                    ],
                                ],
                            }
                        }
                    },
                    'sass-loader'
                ]
            },
            {
                test: /\.js$/,
                use: [
                    {
                        loader: 'babel-loader',
                        options: {
                            presets: [
                                '@babel/preset-env' //使用这个预设，会根据浏览器来选择插件转化ES5
                            ]
                        }
                    }
                ]
            },
            {
                test: /\.(jpg|png|gif|jpeg|bmp)$/,
                type: 'asset',
                parser: {
                    dataUrlCondition: {
                        maxSize: 1024
                    }
                },
                generator: {
                    filename: 'images/[contenthash][ext]'
                }
            },
            {
                test: /\.(woff|eot|ttf|woff2)$/,
                type: 'asset/resource',
                generator: {
                    filename: 'fonts/[contenthash][ext]'
                }
            }
        ]
    },
    optimization: {
        minimizer: [
            new CssMinimizerPlugin()
        ],
        minimize: true
    },
    plugins: [
        ...arrHTML,

        new MiniCssExtractPlugin({
            //生成的文件名及路径
            filename: 'css/main_[id].css'
        })
    ],
    devServer
}