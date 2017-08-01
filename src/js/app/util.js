/*
Created by 周志豪 on 2017/7/31.
公共js库，包含各种公共方法
 */

define(['jquery','artTemplate'],function($,template){
    var g_data = {
        debug:true,
        url:'http:127.1.1.1'
    };
    //全局ajax设置
    $.ajaxSetup({
        type:'GET',
        async:true,
        cache:false,
        timeout:100000,
        beforeSend:function(data){

        },
        statusCode:{
            404:function(){

            },
            401:function(){

            }
        },
        fail:function(jqXHR, textStatus, errorThrown){
            if('timeout' === textStatus){
                alert('网络连接超时');
            }else if('abort' === textStatus){

            }else{
                alert('网络异常');
            }
        }
    });
    //统一日志打印
    $.fn['log'] = $['log'] = function (log) {
        if(true === g_data.debug){
            console.log(log);
        }
    };
    //模板渲染方法
    $.fn['renderTpl'] = $['renderTpl'] = function (sign,dom,data,callback) {
        var render = template.compile(dom);
        $(sign).html(render(data));
        callback && callback();
    };
    //事件的订阅和发布
    (function($) {
        var o = $({});
        $.subscribe = function () {
            o.on.apply(o, arguments);
        };
        $.publish = function () {
            o.trigger.apply(o, arguments);
        };
        $.unsubscribe = function () {
            o.off.apply(o, arguments);
        };
    } (jQuery));
    //eg:
    // function handle(e, a, b, c) {
    //     console.log(a + b + c);
    // };
    // 订阅
    // $.subscribe("/some/topic", handle);
    // 发布
    // $.publish("/some/topic", ["a", "b", "c"]);  输出abc
    // $.unsubscribe("/some/topic", handle);  退订
    return g_data;
});