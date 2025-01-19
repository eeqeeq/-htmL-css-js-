const sqlite3 = require('sqlite3').verbose();
const bcrypt = require('bcryptjs');

// 创建 SQLite 数据库
const db = new sqlite3.Database('./users.db');

// 创建 users 表
db.serialize(() => {
    db.run("CREATE TABLE IF NOT EXISTS users (id INTEGER PRIMARY KEY, username TEXT, password TEXT)");
});

// 注册新用户
const registerUser = (username, password, callback) => {
    // 加密密码
    bcrypt.hash(password, 10, (err, hashedPassword) => {
        if (err) {
            return callback(err);
        }
        const stmt = db.prepare("INSERT INTO users (username, password) VALUES (?, ?)");
        stmt.run(username, hashedPassword, function (err) {
            if (err) {
                return callback(err);
            }
            callback(null, this.lastID);
        });
    });
};

//查询用户
const getUserByUsername = (username, callback) => {
    const stmt = db.prepare("SELECT * FROM users WHERE username = ?");
    stmt.get(username, (err, row) => {
        if (err) {
            console.log('Error executing query:', err); // 输出数据库查询错误
            return callback(err);
        }
        console.log('User found:', row); // 输出找到的用户信息
        callback(null, row); // 返回用户数据
    });
};

module.exports = { registerUser, getUserByUsername };