import ajax from '../js/ajax';

const form = document.forms[0];

form.onsubmit = function (e) {
    e.preventDefault();
    const pwd = form.newPwd.value;
    const pwd2 = form.newPwd2.value;
    if (pwd != pwd2) {
        alert('两次密码输入不一致');
        return false;
    }

    ajax('post', '/api/admin/modifyPwd', {
        newPwd: pwd
    })
        .then(result => {
            if (result.flag) {
                alert('密码修改成功');
                localStorage.removeItem('token');
                top.location.href = 'login.html'
            } else {
                alert(result.msg)
            }
        })
        .catch(e => {
            alert('服务器忙，请稍后再试')
        })
}