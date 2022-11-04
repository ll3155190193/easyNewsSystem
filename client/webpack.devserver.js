const path = require('path');
const arr = require('./module');

const watchFiles = [];
arr.forEach((item) => {
    watchFiles.push(
        `./src/manage/${item}.html`
    )
})
module.exports = {
    //端口号
    port: 8080,
    //开启热更新
    hot: 'only',
    //打开服务器时自动开启浏览器访问
    open: true,
    //监控变化的文件的，被监控的文件只要发生变化，就会重新编译，自动刷新浏览器。
    watchFiles,
    static: {
        //设置express服务器的根目录。
        directory: path.join(__dirname, 'dist'),
    },
    proxy: {
        //请求地址中包含/api的就会被拦截，例如：'/api/getXXX'
        '/api': {
            // 真实的请求会被转发到 'http://172.16.5.30/api/getXXX'
            target: 'http://127.0.0.1:3000/',
            //如果真实服务器地址是''http://172.16.5.30/abc/getXXX'
            pathRewrite: { "^/api": "" },
            //发送请求头中host会设置成target
            changeOrigin: true
        }
    }
}