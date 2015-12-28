/**
 * Cookie读写      1.1.1
 *
 * eg:
 *
 * cookie.get(key);
 * cookie.set(key,value,expiredays,domain);
 *
 * Ps:
 *
 *  get接口:获得当前域下指定key的cookie;
 *
 *  set接口:
 *      key [string]
 *      value[string]
 *      expiredays[Number]  有效天数
 *      domain[string]  域
 */
(function (root, factory) {
    if (typeof define === 'function' && (define.amd || define.cmd)) {
        define(function (require, exports, module) {
            return factory(root,{});
        });
    } else {
        root.Cookie = factory(root,{});
    }
})(this, function (root) {

    var Cookie={

        // 读取cookie
        getCookie:function (name) {
            var arr,reg=new RegExp("(^| )"+name+"=([^;]*)(;|$)");
            if(arr=document.cookie.match(reg)){
                return decodeURI(arr[2]);
            }
            return '';
        },

        // 写入cookie
        setCookie:function(c_name, value, expiredays,domain) {
            var exdate = new Date();
            exdate.setSeconds(exdate.getSeconds() + expiredays);
            document.cookie = c_name + "=" + decodeURIComponent(value) +
            ((expiredays == null) ? "" : ";expires=" + exdate.toGMTString()) +
            ((domain == null) ? "" : ";domain=" + domain)
        }
    };
    return Cookie;
});