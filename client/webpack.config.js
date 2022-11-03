const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin');

module.exports = {
    //mode是打包模式：development|production|none
    // development  开发模式
    // production   生产模式
    mode: 'development',//开发模式
    // entry:'./src/index.js',//默认地址
    entry: {
        login: './src/js/login.js',
        reg: './src/js/reg.js',
        index: './src/js/index.js',
        modify: './src/js/modify.js',
    },
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
        new HtmlWebpackPlugin({
            //设置生成的html主文件的模板地址。
            //在模板文件中插入对新生成的js文件的引用。
            template: './src/login.html',
            //生成的文件名，默认是index.html
            filename: 'login.html',
            chunks: ['login']
        }),
        new HtmlWebpackPlugin({
            //设置生成的html主文件的模板地址。
            //在模板文件中插入对新生成的js文件的引用。
            template: './src/reg.html',
            //生成的文件名，默认是index.html
            filename: 'reg.html',
            chunks: ['reg']
        }),
        new HtmlWebpackPlugin({
            //设置生成的html主文件的模板地址。
            //在模板文件中插入对新生成的js文件的引用。
            template: './src/index.html',
            //生成的文件名，默认是index.html
            filename: 'index.html',
            chunks: ['index']
        }),
        new HtmlWebpackPlugin({
            //设置生成的html主文件的模板地址。
            //在模板文件中插入对新生成的js文件的引用。
            template: './src/modify.html',
            //生成的文件名，默认是index.html
            filename: 'modify.html',
            chunks: ['modify']
        }),
        new CopyWebpackPlugin({
            patterns: [
                { from: './src/css', to: "css" }
            ]
        }),
        new MiniCssExtractPlugin({
            //生成的文件名及路径
            filename: 'css/main_[id].css'
        })
    ],
    target: 'web',
    devServer: {
        //端口号
        port: 8080,
        //开启热更新
        hot: 'only',
        //打开服务器时自动开启浏览器访问
        open: true,
        //监控变化的文件的，被监控的文件只要发生变化，就会重新编译，自动刷新浏览器。
        watchFiles: ['./src/index.html'],
        static: {
            //设置express服务器的根目录。
            directory: path.join(__dirname, 'dist'),
        },
        proxy: {
            //请求地址中包含/api的就会被拦截，例如：'/api/getXXX'
            '/api': {
                // 真实的请求会被转发到 'http://172.16.5.30/api/getXXX'
                target: 'http://127.0.0.1/',
                //如果真实服务器地址是''http://172.16.5.30/abc/getXXX'
                // pathRewrite: { "^/api": "/api" },
                //发送请求头中host会设置成target
                changeOrigin: true
            }
        }
    }
}