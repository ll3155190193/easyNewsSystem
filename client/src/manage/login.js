import ajax from '../js/ajax';

const form = document.forms.login;

form.onsubmit = function (e) {
    e.preventDefault();
    ajax('post', '/api/admin/login', {
        uid: form.uid.value,
        pwd: form.pwd.value,
    })
        .then(result => {
            if (result.flag) {
                alert('登录成功');
                localStorage.setItem('token', result.token);
                location.replace('index.html')
            } else {
                alert(result.msg);
            }
        })
        .catch(e => {
            alert('服务器忙，请稍后再试')
        })
}