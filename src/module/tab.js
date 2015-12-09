/**
 * tab选项卡      1.0.0
 */
(function (root, factory) {
    if (typeof define === 'function' && (define.amd || define.cmd)) {
        define(function () {
            return factory(root);
        });
    } else {
        root.tab = factory(root);
    }
})(this, function (root) {

    // tab表单
    function Tab(obj) {
        this.opt = {
            $ctrl: $('.tab-ctrl li'),
            $item: $('.tab-cont .tab-item'),
            itemIndex: 0,
            activateCls: 'active',
            beforeFn: '',
            afterFn: ''
        };

        this.init(obj);
        this.switchItem();
        this.handle();
    }

    Tab.prototype = {
        init: function (obj) {
            obj && (this.opt = $.extend(this.opt, obj));
        },

        handle: function () {
            var that = this,
                opt = that.opt;

            opt.$ctrl.on('click', function () {
                opt.beforeFn && opt.beforeFn();
                opt.index = $(this).index();
                that.switchItem();
            });
        },

        switchItem: function () {

            var opt = this.opt;

            opt.$ctrl.removeClass(opt.activateCls);
            opt.$ctrl.eq(opt.index).addClass(opt.activateCls);
            opt.$item.hide();
            opt.$item.eq(opt.index).show();

            opt.afterFn && opt.afterFn(opt.index);
        }
    };

    return Tab;
});