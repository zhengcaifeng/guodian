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

    //闭包缓存
    (function(){
        var dataList = {};
        //添加缓存
        $.fn["setCache"] = $["setCache"] = function (id, data) {
            if(typeof data ==="object"){
                dataList[id] = $.extend(true,{},data);
            }else{
                dataList[id] = data;
            }
        };
        // 获得缓存
        $.fn["getCache"] = $["getCache"] = function (id) {
            if(dataList[id]){
                if(typeof dataList[id] ==="object"){
                    return $.extend(true,{},dataList[id]);
                }else{
                    return dataList[id];
                }
            }else{
                return undefined;
            }
        };
        // 根据id清空缓存
        $.fn["clearCache"] = $["clearCache"] = function (id) {
            delete dataList[id];
        };
        // 清空所有的缓存
        $.fn["clearAllCache"] = $["clearAllCache"] = function () {
            dataList = {};
        }
    })();
    //获得所有url后携带的参数
    $.fn['getAllQueryString'] = $['getAllQueryString'] = function (){
        if(!location.search){
            return {};
        }
        var searchStr = location.search.substring(1);
        var search = searchStr.split("&");
        var param = {};
        $.each(search,function(index,value){
            var Arr = value.split("=");
            param[Arr[0]] = Arr[1];
        });
        return param;
    };
    return g_data;
});