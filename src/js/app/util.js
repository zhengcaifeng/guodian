/*
Created by 周志豪 on 2017/7/31.
公共js库，包含各种公共方法
 */

define(['jquery'],function($){
    var g_data = {
        debug:true,
        url:'http:127.1.1.1'
    };
    //全局ajax设置
    $.ajaxSetup({
        type:'POST',
        async:true,
        cache:false,
        timeout:100000,
        beforeSend:function(data){
            console.log(data);
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
    }
    //模板渲染方法
    $.fn['getTpl'] = $['getTpl'] = function (options,callback) {
        var url = '';
        if(options.type === 1){
            url = 'component/' + options.tpl + '.html';
        }else if(options.type === 2){
            url = '_page/' + options.tpl + '.html';
        }
        $.ajax({
            type:'GET',
            url:url
        });
    }
    return g_data;
});