import '../css/table.css';
import '../css/newsClass.css';
import ajax from '../js/ajax';

const form = document.forms[0];
const dataList = document.getElementById('dataList');
let data;
let id;

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
    let url;
    if (id) {
        url = '/api/admin/modifyClass'
    } else {
        url = '/api/admin/addNewsClass'
    }
    ajax('post', url, {
        className: form.className.value,
        classExplain: form.classExplain.value,
        id
    })
        .then(result => {
            if (result.flag) {
                //添加成功
                alert(result.msg);
                drawTable();
                back();
            } else {
                alert(result.msg)
            }
        })
}

form.btn2.onclick = back;

function drawTable() {
    dataList.innerHTML = '';
    ajax('get', '/api/news/getNewsClass')
        .then(result => {
            if (result.flag) {
                data = result.data;
                result.data.forEach(element => {
                    const d = new Date(element.updatedAt)
                    const tr = document.createElement('tr');

                    let s = '';
                    s += `<td>${element.id}</td>`;
                    s += `<td>${element.className}</td>`;
                    s += `<td>${element.classExplain}</td>`;
                    s += `<td>${element.updatedAt.formatDate('yyyy年MM月dd日')}</td>`;
                    s += `<td>${element.createdAt.formatDate('yyyy年MM月dd日')}</td>`;
                    tr.innerHTML = s;

                    const td = document.createElement('td');
                    const a = document.createElement('a');
                    a.innerHTML = '修改';
                    a.dataset.id = element.id;
                    a.onclick = modifyClass;
                    const b = document.createElement('a');
                    b.innerHTML = '删除';
                    b.dataset.id = element.id;
                    b.onclick = deleteClass;
                    td.appendChild(a);
                    td.appendChild(b);
                    tr.appendChild(td);
                    dataList.appendChild(tr);
                });
            } else {
                alert(result.msg)
            }
        })
}

function modifyClass() {
    id = this.dataset.id
    let obj;
    data.forEach(item => {
        if (item.id == id) {
            obj = item
        }
    })
    form.className.value = obj.className;
    form.classExplain.value = obj.classExplain;
    form.btn.innerHTML = '修改';
    form.btn2.style.display = 'inline';
}

function deleteClass() {
    if (!confirm('您确定要删除吗？')) {
        return;
    }
    ajax('post', '/api/admin/deleteClass', { classId: this.dataset.id })
        .then(result => {
            if (result.flag) {

                //隶属于window的弹窗优先级最高。解决的方式是将弹窗放入setTimeout中，延迟一定时间后再弹窗。
                drawTable();
                setTimeout(function () {
                    window.alert('删除成功');
                }, 10);
            } else {
                alert(result.msg)
            }
        })
}

function back() {
    form.btn.innerHTML = '新增';
    form.btn2.style.display = 'none';
    id = null;//修改完成后一定要清除全局的id。
    form.reset();
}