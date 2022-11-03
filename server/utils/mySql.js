// 引入MySQL模块
const mysql = require('mysql');
// 创建MySQL的连接池
const pool = mysql.createPool({
    connectionLimit: 5,// 练级吃的最大保持链接数，默认10
    host: '127.0.0.1',
    user: 'root',
    password: 'll641175',
    database: 'ens'
})

// 设置一个query函数来执行数据库操作
// sql参数是使用时传入的sql语句，params是执行sql语句需要的参数
const query = (sql, params) => {
    return new Promise((resolve, reject) => {
        // 从mysql连接池中获得一个链接
        pool.getConnection((err, connection) => {
            if (err) {
                reject(err)
            } else {
                // 如果没有失败，则connection表示获取到的MySQL链接
                connection.query(sql, params, (err, result) => {
                    // 当MySQL查询有结果的时候，则需要主动释放连接资源
                    connection.release();
                    if (err) {
                        reject(err)
                    } else {
                        resolve(result)
                    }
                })
            }
        })
    })
}
module.exports = query;