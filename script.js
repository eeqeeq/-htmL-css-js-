// 获取相关元素
const registerBtn = document.querySelector('.register-btn');
const loginBtn = document.querySelector('.login-btn');
const container = document.querySelector('.container');
const formBoxLogin = document.querySelector('.form-box.login');
const formBoxRegister = document.querySelector('.form-box.register');

// 切换到注册表单
registerBtn.addEventListener('click', function() {
    container.classList.add('active');  // 激活切换状态
    formBoxLogin.style.display = 'none'; // 隐藏登录表单
    formBoxRegister.style.display = 'flex'; // 显示注册表单
});

// 切换到登录表单
loginBtn.addEventListener('click', function() {
    container.classList.remove('active');  // 退出切换状态
    formBoxLogin.style.display = 'flex'; // 显示登录表单
    formBoxRegister.style.display = 'none'; // 隐藏注册表单
});


// 处理注册表单的提交
document.getElementById('registerForm').addEventListener('submit', function(event) {
    event.preventDefault();  // 阻止默认表单提交

    const username = document.getElementById('registerUsername').value;  // 使用正确的 ID
    const password = document.getElementById('registerPassword').value;  // 使用正确的 ID

    // 发送 POST 请求到后端 API
    fetch('http://localhost:3000/register', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ username, password })
    })
    .then(response => response.json())
    .then(data => {
        if (data.message) {
            alert('注册成功！');
        } else {
            alert('注册失败: ' + data.error);
        }
    })
    .catch(error => {
        alert('请求失败: ' + error);
    });
});

// 处理登录表单的提交
document.getElementById('loginForm').addEventListener('submit', function(event) {
    event.preventDefault();  // 阻止默认表单提交

    const username = document.getElementById('loginUsername').value;  // 使用正确的 ID
    const password = document.getElementById('loginPassword').value;  // 使用正确的 ID

    // 发送 POST 请求到后端 API
    fetch('http://localhost:3000/login', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ username, password })
    })
    .then(response => response.json())
    // .then(response => {
    //     if (!response.ok) {
    //         throw new Error('网络响应异常：' + response.status);
    //     }
    //     return response.json();
    // })
    .then(data => {
        if (data.message) {
            alert('登录成功！');
            window.location.href = 'index.html';
        } else {
            alert('登录失败: ' + data.error);
        }
    })
    .catch(error => {
        alert('请求失败: ' + error.message);
    });
});

