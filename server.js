const cors = require('cors');
const express = require('express');
const bodyParser = require('body-parser');
const { registerUser } = require('./database');
const bcrypt = require('bcryptjs');
const { getUserByUsername } = require('./database'); // 新增的数据库查询函数

const app = express();
const port = 3000;

// 中间件配置
app.use(cors());
app.use(bodyParser.json());
app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});

// 注册 API
app.post('/register', (req, res) => {
    const { username, password } = req.body;

    if (!username || !password) {
        return res.status(400).json({ error: 'Username and password are required' });
    }

    registerUser(username, password, (err, userId) => {
        if (err) {
            return res.status(500).json({ error: 'Failed to register user' });
        }
        res.status(201).json({ message: 'User registered successfully', userId });
    });
});



app.post('/login', (req, res) => {
    const { username, password } = req.body;

    console.log('Login Request:', { username, password }); // 调试日志

    if (!username || !password) {
        console.log('Missing username or password'); // 如果用户名或密码为空
        return res.status(400).json({ error: 'Username and password are required' });
    }

    // 查询数据库获取用户
    getUserByUsername(username, (err, user) => {
        if (err) {
            console.log('Error fetching user from DB:', err); // 输出数据库查询错误
            return res.status(500).json({ error: 'Failed to fetch user from database' });
        }

        if (!user) {
            console.log('User not found:', username); // 用户未找到
            return res.status(404).json({ error: 'User not found' });
        }

        bcrypt.compare(password, user.password, (err, result) => {
            if (err) {
                console.log('Error comparing passwords:', err); // 输出密码比较错误
                return res.status(500).json({ error: 'Error comparing passwords' });
            }

            if (!result) {
                console.log('Incorrect password'); // 密码错误
                return res.status(401).json({ error: 'Incorrect password' });
            }

            console.log('Login successful for:', username); // 登录成功日志
            res.status(200).json({ message: 'Login successful' });
        });
    });
});