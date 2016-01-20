/*onSession 1.1.3*/

(function (root, factory) {
    if (typeof define === 'function' && (define.amd || define.cmd)) {
        define(function (require, exports, module) {
            return factory(root);
        });
    } else {
        root.elperBase = factory(root);
    }
})(this, function (root) {

    // 是否处于隐私模式下
    var isPrivacy = (function isPrivacy() {
        var testKey = 'test',
            storage = root.sessionStorage;
        try {
            storage.setItem(testKey, 'testValue');
            storage.removeItem(testKey);
            return true;
        } catch (error) {
            return false;
        }
    })();

    var oneSession = {
        get: function (name) {
            if (root.sessionStorage && isPrivacy) {
                var sessionVal = sessionStorage.getItem(name);
                sessionStorage.removeItem(name);
                return sessionVal;
            } else {
                if (document.cookie.length > 1) {
                    var c_start = document.cookie.indexOf(name + "=");
                    if (c_start != -1) {
                        c_start = c_start + name.length + 1;
                        var c_end = document.cookie.indexOf(";", c_start);
                        if (c_end == -1) c_end = document.cookie.length;
                        return decodeURI(document.cookie.substring(c_start, c_end));
                    }
                }
                return "";
            }
        },
        set: function (name, value, expiredays) {
            if (root.sessionStorage && isPrivacy) {
                sessionStorage.setItem(name, value);
            } else {
                var exdate = new Date();
                exdate.setSeconds(exdate.getSeconds() + expiredays);
                document.cookie = name + "=" + decodeURIComponent(value) +
                ((expiredays == null) ? "" : ";expires=" + exdate.toGMTString());
            }
        }
    };

    return oneSession;

});
