export default function (method, url, data, sync = true) {
    method = method.toLowerCase();
    return new Promise((resolve, reject) => {
        const xhr = new XMLHttpRequest();

        xhr.onreadystatechange = function () {
            if (xhr.readyState == 4) {
                if (xhr.status == 200) {
                    resolve(JSON.parse(xhr.response));
                } else {
                    reject({
                        code: xhr.status
                    })
                }
            }
        }

        //如果是get请求，则需要处理数据，绑定到url中
        if (method == 'get' && data) {
            const arr = [];
            for (let item in data) {
                arr.push(item + '=' + encodeURIComponent(data[item]));
            }
            url += "?" + arr.join('&');
        }

        xhr.open(method, url, sync);

        const token = localStorage.getItem('token');
        if (token) {
            xhr.setRequestHeader('Authorization', 'Bearer ' + token)
        }

        //如果是post，要求数据是json形式
        if (method == 'post') {
            xhr.setRequestHeader('Content-Type', 'application/json');
            xhr.send(JSON.stringify(data))
        } else {
            xhr.send();
        }
    })
}