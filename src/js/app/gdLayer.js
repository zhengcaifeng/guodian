define(['jquery','layer'],function($,layer){
    /*layer.config({
        path: '/js/layer/'
    });*/
    var fn = {};
    $.fn['gdLayer'] = $['gdLayer'] = function(option, callback) {
        if(option["type"]) {
            fn[option["type"]](option["width"],option["height"],option["text"], option["littleMsg"], callback);
        }
    };

    fn.base = function(lwith,lheight,text, littleMsg, callback) {
        var result = "";
        if(text != "" || littleMsg != ""){
            result = text + '<div style="color: #999;font-size: 12px;">' + littleMsg + '</div>';
        }
        fn.publicLayer_open('标题',result,'base-Layer',['确定', '取消'],lwith,lheight,callback,'base',-1,0);
    };

    fn.twoLayer = function(lwith,lheight,text, littleMsg, callback) {
        var result = "";
        if(text != "" || littleMsg != ""){
            result = text + '<div style="color: #999;font-size: 12px;">' + littleMsg + '</div>';
        }
        fn.publicLayer_open('标题',result,'base-Layer',['确定', '取消'],lwith,lheight,callback,'base',-1,1);
    };

    fn.warn = function(lwith,lheight,text, littleMsg, callback) {
        var result = text + '<div style="color: #999;font-size: 12px;">' + littleMsg + '</div>';
        fn.publicLayer_msg(result,'msg-Layer',['继续', '取消'],lwith,lheight,callback,'warn',7);
    };

    fn.success = function(lwith,lheight,text, littleMsg, callback) {
        var result = text + '<div style="color: #999;font-size: 12px;">' + littleMsg + '</div>';
        fn.publicLayer_msg(result,'msg-Layer',['确定'],lwith,lheight,callback,'success',1);
    };

    fn.error = function(lwith,lheight,text, littleMsg, callback) {
        var result = text + '<div style="color: #999;font-size: 12px;">' + littleMsg + '</div>';
        fn.publicLayer_msg(result,'msg-Layer',['确定','取消'],lwith,lheight,callback,'error',2);
    };

    fn.message = function(lwith,lheight,text, littleMsg, callback) {
        var result = text + '<div style="color: #999;font-size: 12px;">' + littleMsg + '</div>';
        fn.publicLayer_msg(result,'msg-Layer',['知道了'],lwith,lheight,callback,'message',3);
    };

    fn.prompt = function(lwith,lheight,text, littleMsg, callback) {
        var result = text + '<div style="padding-top: 10px;color: #999;font-size: 12px;line-height: 17px">' + littleMsg + '</div>';
        fn.publicLayer_msg(result,'prompt-layer',['确定','取消'],lwith,lheight,callback,'prompt',-1);
    };

    fn.publicLayer_msg = function(resultText,cssSkin,typeBtn,lwith,lheight,callback,type,icon){
        layer.msg(resultText, {
            icon:icon,
            extend: 'gdLayer.css', //加载您的扩展样式
            skin: cssSkin,
            time: 0,
            shade : [0.5 , '#000' , true],
            area: [lwith, lheight],
            btn: typeBtn,
            yes: function(index) {
                callback ? callback(index) : layer.close(index);
            },
            btn2: function(index) {
                layer.close(index);
            },
            success:function(index){
                if(type == "prompt"){
                    $('.layui-layer-dialog .layui-layer-content').css("padding","20px 20px 20px 20px");
                }
                if(type == "message" || type == "warn" || type == "success" || type == "error"){
                    $('.layui-layer-dialog .layui-layer-content .layui-layer-ico').css("top","30px");
                    $('.layui-layer-dialog .layui-layer-content .layui-layer-ico').css("left","30px");
                    $('.layui-layer-dialog .layui-layer-padding').css("padding","30px 20px 10px 70px");
                }
            }
        });
    };

    fn.publicLayer_open = function(layerTitle,resultText,cssSkin,typeBtn,lwith,lheight,callback,type,icon,layerType){
        layer.open({
            type:layerType,
            icon:icon,
            extend: 'gdLayer.css', //加载您的扩展样式
            skin: cssSkin,
            shade : [0.5 , '#000' , true],
            area: [lwith, lheight],
            title:layerTitle,
            content: resultText,
            btn: typeBtn,
            yes: function(index) {
                callback ? callback(index) : layer.close(index);
            },
            btn2: function(index) {
                layer.close(index);
            },
            cancel: function(index) {
                layer.close(index);
            },
            success:function(index){
                if(type == "base"){
                    $('.layui-layer-dialog .layui-layer-content').css("padding","20px 20px 20px 50px");
                }
            }
        });
    };
    //return fn;
});