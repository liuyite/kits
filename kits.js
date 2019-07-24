

/// 这里面就是封装我们的常用的代码的js代码
var kits = {};

// 封装一个获取指定区间的随机整数的方法
kits.randonInt = function (n, m) {
  return Math.floor(Math.random() * (m - n + 1) + n);
}

//封装当前的时间
kits.timing = function() {
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
//封装一个将url的参数字符串转为数组的方法
//例如 ?id=1&name=ligoudan&age=12 转为{id:1, name:ligoudan ,age:12 }
kits.urlParams = function(){
    let arr = location.search.substr(1).split('&');
    pramas = {} ;
    arr.forEach(e => {
        let temp = e.split('=');
        pramas[temp[0]]=temp[1];
    })
    return pramas ;
} 


//封装一个状态模式的判断表单是否为空的方法
//创建一个对象存储函数方法
let strategies = {
    //判断是否为空
    isNonEmpty: function(val, errMsg) {
      if (val=='') {
        return errMsg;
       
      }
    },
    //判断表单内容的长度 
    minLength: function(val, len, errMsg) {
      if (val.length < len) {
        return errMsg;
      }
    }
  };
  //创建构造函数，validateFuncs是用来将所有的函数存储在数组里
  function Validator() {
    this.validateFuncs = [];
  }
  //创建一个add方法，将所有函数存储在一个数组中
  // dom:表单数据         rules : 数组对象
  Validator.prototype.add = function(dom, rules) {
    for (let i = 0; i < rules.length; i++) {
        //遍历数组，rule表示数组的每一个对象 
      let rule = rules[i];
  
      let fn = function() {
          //将传进来的fnName参数例：minLength:8,分割成数组 
        let parmas = rule.fnName.split(":");
        //将 函数名取出来，例 minLength
        fnName = parmas.shift();
        //将dom 的值放在params数组的首位，提示信息errMsg放在数组的后位
        parmas.unshift(dom.value);
        parmas.push(rule.errMsg);
        //使用apply将数组作为参数进行传递
        return strategies[fnName].apply(null, parmas);
      };
      //存储函数到validateFuncs数组中
      this.validateFuncs.push(fn);
    }
  };
  Validator.prototype.start = function() {
      //遍历数组，数组每个元素都是一个函数，加个括号即可逐一调用
    for (let i = 0; i < this.validateFuncs.length; i++) {
       errMsg = this.validateFuncs[i]();
       //如果有一个值是true，即结束循环
      if (errMsg) {
        return errMsg;
      }
    }
  };
  