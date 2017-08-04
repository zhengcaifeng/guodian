define(['jquery','layer'],function($,layer){
   var dialog = {};
    (function(){
        var fn = {};
        dialog.modal = function(option, callback,cancelCallBack) {
            fn.publicLayer_open(option["title"],option["content"],callback,cancelCallBack,1,option["width"],option["height"]);
        };

        dialog.alert = function(option, callback,cancelCallBack){
            if(option["type"]) {
                fn.publicLayer_msg(option["type"],option["data"], callback,cancelCallBack,option["width"],option["height"]);
            }
        };

        fn.publicLayer_msg = function(type,data,callback,cancelCallBack,width,height){
            var result = "";
            var icon = "";
            var typeBtn = null;
            var cssSkin = "";
            var lwidth = "";
            width !="" ? lwidth = width : lwidth = "390";
            switch(type){
                case "prompt" :
                    result = data.text + '<div style="padding-top: 10px;color: #999;font-size: 12px;line-height: 17px">' + data.littleMsg + '</div>'
                    icon = -1;
                    typeBtn = ['确定','取消'];
                    cssSkin = "prompt-layer";
                    break;
                case "message" :
                    result = data.text + '<div style="color: #999;font-size: 12px;">' + data.littleMsg + '</div>';
                    icon = 3;
                    typeBtn = ['知道了'];
                    cssSkin = "msg-Layer";
                    break;
                case "warn" :
                    result = data.text + '<div style="color: #999;font-size: 12px;">' + data.littleMsg + '</div>';
                    icon = 7;
                    typeBtn = ['确定','取消'];
                    cssSkin = "msg-Layer";
                    break;
                case "success" :
                    result = data.text + '<div style="color: #999;font-size: 12px;">' + data.littleMsg + '</div>';
                    icon = 1;
                    typeBtn = ['确定'];
                    cssSkin = "msg-Layer";
                    break;
                case "error" :
                    result = data.text + '<div style="color: #999;font-size: 12px;">' + data.littleMsg + '</div>';
                    icon = 2;
                    typeBtn = ['确定','取消'];
                    cssSkin = "msg-Layer";
                    break;
            }
            layer.msg(result, {
                icon:icon,
                extend: 'gdLayer.css', //加载您的扩展样式
                skin: cssSkin,
                time: 0,
                shade : [0.5 , '#000' , true],
                area: [lwidth+'px', height+'px'],
                btn: typeBtn,
                yes: function(index) {
                    callback ? callback(index) : layer.close(index);
                },
                btn2: function(index) {
                    cancelCallBack ? cancelCallBack(index) : layer.close(index);
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

        fn.publicLayer_open = function(layerTitle,resultText,callback,cancelCallBack,layerType,width,height){
            var lwidth = "";
            width !="" ? lwidth = width : lwidth = "522";
            layer.open({
                type:1,
                extend: 'gdLayer.css', //加载您的扩展样式
                skin: 'base-Layer',
                shade : [0.5 , '#000' , true],
                area: [lwidth+"px", height+"px"],
                title:layerTitle,
                content: resultText,
                btn: ['确定', '取消'],
                yes: function(index) {
                    callback ? callback(index) : layer.close(index);
                },
                btn2: function(index) {
                    cancelCallBack ? cancelCallBack(index) : layer.close(index);
                },
                cancel: function(index) {
                    layer.close(index);
                },
                success:function(index){
                    $('.layui-layer-dialog .layui-layer-content').css("padding","20px 20px 20px 50px");
                }
            });
        };
    })();
    return dialog;
});