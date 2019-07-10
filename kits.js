/// 这里面就是封装我们的常用的代码的js代码
var kits = {};
// 封装一个获取指定区间的随机整数的方法
kits.randonInt = function (n, m) {
  return Math.floor(Math.random() * (m - n + 1) + n);
}


//封装当前的时间
function timing() {
        let timer = new Date();
        let h = timer.getHours();
        let m = timer.getMinutes();
        let s = timer.getSeconds();
        let Y = timer.getFullYear();
        let M = timer.getMonth() + 1;
        let D = timer.getDate();
        let div = document.querySelector('div');
        s = s < 10 ? '0' + s : s;
        m = m < 10 ? '0' + m : m;
        h = h < 10 ? '0' + h : h;
        D = D < 10 ? '0' + D : D;
        M = M < 10 ? '0' + M : M;
        div.innerText = Y + '-' + M + '-' + D + ' ' + h + ':' + m + ':' + s;
        setInterval(function () {
            s++;
            if (s > 59) {
                s = 0;
                m++;
            }
            if (m > 59) {
                m = 0;
                h++;
            }
            s = s < 10 ? '0' + parseInt(s) : s;
            m = m < 10 ? '0' + parseInt(m) : m;
            h = h < 10 ? '0' + parseInt(h) : h;
            D = D < 10 ? '0' + parseInt(D) : D;
            M = M < 10 ? '0' + parseInt(M) : M;
            div.innerText = Y + '-' + M + '-' + D + ' ' + h + ':' + m + ':' + s;
        }, 1000);
    }