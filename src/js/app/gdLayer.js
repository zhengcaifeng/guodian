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
        layer.open({
            extend: 'gdLayer.css', //加载您的扩展样式
            skin: 'base-Layer',
            shade : [0.5 , '#000' , true],
            area: [lwith, lheight],
            content: text,
            btn: ['确定', '取消'],
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
                $('.layui-layer-dialog .layui-layer-content').css("padding","20px 20px 20px 50px");
            }
        });
    };

    fn.warn = function(lwith,lheight,text, littleMsg, callback) {
        var result = text + '<div style="color: #666666;">' + littleMsg + '</div>';
        layer.msg(result, {
            icon: 7,
            extend: 'gdLayer.css', //加载您的扩展样式
            skin: 'msg-Layer',
            time: 0,
            shade : [0.5 , '#000' , true],
            area: [lwith, lheight],
            btn: ['继续', '取消'],
            yes: function(index) {
                callback ? callback(index) : layer.close(index);
            },
            btn2: function(index) {
                layer.close(index);
            },
            success:function(index){
                $('.layui-layer-dialog .layui-layer-content .layui-layer-ico').css("top","30px");
                $('.layui-layer-dialog .layui-layer-content .layui-layer-ico').css("left","30px");
                $('.layui-layer-dialog .layui-layer-padding').css("padding","30px 20px 10px 70px");
            }
        });
    };

    fn.success = function(lwith,lheight,text, littleMsg, callback) {
        var result = text + '<div style="color: #666666;">' + littleMsg + '</div>';
        layer.msg(result, {
            icon: 1,
            extend: 'gdLayer.css', //加载您的扩展样式
            skin: 'msg-Layer',
            time: 0,
            shade : [0.5 , '#000' , true],
            area: [lwith, lheight],
            btn: ['确定'],
            yes: function(index) {
                callback ? callback(index) : layer.close(index);
            },
            success:function(index){
                $('.layui-layer-dialog .layui-layer-content .layui-layer-ico').css("top","30px");
                $('.layui-layer-dialog .layui-layer-content .layui-layer-ico').css("left","30px");
                $('.layui-layer-dialog .layui-layer-padding').css("padding","30px 20px 10px 70px");
            }
        });
    };

    fn.error = function(lwith,lheight,text, littleMsg, callback) {
        var result = text + '<div style="color: #666666;">' + littleMsg + '</div>';
        layer.msg(result, {
            icon: 2,
            extend: 'gdLayer.css', //加载您的扩展样式
            skin: 'msg-Layer',
            time: 0,
            shade : [0.5 , '#000' , true],
            area: ['390px', '190px'],
            btn: ['确定','取消'],
            yes: function(index) {
                callback ? callback(index) : layer.close(index);
            },
            btn2: function(index) {
                layer.close(index);
            },
            success:function(index){
                $('.layui-layer-dialog .layui-layer-content .layui-layer-ico').css("top","30px");
                $('.layui-layer-dialog .layui-layer-content .layui-layer-ico').css("left","30px");
                $('.layui-layer-dialog .layui-layer-padding').css("padding","30px 20px 10px 70px");
            }
        });
    };

    fn.message = function(lwith,lheight,text, littleMsg, callback) {
        var result = text + '<div style="color: #666666;">' + littleMsg + '</div>';
        layer.msg(result, {
            icon: 3,
            extend: 'gdLayer.css', //加载您的扩展样式
            skin: 'msg-Layer',
            time: 0,
            shade : [0.5 , '#000' , true],
            area: [lwith, lheight],
            btn: ['知道了'],
            yes: function(index) {
                callback ? callback(index) : layer.close(index);
            },
            success:function(index){
                $('.layui-layer-dialog .layui-layer-content .layui-layer-ico').css("top","30px");
                $('.layui-layer-dialog .layui-layer-content .layui-layer-ico').css("left","30px");
                $('.layui-layer-dialog .layui-layer-padding').css("padding","30px 20px 10px 70px");
            }
        });
    };

    fn.prompt = function(lwith,lheight,text, littleMsg, callback) {
        var result = text + '<div style="color: #666666;">' + littleMsg + '</div>';
        layer.msg(result, {
            extend: 'gdLayer.css', //加载您的扩展样式
            skin: 'msg-Layer',
            time: 0,
            shade : [0.5 , '#000' , true],
            area: [lwith, lheight],
            btn: ['确定','取消'],
            yes: function(index) {
                callback ? callback(index) : layer.close(index);
            },
            btn2: function(index) {
                layer.close(index);
            },
            success:function(index){
                $('.layui-layer-dialog .layui-layer-content').css("padding","20px 20px 20px 50px");
            }
        });
    };
    //return fn;
});