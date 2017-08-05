define(['jquery','layer'],function($,layer){
   var dialog = {};
    (function(){
        var fn = {};
        /*普通弹框（模态框）
        * 入参option包括：title(标题)，
        *                content（显示的内容，文字或者html代码都可），
        *                width（宽度），
        *                height（高度，必填）
        * callback方法：点击确定按钮执行的方法
        * cancelCallBack方法：点击取消执行的方法
        */
        dialog.modal = function(option, callback,cancelCallBack) {
            fn.publicLayer_open(option,callback,cancelCallBack);
        };

        /*信息框
        * 入参option包括：type(信息类型，分为success,error,warn,message,prompt)，
        *                data（包括text和littleMsg，分别是标题和后端返回的信息），
        *                width（宽度），
        *                height（高度，必填）
         * callback方法：点击确定按钮执行的方法
         * cancelCallBack方法：点击取消执行的方法
        */
        dialog.alert = function(option, callback,cancelCallBack){
            fn.publicLayer_msg(option, callback,cancelCallBack);
        };

        fn.publicLayer_msg = function(option,callback,cancelCallBack){
            var result = "";
            var icon = "";
            var typeBtn = null;
            var cssSkin = "";
            var lwidth = "";
            option.width !="" && option.width !="auto"? lwidth = option.width+'px' : lwidth = "390px";
            var lheight = "";
            option.height !="" && option.height !="auto"? lheight = option.height+'px' : lheight = "auto";
            switch(option.type){
                case "prompt" :
                    result = option.data.text + '<div style="padding-top: 10px;color: #999;font-size: 12px;line-height: 17px">' + option.data.littleMsg + '</div>'
                    icon = -1;
                    typeBtn = ['确定','取消'];
                    cssSkin = "prompt-layer";
                    break;
                case "message" :
                    result = option.data.text + '<div style="color: #999;font-size: 12px;">' + option.data.littleMsg + '</div>';
                    icon = 3;
                    typeBtn = ['知道了'];
                    cssSkin = "msg-Layer";
                    break;
                case "warn" :
                    result = option.data.text + '<div style="color: #999;font-size: 12px;">' + option.data.littleMsg + '</div>';
                    icon = 7;
                    typeBtn = ['确定','取消'];
                    cssSkin = "msg-Layer";
                    break;
                case "success" :
                    result = option.data.text + '<div style="color: #999;font-size: 12px;">' + option.data.littleMsg + '</div>';
                    icon = 1;
                    typeBtn = ['确定'];
                    cssSkin = "msg-Layer";
                    break;
                case "error" :
                    result = option.data.text + '<div style="color: #999;font-size: 12px;">' + option.data.littleMsg + '</div>';
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
                area: [lwidth, lheight],
                btn: typeBtn,
                yes: function(index) {
                    callback ? callback(index) : layer.close(index);
                },
                btn2: function(index) {
                    cancelCallBack ? cancelCallBack(index) : layer.close(index);
                },
                success:function(index){
                    if(option.type == "prompt"){
                        $('.layui-layer-dialog .layui-layer-content').css("padding","20px 20px 20px 20px");
                    }
                    if(option.type == "message" || option.type == "warn" || option.type == "success" || option.type == "error"){
                        $('.layui-layer-dialog .layui-layer-content .layui-layer-ico').css("top","30px");
                        $('.layui-layer-dialog .layui-layer-content .layui-layer-ico').css("left","30px");
                        $('.layui-layer-dialog .layui-layer-padding').css("padding","30px 20px 10px 70px");
                    }
                }
            });
        };

        fn.publicLayer_open = function(option,callback,cancelCallBack){
            var lwidth = "";
            option.width !="" && option.width !="auto"? lwidth = option.width+'px' : lwidth = "522px";
            var lheight = "";
            option.height !="" && option.height !="auto"? lheight = option.height+'px' : lheight = "auto";
            layer.open({
                type:1,
                extend: 'gdLayer.css', //加载您的扩展样式
                skin: 'base-Layer',
                shade : [0.5 , '#000' , true],
                area: [lwidth, lheight],
                title:option.title,
                content: option.content,
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