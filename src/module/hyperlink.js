/**
 * hybrid超链接      1.1.1
 * webView情况下超链接使用交互协议
 */
(function (root, factory) {
    if (typeof define === 'function' && (define.amd || define.cmd)) {
        define(function (require, exports, module) {
            require('jquery');
            var hybridProtocol = require('hybrid-calls');
            return factory(root, hybridProtocol);
        });
    } else {
        root.hyperLink = factory(root, {});
    }
})(this, function (root, hybridProtocol) {
//--------------------------------------------------【引入依赖函数】

    var isApp = function () {                   //判断是否是app
        var href = location.href,
            reg = /native\_view\=(\w)*[&|]?/ig;
        return !!(reg.test(href) && RegExp.$1);
    };

    if (!isApp()) {
        return false;
    }

    $('body').on('click', 'a', function (e) {
        var reg = /^qian\:\/\/(\w+)\?\#?(\w+)?/,
            _this = e.currentTarget,
            linkHref = _this.href;      //a标签的href
        e.stopPropagation();
        e.preventDefault();

        //不需要处理的a标签
        if (linkHref === 'javascript:;' || linkHref === '#') {
            return false;
        }

        //自定义的链接生成协议
        if (reg.test(linkHref)) {
            var tagName = RegExp.$1;

            //app低版本协议的兼容
            if (RegExp.$2) {
                hybridProtocol(linkHref);
                return false;
            }

            //根据tagName获取不同的协议属性
            switch (tagName) {

                case 'getUrl':
                    hybridProtocol({
                        tagName: 'getUrl',
                        data: {
                            title: _this.getAttribute('data-title'),
                            url: _this.getAttribute('data-url')
                        }
                    });
                    break;

                case 'openWebPage':
                    hybridProtocol({
                        tagName: 'openWebPage',
                        data: {
                            title: _this.getAttribute('data-hybrid-title'),
                            url: _this.getAttribute('data-hybrid-url')
                        }
                    });
                    break;

                case 'openNativePage':
                    hybridProtocol({
                        tagName: 'openNativePage',
                        data: {
                            type: _this.getAttribute('data-hybrid-type'),
                            url: window.location.href,
                            data: JSON.parse(_this.getAttribute('data-hybrid-data')) || ""
                        }
                    });
                    break;

                case 'history':
                    hybridProtocol({
                        tagName: 'history',
                        data: {
                            go: _this.getAttribute('data-hybrid-go')
                        }
                    });
                    break;
            }
        } else {
            hybridProtocol({
                tagName: 'openWebPage',
                data: {
                    title: _this.getAttribute('data-hybrid-title') || '',
                    url: _this.href
                }
            });
        }
    });
});