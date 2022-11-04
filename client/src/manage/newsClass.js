import '../css/table.css';
import '../css/newsClass.css';
import ajax from '../js/ajax';

const form = document.forms[0];
const dataList = document.getElementById('dataList');

String.prototype.formatDate = function (r) {
    const date = new Date(this);
    let s = r;
    s = s.replace('yyyy', date.getFullYear());
    s = s.replace('MM', date.getMonth() + 1);
    s = s.replace('dd', date.getDate());
    s = s.replace('hh', date.getHours());
    s = s.replace('mm', date.getMinutes());
    s = s.replace('ss', date.getSeconds());
    s = s.replace('ms', date.getMilliseconds());
    return s;
}
drawTable();
form.onsubmit = function (e) {
    e.preventDefault();
    ajax('post', '/api/admin/addNewsClass', {
        className: form.className.value,
        classExplain: form.classExplain.value,
    }).then(result => {
        if (result.flag) {
            alert(result.msg);
            drawTable();
        } else {
            alert(result.msg)
        }
    })
}

function drawTable() {
    dataList.innerHTML = '';
    ajax('get', '/api/news/getNewsClass')
        .then(result => {
            if (result.flag) {
                result.data.forEach(element => {
                    let s = '<tr>';
                    s += `<td>${element.id}</td>`;
                    s += `<td>${element.className}</td>`;
                    s += `<td>${element.classExplain}</td>`;
                    s += `<td>${element.updatedAt.formatDate('yyyy年MM月dd日')}</td>`;
                    s += `<td>${element.createdAt.formatDate('yyyy年MM月dd日')}</td>`;
                    s += `<td><a>修改</a>  <a>删除</a></td>`
                    s += '</tr>';
                    dataList.innerHTML += s;
                });
            } else {
                alert(result.msg)
            }
        })
}