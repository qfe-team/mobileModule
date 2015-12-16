/**
 * Created by wyj on 2015/11/2.
 * 用于自适应页面 html 的字号
 * 设置 html 默认字号为 100px，方便计算。
 * 设计稿 为 640px，当前页面宽度(默认640px) / 6.4 = html font-size (默认100px)
 * 最大宽度为 720px。
 */
(function(){
    function o(){document.documentElement.style.fontSize=(document.documentElement.clientWidth>720?720:document.documentElement.clientWidth)/6.4+"px"}
    var e=null;
    window.addEventListener("resize",function(){clearTimeout(e),e=setTimeout(o,300)},!1),o()
})(window);